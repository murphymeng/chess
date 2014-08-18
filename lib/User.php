<?php

class User extends Base {
	public function __construct() {
		parent::__construct();
		//$this->username = $username;
	}
	public function setColor($color) {
		$this->color = $color;
	}
	static function hasLogin() {
		if( isset($_SESSION['username']) && $_SESSION['username'] ) {
			return true;
		} else
			return false;
	}
	
	static function validate($username, $password) {
		global $db;
		if($db->getOne("select * from user where username='{$username}' and password='{$password}'")) {
			return true;
		} else{
			return false;
		}
	}
}