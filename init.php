<?php
session_start();
$base_path = "http://localhost/chess/";
$actual_link = "http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
define('CHESS_ROOT', dirname(__FILE__));

require_once CHESS_ROOT . '/includes/db_config.php';
require_once CHESS_ROOT . '/includes/common.php';
require_once CHESS_ROOT . '/lib/Mysql.php';
$db = new DB(DB_HOST, DB_USER, DB_PASSWD, DB_NAME);
//pr(DB_HOST . DB_USER . DB_PASSWD. DB_NAME);
require_once CHESS_ROOT . '/lib/Base.php';
require_once CHESS_ROOT . '/lib/User.php';
$basename = basename($_SERVER['PHP_SELF']);
if(User::hasLogin() == false && $basename != 'login.php') {
	$header_url = $base_path . "login.php?redirecturl=" . $actual_link;
	header("Location:{$header_url}");
}

//pr($_SERVER);