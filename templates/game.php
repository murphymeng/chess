<!doctype html>  
<html lang="en" class="no-js">
<meta charset="utf-8" />
<head>
	<script type='text/javascript' src='js/jquery.js'></script>
	<style type="text/css">.recentcomments a{display:inline !important;padding:0 !important;margin:0 !important;}</style>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script type="text/javascript">
var userColor = '<?php echo $user_color;?>';
var currentColor = '<?php echo $row['current_player'];?>';
var gameid = <?php echo $gameid;?>
</script>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/chess.js"></script>
<script src="js/socket.io/socket.io.js"></script>
<script type="text/javascript">

function reset() {
	$.get("ajax/reset.php",
		{
			id: 11
		},
	function(data){
		document.location.href="game.php?id=11";			
	})
}
</script>

</head>
<body>

<section id="content" class="full-width">
	<div class="inner-content">
	    <div class="notice yellow">
			<!-- 棋盘内容 -->
			<div id="qipan" ></div>
			<div id="show">	
				<div>
				<label style="color:red">红方：</label><span style="color:red" id="redname"><?php echo $game['redname'];?></span>
				</div>
				<div style="margin-top:20px;">
				<label>黑方：</label><span id="blackname"><?php echo $game['blackname'];?></span>
				</div>
			</div>
			<div>
			<input type="button" name="" value="reset" onclick="reset()" />
			</div>
			<!-- /#棋盘内容 -->
		</div>	    
	</div><!-- /inner-content -->
</section><!--/#content-->

</body>
</html>
	
