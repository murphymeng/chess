<?php
$base_path = "http://localhost/chess/";
define('CHESS_ROOT', dirname(__FILE__));

require_once CHESS_ROOT . '/includes/config.php';
require_once CHESS_ROOT . '/includes/common.php';
	
require_once CHESS_ROOT . '/lib/User.php';

if(!User::hasLogin()) {
	header("Location:{$base_path}login.php");
}