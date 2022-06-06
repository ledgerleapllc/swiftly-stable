<?php
include_once('../../core.php');
/**
 *
 * PUT /user/update-password
 *
 * HEADER Authorization: Bearer
 *
 * Requires MFA code to be sent and confirmed prior to requesting this endpoint.
 * After confirming MFA, user will have 5 minutes to submit request.
 *
 * @param string  $new_password
 *
 */
class UserUpdatePassword extends Endpoints {
	function __construct(
		$new_password = ''
	) {
		global $db, $helper;

		require_method('PUT');

		$auth = authenticate_session(1);
		$guid = $auth['guid'] ?? '';
		$new_password = parent::$params['new_password'] ?? '';
		$new_password_hash = hash('sha256', $new_password);

		if(
			strlen($new_password) < 8 ||
			!preg_match('/[\'\/~`\!@#\$%\^&\*\(\)_\-\+=\{\}\[\]\|;:"\<\>,\.\?\\\]/', $new_password) ||
			!preg_match('/[0-9]/', $new_password)
		) {
			_exit(
				'error',
				'Password must be at least 8 characters long, contain at least one (1) number, and one (1) special character',
				400,
				'Invalid password. Does not meet complexity requirements'
			);
		}

		// check mfa allowance
		$mfa_response = $helper->consume_mfa_allowance($guid);

		if(!$mfa_response) {
			_exit(
				'error',
				'Requires MFA confirmation first',
				403,
				'Requires MFA confirmation first'
			);
		}

		// check existing
		$query = "
			SELECT password
			FROM users
			WHERE guid = '$guid'
		";
		$check = $db->do_select($query);
		$check = $check[0] ?? null;
		$fetched_password_hash = $check[0]['password'] ?? '';

		if($new_password_hash == $fetched_password_hash) {
			_exit(
				'error',
				'Cannot use the same password as before',
				400,
				'Cannot use the same password as before'
			);
		}

		// update
		$query = "
			UPDATE users
			SET password = '$new_password_hash'
			WHERE guid = '$guid'
		";
		$db->do_query($query);

		_exit(
			'success',
			'Successfully updated password'
		);
	}
}
new UserUpdatePassword();