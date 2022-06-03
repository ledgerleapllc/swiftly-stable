<?php
include_once('../../core.php');
/**
 *
 * POST /user/register
 *
 * @param string $first_name
 * @param string $last_name
 * @param string $email
 * @param string $password
 * @param string $description
 *
 */
class UserRegister extends Endpoints {
	function __construct() {
		global $db, $helper;
		require_method('POST');

		$type = parent::$params['account_type'] ?? 'individual';
		$email = parent::$params['email'] ?? null;
		$first_name = parent::$params['first_name'] ?? null;
		$last_name = parent::$params['last_name'] ?? null;
		$password = parent::$params['password'] ?? null;
		$description = parent::$params['description'] ?? null;
		$phone = parent::$params['phone'] ?? null;
		$address = parent::$params['address'] ?? null;
		$address2 = parent::$params['address2'] ?? null;
		$country_residence = parent::$params['country_residence'] ?? null;
		$country_citizenship = parent::$params['country_citizenship'] ?? null;

		/* For live tests */
		$phpunittesttoken = parent::$params['phpunittesttoken'] ?? '';

		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			_exit('error', 'Invalid email address', 400, 'Invalid email address');
		}

		if (!$first_name || !trim($first_name)) {
			_exit('error', 'Please provide first name', 400, 'Failed to provide first name');
		}

		if (!$last_name || !trim($last_name)) {
			_exit('error', 'Please provide last name', 400, 'Failed to provide last name');
		}

		if (
			strlen($first_name) > 32 ||
			strlen($last_name) > 32 ||
			preg_match('/[\/~`\!@#\$%\^&\*\(\)_\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $first_name) ||
			preg_match('/[\/~`\!@#\$%\^&\*\(\)_\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $last_name)
		) {
			_exit(
				'error',
				'There are invalid characters in your name',
				400,
				'Invalid characters in registration first_name/last_name'
			);
		}

		if (strlen($description) > 2048) {
			_exit(
				'error',
				'Description is too long. Limit 2000 characters',
				400,
				'Description is too long. Limit 2000 characters'
			);
		}

		if (!$password) {
			_exit(
				'error',
				'Please provide a valid password',
				400,
				'Failed to provide password'
			);
		}

		if (
			strlen($password) < 8 ||
			!preg_match('/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $password) ||
			!preg_match('/[0-9]/', $password)
		) {
			_exit(
				'error',
				'Password must be at least 8 characters long, contain at least one (1) number, and one (1) special character',
				400,
				'Invalid password. Does not meet complexity requirements'
			);
		}

		if ($type != 'individual' && $type != 'entity') {
			_exit(
				'error',
				'Please provide valid account type',
				400,
				'Failed to provide valid account type'
			);
		}

		/* check pre-existing email */
		$query = "SELECT guid FROM users WHERE email = '$email'";
		$check = $db->do_select($query);
		if ($check) {
			_exit(
				'error',
				'An account with this email address already exists',
				400,
				'An account with this email address already exists'
			);
		}

		if ($phpunittesttoken && $phpunittesttoken == 'phpunittesttoken') {
			$guid = '00000000-0000-0000-4c4c-000000000000';
			$role = 'test-user';
			$do_email = false;
		} else {
			$guid = $helper->generate_guid();
			$role = 'user';
			$do_email = true;
		}

		$created_at = $helper->get_datetime();
		$confirmation_code = $helper->generate_hash(6);
		$password_hash = hash('sha256', $password);
		$registration_ip = $helper->get_real_ip();

		$query_users = "
			INSERT INTO users (
				guid,
				role,
				email,
				account_type,
				first_name,
				last_name,
				password,
				created_at,
				confirmation_code,
				last_ip,
				description,
				phone,
				address,
				address2,
				country_residence,
				country_citizenship
			) VALUES (
				'$guid',
				'$role',
				'$email',
				'$type',
				'$first_name',
				'$last_name',
				'$password_hash',
				'$created_at',
				'$confirmation_code',
				'$registration_ip',
				'$description',
				'$phone',
				'$address',
				'$address2',
				'$country_residence',
				'$country_citizenship'
			)
		";

		/* create session */
		$bearer = $helper->generate_session_token();
		$expires_at = $helper->get_datetime(86400);
		$query_sessions = "
			INSERT INTO sessions (
				guid,
				bearer,
				created_at,
				expires_at
			) VALUES (
				'$guid',
				'$bearer',
				'$created_at',
				'$expires_at'
			)
		";

		/* execute queries with failsafe */
		$result_users = $db->do_query($query_users);
		$result_sessions = $db->do_query($query_sessions);

		if (!$result_users || !$result_sessions) {
			$query = "DELETE FROM users WHERE guid = '$guid'";
			$db->do_query($query);
			$query = "DELETE FROM sessions WHERE guid = '$guid'";
			$db->do_query($query);
			_exit(
				'error',
				'Failed to register user. Please contact administration',
				500,
				'Failed to register user',
			);
		}

		/* get new user */
		$selection = "
			SELECT
			a.guid, a.role, a.email, a.verified,
			a.first_name, a.last_name,
			a.description, a.admin_approved,
			a.created_at, a.last_ip, b.bearer
			FROM users AS a
			LEFT JOIN sessions AS b
			ON a.guid = b.guid
			WHERE a.guid = '$guid'
		";

		$me = $db->do_select($selection);
		$me = $me[0] ?? null;

		if ($me) {
			$recipient = $email;
			$subject = 'Welcome to Swiftly Stable';
			$body = 'Welcome to Swiftly Stable. Your registration code is below:<br><br>';
			$link = $confirmation_code;

			if ($do_email) {
				$helper->schedule_email(
					'register',
					$recipient,
					$subject,
					$body,
					$link
				);
			}
			_exit('success', $me);
		}

		_exit('error', 'Failed to register user', 500, 'Failed to register user');
	}
}
new UserRegister();