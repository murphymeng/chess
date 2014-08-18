<?php
require('../init.php');
$username = $_SESSION['username'];
$gameid = $_GET['id'];
$color = $_GET['color'];
$x = $_GET['x'];
$y = $_GET['y'];
$name = $_GET['name'];
$sql = "select current_player,board from game where id=$gameid";
$board = $db->getOne($sql);

$tempArr = array();

$boardArr = json_decode($board['board']);
foreach($boardArr as $k=>$v) {
	//pr($v[0] . "#" . $v[1] . '#'.$v[2].'#'.$v[3]);
	//pr($color . "%" . $name . '%'.$x.'%'.$y);
	if($v[0] == $color && $v[1] == $name && $v[2] == $x && $v[3] == $y) {
		//unset($boardArr[$k]);
	} else {
		array_push($tempArr, $v);
	}
}

$boardArr = json_encode($tempArr);
$sql = "update game set board='{$boardArr}'
		where id=$gameid";
//echo $sql;
$db->query($sql);