<?php
/**
 * Start session
 */
session_start();

/**
 * Load config
 */
if (!file_exists(__DIR__ . '/.env')) {
	header('Content-type:application/json;charset=utf-8');
	http_response_code(500);
	exit(json_encode(array(
		'status' => 'error',
		'detail' => 'Please configure API server. error code 1'
	)));
}

include_once('classes/dotenv.php');
$dotenv = new Dotenv(__DIR__ . '/.env');
$dotenv->load();

define('BASE_DIR', __DIR__);
define('API_VERSION', 1);
define('APP_NAME', getenv('APP_NAME'));
define('CORS_SITE', getenv('CORS_SITE'));
define('DB_HOST', getenv('DB_HOST'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
define('DB_NAME', getenv('DB_NAME'));
define('ADMIN_EMAIL', getenv('ADMIN_EMAIL'));
define('MASTER_KEY', getenv('MASTER_KEY'));
define('CRON_TOKEN', getenv('CRON_TOKEN'));
define('DEV_MODE', (bool)(getenv('DEV_MODE')));
define('DB_CONN', (getenv('DB_CONN')));

if (filter_var(getenv('NODE_IP'), FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
	define('NODE_IP', 'http://' . getenv('NODE_IP').':7777');
} else {
	define('NODE_IP', 'http://127.0.0.1:7777');
}

/**
 * Load classes
 */
include_once('vendor/autoload.php');
DB_CONN == 'sqlite' ? include_once('classes/sqlite.php') : include_once('classes/db.php');
include_once('classes/helper.php');
include_once('classes/throttle.php');
include_once('classes/endpoints.php');
include_once('classes/totp.php');

/**
 * Instantiate
 *
 * @var DB        $db            Database instance.
 * @var Helper    $helper        Helper instance.
 * @var Throttle  $throttle      Helper instance.
 * @var RpcClient $casper_client Helper instance.
 *
 */
$db = new DB();
$helper = new Helper();
$db->check_integrity();
$throttle = new Throttle($helper->get_real_ip());
$casper_client = new Casper\Rpc\RpcClient(NODE_IP);

/**
 * Error logging
 *
 * @param string $msg
 */
function elog($msg) {
	file_put_contents('php://stderr', print_r("\n", true));
	file_put_contents('php://stderr', '['.APP_NAME.' '.(date('c')).'] - ');
	file_put_contents('php://stderr', print_r($msg, true));
}

/**
 * Response code handler, if PHP version < 5.4
 *
 * @param  string $code
 * @return int    $code
 */
if (!function_exists('http_response_code')) {
	function http_response_code($code = NULL) {
		if ($code !== NULL) {
			switch ($code) {
				case 100: $text = 'Continue'; break;
				case 101: $text = 'Switching Protocols'; break;
				case 200: $text = 'OK'; break;
				case 201: $text = 'Created'; break;
				case 202: $text = 'Accepted'; break;
				case 203: $text = 'Non-Authoritative Information'; break;
				case 204: $text = 'No Content'; break;
				case 205: $text = 'Reset Content'; break;
				case 206: $text = 'Partial Content'; break;
				case 300: $text = 'Multiple Choices'; break;
				case 301: $text = 'Moved Permanently'; break;
				case 302: $text = 'Moved Temporarily'; break;
				case 303: $text = 'See Other'; break;
				case 304: $text = 'Not Modified'; break;
				case 305: $text = 'Use Proxy'; break;
				case 400: $text = 'Bad Request'; break;
				case 401: $text = 'Unauthorized'; break;
				case 402: $text = 'Payment Required'; break;
				case 403: $text = 'Forbidden'; break;
				case 404: $text = 'Not Found'; break;
				case 405: $text = 'Method Not Allowed'; break;
				case 406: $text = 'Not Acceptable'; break;
				case 407: $text = 'Proxy Authentication Required'; break;
				case 408: $text = 'Request Time-out'; break;
				case 409: $text = 'Conflict'; break;
				case 410: $text = 'Gone'; break;
				case 411: $text = 'Length Required'; break;
				case 412: $text = 'Precondition Failed'; break;
				case 413: $text = 'Request Entity Too Large'; break;
				case 414: $text = 'Request-URI Too Large'; break;
				case 415: $text = 'Unsupported Media Type'; break;
				case 429: $text = 'Too Many Requests'; break;
				case 500: $text = 'Internal Server Error'; break;
				case 501: $text = 'Not Implemented'; break;
				case 502: $text = 'Bad Gateway'; break;
				case 503: $text = 'Service Unavailable'; break;
				case 504: $text = 'Gateway Time-out'; break;
				case 505: $text = 'HTTP Version not supported'; break;
				default:
					exit('Unknown http status code "' . htmlentities($code) . '"');
				break;
			}
			$protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');
			header($protocol . ' ' . $code . ' ' . $text);
			$GLOBALS['http_response_code'] = $code;
		} else {
			$code = (isset($GLOBALS['http_response_code']) ? $GLOBALS['http_response_code'] : 200);
		}
		return $code;
	}
}

/**
 * exit handler to include exit code, status, detail, exception
 *
 * @param  string $status
 * @param  string $detail
 * @param  int    $exit_code
 * @param  string $exception
 *
 */
function _exit($status, $detail, $exit_code = 200, $exception = '') {
	if ($exit_code != 200) {
		elog(
			strtoupper($_SERVER['REQUEST_METHOD'] ?? '') . ' ' . 
			($_SERVER['REQUEST_URI'] ?? '/').' '.
			(string) $exit_code . ' ' . 
			$status .
			($exception ? ' - ' : '') . $exception
		);
	}

	header('Content-type:application/json;charset=utf-8');
	http_response_code($exit_code);

	if ($exit_code == 401) {
		header('WWW-Authenticate: Bearer token;error="invalid_or_expired_token"');
	}

	exit(json_encode(array(
		'status' => $status,
		'detail' => $detail
	)));
}

/**
 * Get http method
 *
 * @return string
 */
function get_method() {
	if(isset($_SERVER['REQUEST_METHOD'])) return strtoupper($_SERVER['REQUEST_METHOD']);
	return 'GET';
}

/**
 * Require http method
 *
 * @param  string|array $m accepted method/methods
 * @return bool
 */
function require_method($m) {
	$method = get_method();

	if ($method == 'OPTIONS') {
		_exit('success', 'Success', 200);
	}

	if(gettype($m) == 'array') {
		if(in_array($method, $m)) {
			return true;
		}

		_exit(
			'error', 
			'Invalid method. Only '.implode('/', $m).' allowed', 
			405
		);
	} else {
		if($method == $m) {
			return true;
		}

		_exit(
			'error', 
			'Invalid method. Only '.$m.' allowed', 
			405
		);
	}
}

/**
 * Filter/sanitize parameters for GET requests
 *
 * @param  string $string Untrusted string to filter
 * @return string
 */
function filter($string) {
	if (gettype($string) == 'array')
		return $string;

	$string = addslashes(trim($string));
	return htmlentities($string, ENT_COMPAT | ENT_HTML401, 'UTF-8');
}

/**
 * Filter/sanitize nested json parameters for GET requests
 *
 * @param  array $data
 * @return array
 */
function filter_array($data = array()) {
	if($data && count($data) > 0){
		foreach($data as $key => &$value) {
			$value = filter($value);
		}
	}
	return $data;
}

/**
 * Filter/sanitize json parameters for POST requests
 *
 * @return array
 */
function get_params() {
	$jsonString = file_get_contents('php://input');
	$json = json_decode($jsonString, true);
	if(!$json || count($json) == 0) return null;
	return filter_array($json);
}

/**
 * Authenticate a session for frontend
 *
 * If session belongs to a role with low clearance, checks for admin approval/verification. With some exceptions.
 *
 * @param  int   $required_clearance
 * @return array
 *
 */
function authenticate_session($required_clearance = 1) {
	global $db, $helper;

	$headers = getallheaders();

	$auth_bearer_header = (
		$headers['Authorization'] ??
		$headers['authorization'] ??
		''
	);

	$auth_bearer = explode(' ', $auth_bearer_header);
	$auth_bearer_t = $auth_bearer[0];
	$auth_bearer = filter($auth_bearer[1] ?? '');

	if(strtolower($auth_bearer_t) != 'bearer') {
		_exit(
			'error', 
			'Unauthorized', 
			401,
			'Bearer token not found'
		);
	}

	if (!ctype_xdigit($auth_bearer) || strlen($auth_bearer) != 256) {
		_exit(
			'error', 
			'Invalid bearer token', 
			401,
			'Invalid bearer token'
		);
	}

	$query = "
		SELECT a.guid, a.expires_at, b.role, b.twofa, b.verified, b.admin_approved
		FROM sessions AS a
		JOIN users AS b
		ON a.guid = b.guid
		WHERE a.bearer = '$auth_bearer'
	";

	$selection = $db->do_select($query);
	$selection = $selection[0] ?? null;
	$guid = $selection['guid'] ?? '';
	$session_role = $selection['role'] ?? '';
	$expires_at = $selection['expires_at'] ?? date('Y-m-d H:i:s', 0);
	$verified = (int)($selection['verified'] ?? 0);
	$admin_approved = (int)($selection['admin_approved'] ?? 0);
	$clearance = 0;

	if(!$selection) {
		_exit(
			'error', 
			'Unauthorized', 
			401,
			'No session token found'
		);
	}

	if($expires_at < $helper->get_datetime()) {
		$query = "
			DELETE FROM sessions
			WHERE guid = '$guid'
		";
		$db->do_query($query);
		_exit(
			'error', 
			'Session expired', 
			401,
			'Expired session token'
		);
	}

	switch ($session_role) {
		case 'test-user': $clearance = 0; break;
		case 'user': $clearance = 1; break;
		case 'sub-admin': $clearance = 2; break;
		case 'admin': $clearance = 3; break;
		case 'super-admin': $clearance = 4; break;
		default: $clearance = 0; break;
	}

	if ($clearance < $required_clearance) {
		_exit(
			'error',
			'Unauthorized',
			403,
			'Failed clearance check'
		);
	}

	/* if session belongs to a role with low clearance */
	if ($clearance < 2) {
		$request_uri = $_SERVER['REQUEST_URI'] ?? '';

		if (
			($admin_approved == 0 || $verified == 0) &&
			$request_uri != '/user/confirm-registration' &&
			$request_uri != '/user/resend-code' &&
			$request_uri != '/user/me' &&
			$request_uri != '/user/logout'
		) {
			_exit(
				'error', 
				'Unauthorized', 
				403,
				'Failed clearance level 1 with no verification or admin approval'
			);
		}
	}

	/* fail for banned sub-admin role */
	if ($clearance == 2 && $admin_approved == 0) {
		_exit(
			'error', 
			'Unauthorized', 
			403,
			'Failed clearance level 2 with no verification or admin approval'
		);
	}

	return $selection;
}

/**
 * Authenticate a request to the public cron panel for control
 *
 * @return bool
 */
function authenticate_cron() {
	global $db;

	$headers = getallheaders();

	$auth_token_header = (
		$headers['Authorization'] ??
		$headers['authorization'] ??
		''
	);

	$auth_token = explode(' ', $auth_token_header);
	$auth_token_t = $auth_token[0];
	$auth_token = filter($auth_token[1] ?? '');

	if ($auth_token_t != 'Token' && $auth_token_t != 'token') {
		_exit(
			'error', 
			'Unauthorized', 
			401
		);
	}

	if (!hash_equals($auth_token, CRON_TOKEN)) {
		_exit(
			'error', 
			'Unauthorized', 
			401
		);
	}

	return true;
}

/**
 * Filter/sanitize parameters for GET requests
 *
 * @param  string $key
 * @param  int    $strict for more strictness in filtering
 * @return string
 */
function _request($key, $strict = 0) {
	if (isset($_REQUEST[$key])) {
		if ($strict == 1) {
			$data = $_REQUEST[$key];
			$output = '';
			$length = strlen($data);

			for ($i = 0; $i < $length; $i++) {
				if(preg_match("/['A-Za-z0-9.,-@+]+/", $data[$i])) {
					$output .= $data[$i];
				}
			}
			return filter($output);
		} elseif($strict == 2) {
			$data = $_REQUEST[$key];
			$output = '';
			$length = strlen($data);

			for ($i = 0; $i < $length; $i++) {
				if(preg_match("/[A-Za-z0-9]+/", $data[$i])) {
					$output .= $data[$i];
				}
			}
			return filter($output);
		}
		return filter($_REQUEST[$key]);
	}
	return '';
}

/**
 * Request origin protection
 */
function cors_protect() {
	if(!isset($_SERVER['HTTP_REFERER'])) {
		header("Location: /");
		exit('Error - Browser referrer-policy. Please refresh or <a href="/">Return Home</a>');
	}

	$origin = $_SERVER['HTTP_REFERER'];
	$origin = str_replace('http://', '', $origin);
	$origin = str_replace('https://', '', $origin);
	$origin = explode('/', $origin)[0];
	$origincom = explode('.com', $origin)[0];
	$originco = explode('.co', $origin)[0];
	$originnet = explode('.net', $origin)[0];
	$originio = explode('.io', $origin)[0];

	if($origincom != CORS_SITE) {
		header("Location: /");
		exit('Error - Browser referrer-policy. Please refresh or <a href="/">Return Home</a>');
	}
}

/**
 * CSRF protection
 */
function csrf_protect() {
	if (!isset($_POST['token']) && !isset($_GET['token'])) {
		header("Location: /");
		exit('Error - Missing CSRF_TOKEN. <a href="/">Return home</a>');
	}
	if (isset($_REQUEST['token_type']) && $_REQUEST['token_type'] == 'immortal')
		$_SESSION['token'] = $_REQUEST['token'];
	if (!hash_equals($_SESSION['token'], $_REQUEST['token'])) {
		header("Location: /");
		exit('Error - Missing CSRF_TOKEN. <a href="/">Return home</a>');
	}
}

function generateCSRFToken() {
	if(!isset($_SESSION['token']) || (isset($_SESSION['token']) && $_SESSION['token'] == '')) {
		$_SESSION['token'] = bin2hex(random_bytes(32));
	}
	return $_SESSION['token'];
}

define('CSRF_TOKEN', generateCSRFToken());
?>