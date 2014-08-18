<?php
require('init.php');
if(isset($_POST['c_username']) && $_POST['c_password']) {
	$username = $_POST['c_username'];
	$password = $_POST['c_password'];
	User::validate($username, $password);
	
	
	if(User::validate($username, $password) == true) {
		$_SESSION['username'] = $username;
		if(isset($_POST['redirecturl']) && $_POST['redirecturl']) {
			redirect($_POST['redirecturl']);
		} else {
			redirect('./index.php');
		}
			
	} else {
		echo "用户名密码错误";
	}
	
}
if(isset($_GET['redirecturl']) && $_GET['redirecturl'])
	$redirecturl = $_GET['redirecturl'];
else 
	$redirecturl = '';
require 'templates/login.php';
?>
