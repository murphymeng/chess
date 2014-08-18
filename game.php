<?php
require('init.php');
$username = $_SESSION['username'];
$gameid = $_GET['id'];
$sql = "select * from game where id=$gameid";
$row = $db->getOne($sql);
if($row['redname'] == $username) {
	$user_color = 'red';
} else {
	$sql = "update game set blackname='{$username}' where id=$gameid";
	$db->query($sql);
	$user_color = 'black';
}
$game = $db->getById('game', $gameid);

include("templates/game.php");
?>
