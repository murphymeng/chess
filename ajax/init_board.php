<?php
require('../init.php');
$username = $_SESSION['username'];
$create_time = time();
$gameid = $_GET['id'];
$sql = "select board from game where id=$gameid";
$board = $db->getOne($sql);
echo $board['board'];
//$arr = json_decode($board['board']);
//var_dump($arr);