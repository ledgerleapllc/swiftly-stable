<?php
include_once('../../core.php');
/**
 *
 * GET /user/me
 *
 * HEADER Authorization: Bearer
 *
 */
class UserMe extends Endpoints {
	function __construct() {
		global $db, $helper;

		require_method('GET');
		$auth = authenticate_session();
		$guid = $auth['guid'] ?? '';

		$query = "
			SELECT
			guid, role, account_type, email, verified, first_name, last_name,
			created_at, last_ip, description, admin_approved, deny_reason, twofa, totp,
			phone, address, address2, country_residence, country_citizenship
			FROM users
			WHERE guid = '$guid'
		";

		$me = $db->do_select($query);
		$me = $me[0] ?? null;

		if ($me) {
			$query2 = "
				SELECT *
				FROM entities
				WHERE guid = '$guid'
			";
			$ent = $db->do_select($query2);

			if ($ent) {
				$me['entity'] = $ent[0];
			}
		}

		if($me) {
			_exit(
				'success',
				$me
			);
		}

		_exit(
			'error',
			'Unauthorized',
			403,
			'Unauthorized'
		);
	}
}
new UserMe();