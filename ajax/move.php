<?php
require('../init.php');
$username = $_SESSION['username'];
$gameid = $_GET['id'];
$color = $_GET['color'];
$x_from = $_GET['x_from'];
$x_to = $_GET['x_to'];
$y_from = $_GET['y_from'];
$y_to = $_GET['y_to'];
$name = $_GET['name'];
$sql = "select current_player,board from game where id=$gameid";
$board = $db->getOne($sql);
$boardArr = json_decode($board['board']);
foreach($boardArr as $k=>$v) {
	if($v[0] == $color && $v[1] == $name && $v[2] == $x_from && $v[3] == $y_from) {
		$boardArr[$k][2] = $x_to;
		$boardArr[$k][3] = $y_to;
	}
}
if($board['current_player'] == 'red') {
	$current_player = 'black';
} else {
	$current_player = 'red';
}
$boardArr = json_encode($boardArr);
$sql = "update game set board='{$boardArr}',
		current_player='{$current_player}' 
		where id=$gameid";
//echo $sql;
$db->query($sql);