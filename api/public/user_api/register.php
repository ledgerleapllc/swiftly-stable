<?php
include_once('../../core.php');
/**
 *
 * POST /user/register
 *
 * @param string $account_type ENUM(individual, entity) default individual
 * @param string $first_name
 * @param string $last_name
 * @param string $email
 * @param string $password
 * @param string $description
 * @param string $phone
 * @param string $address
 * @param string $address2
 * @param string $country_residence
 * @param string $country_citizenship
 * @param string $entity_name
 * @param string $entity_type
 * @param string $entity_address
 * @param string $entity_address2
 * @param string $entity_city
 * @param string $entity_state
 * @param string $entity_zip
 * @param string $entity_registration_number
 * @param string $entity_registration_date
 * @param string $entity_registration_country
 * @param string $entity_phone
 * @param string $entity_contact_title
 *
 */
class UserRegister extends Endpoints {
	function __construct(
		$account_type = 'individual',
		$first_name = '',
		$last_name = '',
		$email = '',
		$password = '',
		$description = '',
		$phone = '',
		$address = '',
		$address2 = '',
		$city = '',
		$state = '',
		$zip = '',
		$country_residence = '',
		$country_citizenship = '',
		$entity_name = '',
		$entity_type = '',
		$entity_address = '',
		$entity_address2 = '',
		$entity_city = '',
		$entity_state = '',
		$entity_zip = '',
		$entity_registration_number = '',
		$entity_registration_date = '',
		$entity_registration_country = '',
		$entity_phone = '',
		$entity_contact_title = ''
	) {
		global $db, $helper;
		require_method('POST');

		$account_type = parent::$params['account_type'] ?? 'individual';
		$email = parent::$params['email'] ?? null;
		$first_name = parent::$params['first_name'] ?? '';
		$last_name = parent::$params['last_name'] ?? '';
		$password = parent::$params['password'] ?? null;
		$description = parent::$params['description'] ?? '';
		$phone = parent::$params['phone'] ?? '';
		$address = parent::$params['address'] ?? '';
		$address2 = parent::$params['address2'] ?? '';
		$city = parent::$params['city'] ?? '';
		$state = parent::$params['state'] ?? '';
		$zip = parent::$params['zip'] ?? '';
		$country_residence = parent::$params['country_residence'] ?? '';
		$country_citizenship = parent::$params['country_citizenship'] ?? '';
		$entity_name = parent::$params['entity_name'] ?? '';
		$entity_type = parent::$params['entity_type'] ?? '';
		$entity_address = parent::$params['entity_address'] ?? '';
		$entity_address2 = parent::$params['entity_address2'] ?? '';
		$entity_city = parent::$params['entity_city'] ?? '';
		$entity_state = parent::$params['entity_state'] ?? '';
		$entity_zip = parent::$params['entity_zip'] ?? '';
		$entity_registration_number = parent::$params['entity_registration_number'] ?? '';
		$entity_registration_date = parent::$params['entity_registration_date'] ?? '';
		$entity_registration_country = parent::$params['entity_registration_country'] ?? '';
		$entity_phone = parent::$params['entity_phone'] ?? '';
		$entity_contact_title = parent::$params['entity_contact_title'] ?? '';

		/* For live tests */
		$phpunittesttoken = parent::$params['phpunittesttoken'] ?? '';

		/* Pre-check string formats and lengths */
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

		if ($account_type != 'individual' && $account_type != 'entity') {
			_exit(
				'error',
				'Please provide valid account type',
				400,
				'Failed to provide valid account type: ' . $account_type
			);
		}

		if (strlen($city) > 64) {
			_exit(
				'error',
				'City is too long. Limit 64 characters',
				400,
				'City is too long. Limit 64 characters'
			);
		}

		if (strlen($state) > 16) {
			_exit(
				'error',
				'State/province is too long. Limit 16 characters',
				400,
				'State/province is too long. Limit 16 characters'
			);
		}

		if (strlen($zip) > 16) {
			_exit(
				'error',
				'Zip/postal code is too long. Limit 16 characters',
				400,
				'Zip/postal code is too long. Limit 16 characters'
			);
		}

		if (
			strlen($country_residence) > 100 ||
			strlen($country_citizenship) > 100
		) {
			_exit(
				'error',
				'Country is too long. Limit 100 characters',
				400,
				'Country is too long. Limit 100 characters'
			);
		}

		if (strlen($entity_name) > 255) {
			_exit(
				'error',
				'Entity name is too long. Limit 255 characters',
				400,
				'Entity name is too long. Limit 255 characters'
			);
		}

		if (strlen($entity_city) > 64) {
			_exit(
				'error',
				'Entity city is too long. Limit 64 characters',
				400,
				'Entity city is too long. Limit 64 characters'
			);
		}

		if (strlen($entity_state) > 16) {
			_exit(
				'error',
				'Entity state/province is too long. Limit 16 characters',
				400,
				'Entity state/province is too long. Limit 16 characters'
			);
		}

		if (strlen($entity_zip) > 16) {
			_exit(
				'error',
				'Entity zip/postal code is too long. Limit 16 characters',
				400,
				'Entity zip/postal code is too long. Limit 16 characters'
			);
		}

		if (strlen($entity_registration_number) > 255) {
			_exit(
				'error',
				'Entity registration number is too long. Limit 255 characters',
				400,
				'Entity registration number is too long. Limit 255 characters'
			);
		}

		if (strlen($entity_registration_country) > 100) {
			_exit(
				'error',
				'Entity registration country is too long. Limit 100 characters',
				400,
				'Entity registration country is too long. Limit 100 characters'
			);
		}

		if (strlen($entity_phone) > 20) {
			_exit(
				'error',
				'Entity phone number is too long. Limit 20 characters',
				400,
				'Entity phone number is too long. Limit 20 characters'
			);
		}

		if (strlen($entity_contact_title) > 32) {
			_exit(
				'error',
				'Entity contact title is too long. Limit 32 characters',
				400,
				'Entity contact title is too long. Limit 32 characters'
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
				city,
				state,
				zip,
				country_residence,
				country_citizenship
			) VALUES (
				'$guid',
				'$role',
				'$email',
				'$account_type',
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
				'$city',
				'$state',
				'$zip',
				'$country_residence',
				'$country_citizenship'
			)
		";

		$query_entity = "
			INSERT INTO entities (
				guid,
				entity_name,
				entity_type,
				entity_address,
				entity_address2,
				entity_city,
				entity_state,
				entity_zip,
				entity_registration_number,
				entity_registration_date,
				entity_phone,
				entity_contact_title,
				created_at
			) VALUES (
				'$guid',
				'$entity_name',
				'$entity_type',
				'$entity_address',
				'$entity_address2',
				'$entity_city',
				'$entity_state',
				'$entity_zip',
				'$entity_registration_number',
				'$entity_registration_date',
				'$entity_phone',
				'$entity_contact_title',
				'$created_at',
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
		$result_entity = true;

		if ($account_type == 'entity')
			$result_entity = $db->do_query($query_entity);

		if (!$result_users || !$result_sessions || !$result_entity) {
			$query = "DELETE FROM users WHERE guid = '$guid'";
			$db->do_query($query);
			$query = "DELETE FROM entities WHERE guid = '$guid'";
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