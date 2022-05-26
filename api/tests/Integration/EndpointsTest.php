<?php
/**
 * API endpoint unit test.
 * Test public non-auth'd endpoints, positive and negative, to ensure router integrity
 *
 * @method void testDispenseOrder()
 * @method void testRegisterNewUser()
 * @method void testRejectExistingEmailRegistration()
 *
 */
use PHPUnit\Framework\TestCase;

include_once(__DIR__.'/../../core.php');

final class EndpointsTest extends TestCase
{
	public function testRegisterNewUser()
	{
		global $db;

		$query = "
			DELETE FROM users
			WHERE guid = '00000000-0000-0000-4c4c-000000000000'
		";
		$db->do_query($query);
		$query = "
			DELETE FROM ips
			WHERE guid = '00000000-0000-0000-4c4c-000000000000'
		";
		$db->do_query($query);
		$query = "
			DELETE FROM sessions
			WHERE guid = '00000000-0000-0000-4c4c-000000000000'
		";
		$db->do_query($query);
		$query = "
			DELETE FROM limits
			WHERE guid = '00000000-0000-0000-4c4c-000000000000'
		";
		$db->do_query($query);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, CORS_SITE.'/user/register');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		$fields = array(
			"email" => "dev-test@example.com",
			"first_name" => "dev",
			"last_name" => "test",
			"password" => "dev-test-Password123",
			"company" => "Test Company",
			"description" => "Test description",
			"cspr_expectation" => 100,
			"phpunittesttoken" => "phpunittesttoken"
		);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
		$headers = array();
		$headers[] = 'Content-Type: application/json';
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($ch);
		curl_close($ch);
		$json = json_decode($response);
		$bearer = $json->detail->bearer;
		$guid = $json->detail->guid;
		$this->assertEquals($guid, '00000000-0000-0000-4c4c-000000000000');
		$this->assertEquals(256, strlen($bearer));
	}

	public function testRejectExistingEmailRegistration()
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, CORS_SITE.'/user/register');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		$fields = array(
			"email" => "dev-test@example.com",
			"first_name" => "dev",
			"last_name" => "test",
			"password" => "dev-test-Password123",
			"company" => "Test Company",
			"description" => "Test description",
			"cspr_expectation" => 100,
			"phpunittesttoken" => "phpunittesttoken"
		);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
		$headers = array();
		$headers[] = 'Content-Type: application/json';
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$response = curl_exec($ch);
		curl_close($ch);
		$this->assertEquals(400, curl_getinfo($ch, CURLINFO_RESPONSE_CODE));
	}
}

?>