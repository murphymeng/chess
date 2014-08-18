<?php
require('../init.php');
$username = $_SESSION['username'];
$gameid = $_GET['id'];
$board = array(
	array('red','Bing',8,3),
	array('red','Bing',6,3),
	array('red','Bing',4,3),
	array('red','Bing',2,3),
	array('red','Bing',0,3),
	array('red','Pao',7,2),
	array('red','Pao',1,2),
	array('red','Che',8,0),
	array('red','Che',0,0),
	array('red','Ma',7,0),
	array('red','Ma',1,0),
	array('red','Xiang',6,0),
	array('red','Xiang',2,0),
	array('red','Shi',3,0),
	array('red','Shi',5,0),
	array('red','Jiang',4,0),
	array('black','Bing',8,6),
	array('black','Bing',6,6),
	array('black','Bing',4,6),
	array('black','Bing',2,6),
	array('black','Bing',0,6),
	array('black','Pao',7,7),
	array('black','Pao',1,7),
	array('black','Che',8,9),
	array('black','Che',0,9),
	array('black','Ma',7,9),
	array('black','Ma',1,9),
	array('black','Xiang',6,9),
	array('black','Xiang',2,9),
	array('black','Shi',3,9),
	array('black','Shi',5,9),
	array('black','Jiang',4,9),
	);
$board = json_encode($board);
$sql = "update game set
		current_player='red',
		board='{$board}'
		where id=$gameid";
$db->query($sql);
