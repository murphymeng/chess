var chessWidth = 46;
var chessHeight = 46;

var boardTop = 440;
var boardLeft = 28;

var gridHeight = 46;
var gridWidth = 46;

function Board() {
	//当前应走的一方
	this.currentColor = currentColor;
	this.readyPiece = null;
	this.boardArr = new Array();
	for(var i = 0; i < 9; i++) {
		this.boardArr[i] = new Array();
	}
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j< 10; j++) {
			this.boardArr[i][j] = 0;
		}
	}
}
Board.prototype.turnColor = function() {
	if(this.currentColor == "red") {
		this.currentColor = "black";
	} else {
		this.currentColor = "red";
	}
}
Board.prototype.cover = function(x, y , piece) {
	this.boardArr[x][y] = piece;
}
//棋盘对象
board = new Board();

function Piece(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    
    //board.boardArr[x][y] = this;
	
	this.qiziTop = boardTop - y*gridHeight - chessHeight/2;
	this.qiziLeft = boardLeft + x*gridWidth - chessWidth/2;
	this.id = color + this.name + x + y;
	this.cls = "qizi " + color + this.name;
	this.qiziHtml = "<div style='left:"+this.qiziLeft+"px;top:"+this.qiziTop+"px;' id='"+this.id+"' class='"+this.cls+"'></div>";
	$('#qipan').append(this.qiziHtml);
 
	
    this.test = function() {
	    alert('test');
    }
};

Piece.prototype.moveto = function(x, y) {
	this.x = x;
	this.y = y;
}
Piece.prototype.remove = function(x, y) {
	jQuery("#"+this.id).remove();
	$.get("ajax/remove.php",
		{
			id: gameid,
			color: this.color,
			name: this.name,
			x: this.x,
			y: this.y
		},function(data){
		
	});
	
	
}
Piece.prototype.test = function() {alert('test')};

Piece.prototype.moveTo = function(x, y) {
	
	leftValue = "+=0";
	topValue = "+=0";
	if(x > this.x) {
		leftValue = "+=" + (x - this.x) * gridWidth;
	} else if(x < this.x) {
		leftValue = "-=" + (this.x - x) * gridWidth;
	}
	if(y > this.y)
		topValue = "-=" + (y - this.y) * gridHeight;
	else if(y < this.y)
		topValue = "+=" + (this.y - y) * gridHeight;
	
	
	$.get("ajax/move.php",
			{
				id: gameid,
				color: this.color,
				name: this.name,
				x_from: this.x,
				y_from: this.y,
				x_to  : x,
				y_to  : y
			},function(data){
				
			});
	var tempColor = this.color;
	var tempqiziLeft = this.qiziLeft;
	var tempqiziTop = this.qiziTop;
	var tempx = this.x;
	var tempy = this.y;
	$("#"+this.id).animate({"top":topValue, "left":leftValue}, "fast", function() {
		
		
		if(board.boardArr[x][y].color && board.boardArr[x][y].color != tempColor) {
			board.boardArr[x][y].remove(x, y);
			
		}
		
		if(tempColor != userColor) {
			var tempid = $(".k").attr("id");
			if( tempid != undefined) {
				var tempcls = "qizi " + tempid.substring(0, tempid.length - 2);
				$("#" + tempid).attr("class", tempcls);
			}
			$('.kuang').remove();
			
			
			$("#"+board.boardArr[tempx][tempy].id).addClass(board.boardArr[tempx][tempy].color + board.boardArr[tempx][tempy].name +"_c");
			$("#"+board.boardArr[tempx][tempy].id).addClass("k");
		}

		
		var lastHtml = "<div style='left:"+tempqiziLeft+"px;top:"+tempqiziTop+"px;' id='kuang' class='kuang'></div>";
		$('#qipan').append(lastHtml);
		board.boardArr[tempx][tempy] = 0;
		board.boardArr[tempx][tempy].x = x;
		board.boardArr[tempx][tempy].y = y;
		board.cover(x, y, board.boardArr[tempx][tempy]);
		
	});
	
	

}


//定义兵类
function Bing(x, y, color) {
	this.name = "Bing";
	Piece.call(this, x, y, color);
}
//从棋子类继承兵类
Bing.prototype = new Piece();

