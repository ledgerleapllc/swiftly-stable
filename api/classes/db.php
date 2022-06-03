<?php
/**
 * Mysql database class. Includes entire schemas that build/re-build tables if integrity check fails.
 */
class DB {
	public $connect = null;

	function __construct() {
		$this->connect = new mysqli(
			DB_HOST,
			DB_USER,
			DB_PASS,
			DB_NAME
		);
		if ($this->connect->connect_error) $this->connect = null;
	}

	function __destruct() {
		if ($this->connect) $this->connect->close();
	}

	/**
	 * Do DB selection
	 *
	 * @param string $query
	 * @return array $return
	 */
	public function do_select($query) {
		$return = null;

		if($this->connect) {
			$result = $this->connect->query($query);

			if($result != null && $result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$return[] = $row;
				}
			}
		}

		return $return;
	}

	/**
	 * Do DB query
	 *
	 * @param string $query
	 * @return bool
	 */
	public function do_query($query) {
		$flag = false;
		if ($this->connect) $flag = $this->connect->query($query);
		return $flag;
	}

	/**
	 * Check DB integrity
	 */
	public function check_integrity() {	
		global $helper;

		$query = "SHOW TABLES";
		$tables = $this->do_select($query);
		$all_tables = array();

		if ($tables) {
			foreach ($tables as $table) {
				$all_tables[] = $table['Tables_in_'.DB_NAME];
			}
		}

		if (!in_array('schedule', $all_tables)) {
			$query = "
				CREATE TABLE `schedule` (
					`id` int NOT NULL AUTO_INCREMENT,
					`template_id` varchar(100) DEFAULT NULL,
					`subject` varchar(255) DEFAULT '',
					`body` text,
					`link` text,
					`email` varchar(255) DEFAULT NULL,
					`created_at` timestamp NULL DEFAULT NULL,
					`sent_at` timestamp NULL DEFAULT NULL,
					`complete` int DEFAULT '0',
					PRIMARY KEY (`id`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created schedule table');
		}

		if(!in_array('sessions', $all_tables)) {
			$query = "
				CREATE TABLE `sessions` (
					`id` int NOT NULL AUTO_INCREMENT,
					`guid` varchar(36) NOT NULL,
					`bearer` text,
					`created_at` timestamp NULL DEFAULT NULL,
					`expires_at` timestamp NULL DEFAULT NULL,
					PRIMARY KEY (`id`)
				) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created sessions table');
		}

		if (!in_array('settings', $all_tables)) {
			$query = "
				CREATE TABLE `settings` (
					`name` varchar(64) DEFAULT NULL,
					`value` text
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created settings table');
		}

		if(!in_array('users', $all_tables)) {
			$query = "
				CREATE TABLE `users` (
					`guid` varchar(36) NOT NULL,
					`role` varchar(16) DEFAULT 'user',
					`account_type` ENUM('individual', 'entity') DEFAULT 'individual',
					`email` varchar(255) DEFAULT NULL,
					`verified` int DEFAULT '0',
					`first_name` varchar(255) DEFAULT NULL,
					`last_name` varchar(255) DEFAULT NULL,
					`password` varchar(255) DEFAULT NULL,
					`created_at` timestamp NULL DEFAULT NULL,
					`confirmation_code` varchar(64) DEFAULT NULL,
					`last_ip` varchar(64) DEFAULT NULL,
					`description` text,
					`admin_approved` int DEFAULT '0',
					`deny_reason` text,
					`twofa` int DEFAULT '0',
					`totp` int DEFAULT '0',
					`phone` varchar(20) DEFAULT NULL,
					`address` varchar(255) DEFAULT NULL,
					`address2` varchar(255) DEFAULT NULL,
					`city` varchar(64) DEFAULT NULL,
					`state` varchar(16) DEFAULT NULL,
					`zip` varchar(16) DEFAULT NULL,
					`country_residence` varchar(100) DEFAULT NULL,
					`country_citizenship` varchar(100) DEFAULT NULL,
					PRIMARY KEY (`guid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created user table');
			$created_email = getenv('ADMIN_EMAIL');
			$random_password = $helper->generate_hash();
			$random_password_hash = hash('sha256', $random_password);
			$query = "
				INSERT INTO `users` VALUES (
					'5a199618-682d-2006-4c4c-c0cde9e672d5',
					'admin',
					'individual',
					'$created_email',
					1,
					'admin',
					'admin',
					'$random_password_hash',
					NULL,
					'ADMIN',
					'127.0.0.1',
					'ledgerleap llc',
					1,
					NULL,
					0,
					0,
					'321-111-2222',
					'123 address line1',
					'456 address line2',
					'metro',
					'FL',
					'33333',
					'United States',
					'United States'
				)
			";
			$this->do_query($query);
			elog('Created admin');
			elog('Email: '.$created_email);
			elog('Password: '.$random_password);
		}

		if(!in_array('entities', $all_tables)) {
			$query = "
				CREATE TABLE `users` (
					`guid` varchar(36) NOT NULL,
					`entity_name` varchar(255) DEFAULT NULL,
					`entity_type` varchar(255) DEFAULT NULL,
					`entity_address` text,
					`entity_address2` text,
					`entity_city` varchar(64) DEFAULT NULL,
					`entity_state` varchar(16) DEFAULT NULL,
					`entity_zip` varchar(16) DEFAULT NULL,
					`entity_registration_number` varchar(255) DEFAULT NULL,
					`entity_registration_date` timestamp NULL DEFAULT NULL,
					`entity_phone` varchar(20) DEFAULT NULL,
					`entity_contact_title` varchar(32) DEFAULT NULL,
					`created_at` timestamp NULL DEFAULT NULL,
					PRIMARY KEY (`guid`)
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created entities table');
		}

		if(!in_array('wallets', $all_tables)) {
			$query = "
				CREATE TABLE `wallets` (
					`id` int NOT NULL AUTO_INCREMENT,
					`guid` varchar(36) NOT NULL,
					`address` varchar(70) DEFAULT NULL,
					`secret_key_enc` varchar(255) DEFAULT NULL,
					`active` int DEFAULT '1',
					`created_at` timestamp NULL DEFAULT NULL,
					`inactive_at` timestamp NULL DEFAULT NULL,
					`balance` int DEFAULT '0',
					`last_balance_check` timestamp NULL DEFAULT NULL,
					PRIMARY KEY (`id`)
				) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created wallets table');
		}

		if(!in_array('twofa', $all_tables)) {
			$query = "
				CREATE TABLE `twofa` (
					`id` int NOT NULL AUTO_INCREMENT,
					`guid` varchar(36) NOT NULL,
					`created_at` timestamp NULL DEFAULT NULL,
					`code` varchar(12) NOT NULL,
					PRIMARY KEY (`id`)
				) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created twofa table');
		}

		if(!in_array('mfa_allowance', $all_tables)) {
			$query = "
				CREATE TABLE `mfa_allowance` (
					`guid` varchar(36) NOT NULL,
					`expires_at` timestamp NULL DEFAULT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created mfa_allowance table');
		}

		if(!in_array('throttle', $all_tables)) {
			$query = "
				CREATE TABLE `throttle` (
					`ip` varchar(64) DEFAULT NULL,
					`uri` varchar(64) DEFAULT NULL,
					`hit` float DEFAULT NULL,
					`last_request` int DEFAULT '0'
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created throttle table');
		}

		if(!in_array('password_resets', $all_tables)) {
			$query = "
				CREATE TABLE `password_resets` (
					`guid` varchar(36) NOT NULL,
					`code` varchar(12) NOT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created password_resets table');
		}

		if(!in_array('email_changes', $all_tables)) {
			$query = "
				CREATE TABLE `email_changes` (
					`guid` varchar(36) NOT NULL,
					`new_email` varchar(255) DEFAULT NULL,
					`code` varchar(12) NOT NULL,
					`success` int DEFAULT '0',
					`dead` int DEFAULT '0',
					`created_at` timestamp NULL DEFAULT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created email_changes table');
		}
		
		if (!in_array('totp', $all_tables)) {
			$query = "
				CREATE TABLE `totp` (
					`guid` varchar(36) NOT NULL,
					`secret` text,
					`created_at` timestamp NULL DEFAULT NULL,
					`active` int DEFAULT '1'
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created totp table');
		}

		if (!in_array('totp_logins', $all_tables)) {
			$query = "
				CREATE TABLE `totp_logins` (
					`guid` varchar(36) NOT NULL,
					`expires_at` timestamp NULL DEFAULT NULL
				) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
			";
			$this->do_query($query);
			elog('DB: Created totp_logins table');
		}
	}
}
?>