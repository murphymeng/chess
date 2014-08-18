<?php
require('init.php');
$username = $_SESSION['username'];
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
function createRoom() {
    $.post("ajax/create_room.php", function(data) {
      document.location.href="game.php?id="+data;
    });
}
</script>
</head>
<body>
<div>
<label>用户名：</label><span id="redname"><?php echo $username;?></span>
</div>
<div>
<input type="button" value="创建房间" onclick="createRoom()"/>
</div>
</body>
</html>