Bing.prototype.isAllowTo = function(x, y) {
	//目标位置上已经有己方的棋子
	if(board.boardArr[x][y] != 0 && board.boardArr[x][y].color == this.color) return false;
	
	if(this.color == "red") {
		if(y == this.y + 1 && y >= 0 && y <= 9 && this.x == x) {
			return true
		} else if( ((this.x + 1 == x) || (this.x - 1 == x)) && y == this.y && 0<=x<=8 && y >= 5) {
			return true;
		}
	} else if(this.color == "black") {
		if( x >=0 && x <= 8 && y >=0 && y <= 9) {
			if( y == this.y - 1 && this.x == x ) {
				return true;
			} else if( y <= 4 && ((this.x + 1 == x) || (this.x - 1 == x)) ) {
				return true;
			}
		}
	}
	
	return false;
}



//定义马类
function Ma(x, y, color) {
	this.name = "Ma";
	Piece.call(this, x, y, color);
}
Ma.prototype = new Piece();

Ma.prototype.isAllowTo = function(x, y) {
	
	if(x >=0 && x <= 8 && y >=0 && y <= 9) {
		
		if(Math.abs(y - this.y) == 1) {
			
			if( x - this.x == 2 && board.boardArr[this.x+1][this.y] == 0) {
				return true;
			} else if(this.x - x == 2 && board.boardArr[this.x - 1][this.y] == 0) {
				return true;
			} 
		} else if(Math.abs(y - this.y) == 2) {
			if( y - this.y == 2 && board.boardArr[this.x][this.y+1] == 0) {
				return true;
			} else if(this.y - y == 2 && board.boardArr[this.x][this.y-1] == 0) {
				return true;
			}
		}
	}
	return false;

}


//定义车类
function Che(x, y, color) {
	this.name = "Che";
	Piece.call(this, x, y, color);
}
Che.prototype = new Piece();

Che.prototype.isAllowTo = function(x, y) {
	
	if(x >=0 && x <= 8 && y >=0 && y <= 9) {
		
		if(x == this.x && y > this.y) {
			for(i = this.y + 1; i < y; i++) {
				if(board.boardArr[x][i]) {
					return false
				}
			}
			return true;
		} else if(x == this.x && y < this.y) {
			for(i = y + 1; i < this.y; i++) {
				if(board.boardArr[x][i]) {
					return false
				}
			}
			return true;
		} else if(y == this.y && x > this.x) {
			for(i = this.x + 1; i < x; i++) {
				if(board.boardArr[i][y]) {
					return false
				}
			}
			return true;
		} else if(y == this.y && x < this.x) {
			for(i = x + 1; i < this.x; i++) {
				if(board.boardArr[i][y]) {
					return false
				}
			}
			
			return true;
		}
	
	}
	return false;

}


//定义象类
function Xiang(x, y, color) {
	this.name = "Xiang";
	Piece.call(this, x, y, color);
}
Xiang.prototype = new Piece();

Xiang.prototype.isAllowTo = function(x, y) {
	
	if(x >=0 && x <= 8) {
		if(this.color == "red") {
			if(y>=0 && y <= 4 && Math.abs(x - this.x) == 2 && Math.abs(y - this.y) == 2 && board.boardArr[(x + this.x) / 2][(y + this.y) / 2] == 0) {
				return true;
			}
		} else if(this.color == "black") {
			if(y >=5 && y <= 9 && Math.abs(x - this.x) == 2 && Math.abs(y - this.y) == 2 && board.boardArr[(x + this.x) / 2][(y + this.y) / 2] == 0) {
				return true;
			}
		}
	}
	return false;
}

//定义士类
function Shi(x, y, color) {
	this.name = "Shi";
	Piece.call(this, x, y, color);
}
Shi.prototype = new Piece();

Shi.prototype.isAllowTo = function(x, y) {
	
	if(x >= 3 && x <= 5) {
		if(this.color == "red" && y >= 0 && y <= 2) {
			if(Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 1) {
				return true;
			}
		} else if(this.color == "black" && y >= 7 && y <= 9) {
			if(Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 1) {
				return true;
			}
		}
	}
	return false;
}

//定义将类
function Jiang(x, y, color) {
	this.name = "Jiang";
	Piece.call(this, x, y, color);
}
Jiang.prototype = new Piece();

Jiang.prototype.isAllowTo = function(x, y) {
	
	if(x >= 3 && x <= 5) {
		if(this.color == "red" && y >= 0 && y <= 2) {
			if( (Math.abs(x - this.x) == 1 && y == this.y) || (Math.abs(y - this.y) == 1 && x == this.x) )
				return true;
		} else if(this.color == "black" && y >= 7 && y <= 9) {
			if( (Math.abs(x - this.x) == 1 && y == this.y) || (Math.abs(y - this.y) == 1 && x == this.x) )
				return true;
		}
	}
	return false;
}

