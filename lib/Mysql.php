<?php
	
class DB {
	
	public $con;
	public $host;
	public $username;
	public $password;
	public $db;
	
	function DB($host, $username, $password, $db) {
		$this->con = mysql_connect($host, $username, $password);
		mysql_select_db($db);
		mysql_query("set names 'utf8' ");
	}
	
	function query($sql) {
		mysql_query($sql);
	}
	
	function getAll($sql) {
		$query = mysql_query($sql, $this->con);
		$arr = array();
		while($row = mysql_fetch_array($query)) {
			$arr[] = $row;
		}
		return $arr;
	}
	
	function getOne($sql) {
		$result = mysql_query($sql, $this->con);
		if(!$result) {
			return false;
		} else {
			return mysql_fetch_array($result);
		}
		
	}
	
	function getById($table, $id){
		return $this->getOne("select * from {$table} where id=$id");
	}
	
	function getLastId() {
		return mysql_insert_id();
	}
}

