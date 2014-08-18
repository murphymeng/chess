<?php
require('../init.php');
$username = $_SESSION['username'];
$create_time = time();


$board = array(
					'red'=>array(
									'Bing'=> array(array(8,3),array(6,3),array(4,3),array(2,3),array(0,3)),
	 								'Pao' => array(array(7,2),array(1,2)),
									'Che' => array(array(8,0),array(0,0)),
									'Ma'  => array(array(7,0),array(1,0)),
									'Xiang'=> array(array(6,0),array(2,0)),
									'Shi' => array(array(3,0),array(5,0)),
									'Jiang' => array(array(4,0))
								),
					'black'=>array(
									'Bing'=> array(array(8,6),array(6,6),array(4,6),array(2,6),array(0,6)),
	 								'Pao' => array(array(7,7),array(1,7)),
									'Che' => array(array(8,9),array(0,9)),
									'Ma'  => array(array(7,9),array(1,9)),
									'Xiang'=> array(array(6,9),array(2,9)),
									'Shi' => array(array(3,9),array(5,9)),
									'Jiang' => array(array(4,9))
								)
				);

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
$sql = "insert into game set
		redname='{$username}',
		create_time={$create_time},
		board='{$board}'";
$db->query($sql);
$gameid = $db->getLastId();
$arr = array('gameid'=>$gameid);
echo $gameid;