//定义炮类
function Pao(x, y, color) {
	this.name = "Pao";
	Piece.call(this, x, y, color);
}
Pao.prototype = new Piece();

Pao.prototype.isAllowTo = function(x, y) {
	
	if(x >=0 && x <= 8 && y >=0 && y <= 9) {
		
		countTemp = 0;
		
		if(x == this.x && y > this.y) {
			for(i = this.y + 1; i < y; i++) {
				if(board.boardArr[x][i]) {
					countTemp++;
				}
			}
		} else if(x == this.x && y < this.y) {
			for(i = y + 1; i < this.y; i++) {
				if(board.boardArr[x][i]) {
					countTemp++;
				}
			}
		} else if(y == this.y && x > this.x) {
			for(i = this.x + 1; i < x; i++) {
				if(board.boardArr[i][y]) {
					countTemp++;
				}
			}
		} else if(y == this.y && x < this.x) {
			for(i = x + 1; i < this.x; i++) {
				if(board.boardArr[i][y]) {
					countTemp++;
				}
			}
			
			
		}
		if(countTemp == 0) {
			return true;
		} else if(countTemp == 1 && board.boardArr[x][y] && board.boardArr[x][y].color != this.color) {
			return true;
		}
	}
	return false;
}

function clearKuang() {
	
}
/*
var dianji_el = document.createElement('audio');
dianji_el.setAttribute('src', 'sounds/dianji.wav');
dianji_el.setAttribute('autoplay', "");
var yidong_el = document.createElement('audio');
yidong_el.setAttribute('src', 'sounds/yidong.wav');
yidong_el.setAttribute('autoplay', "");
*/
	
	
$(document).ready(function() {
	
	$.get("ajax/init_board.php?id="+gameid, function(data) {
		var arr = $.parseJSON(data);
	
		for(i=0; i < arr.length; i++) {
			for(j=0; j < arr[i].length; j++) {
			}
			board.boardArr[arr[i][2]][arr[i][3]] = eval("new "+arr[i][1]+"("+arr[i][2]+","+arr[i][3]+",'"+arr[i][0]+"')");
		}
		
	});

	$("#qipan").click(function(e) {
		if(userColor != board.currentColor) {
			return false;
		}
		
		var left = e.pageX;
		var top = e.pageY;
		x = Math.floor((left-boardLeft)/gridWidth);
		if((left-boardLeft)%gridWidth > gridWidth/2) {x = x + 1}

		y = Math.floor((boardTop - top)/gridHeight);
		if((boardTop - top)%gridHeight > gridHeight/2) {
			y = y + 1;
		}
		if(y == -1) y = 0;
		if(x == -1) x = 0;
		//当前点击的位置是否有棋子
		if(board.boardArr[x][y] == 0 || (board.boardArr[x][y].color != undefined && (board.boardArr[x][y].color != board.currentColor))) {
			
			if(board.readyPiece) {
				if(board.readyPiece.isAllowTo(x, y)) {
					socket.emit('servermove', {color: board.currentColor, x:board.readyPiece.x,y:board.readyPiece.y,x1:x,y1:y });
				}
			}
			
		} else if(board.boardArr[x][y].color == board.currentColor){
			//激活棋子
			$('.kuang').remove();
			var tempid = $(".k").attr("id");
			if( tempid != undefined) {
				var tempcls = "qizi " + tempid.substring(0, tempid.length - 2);
				$("#" + tempid).attr("class", tempcls);
				
			}

			$("#"+board.boardArr[x][y].id).addClass(board.boardArr[x][y].color + board.boardArr[x][y].name +"_c");
			$("#"+board.boardArr[x][y].id).addClass("k");
			board.readyPiece = board.boardArr[x][y];
			
			
		}
	})
	
	function test() {
	  	socket.emit('test', {color: 'red', x:8,y:9,x1:8,y1:7 });
	 }

	var socket = io.connect('http://192.168.61.97:8888');
	socket.on('move', function (data) {
		if(data.color == board.currentColor) {
			console.log(board.boardArr[data.x][data.y]);
			board.readyPiece = board.boardArr[data.x][data.y].moveTo(data.x1, data.y1);
			board.turnColor();
		}

		console.log(data);
	});
})
	
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}