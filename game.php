<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>中国象棋</title>
    <link rel="stylesheet" href="css/style.css"/>
    <script type="text/javascript">
        myColor = '<?php echo $_GET['color'];?>';
        rid = <?php if(isset($_GET['rid'])) {echo $_GET['rid'];} else {echo 1;}?>;
        serverIp = '<?php echo $_SERVER['REMOTE_ADDR'];?>';
    </script>
    <script src="js/socket.io/socket.io.js"></script>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/underscore.js"></script>
    <script src="js/vendor/backbone.js"></script>
    <script src="js/Board.js"></script>
    <script src="js/Qizi.js"></script>
    <script src="js/main.js"></script>
</head>
<body>

<div id="board" class="board"></div>
<div class ="color-div"><span id="color">红方回合</span></div>
</body>
</html>