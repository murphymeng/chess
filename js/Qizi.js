var Qizi = Backbone.View.extend({

  tagName: "div",

  className: "qizi",

  events: {
    "click": "onClick"
  },

  initialize: function(opt) {
    var me = this;
    me.color = opt.color;
    me.name = opt.name;
    if (myColor === 'red') {
        me.x = opt.x;
        me.y = opt.y;
    } else {
        me.x = 8 - opt.x;
        me.y = 9 - opt.y;
    }
    me.id = qiziId++;

    me.img = new Image();
    me.img.src = 'images/' + me.color + '_' + me.name + '.png';
    

    me.el.id = 'div-' + me.id;
    $('#board').append(me.el);
    me.$el.append(me.img);

    me.$el.css({
        left: me.x * cw - cw / 2 + initLeft,
        top:  me.y * ch - cw / 2 + initTop
    });

    board.arr[me.x][me.y] = me;
    board.qiziObj[me.id] = me;
  },

  setXY: function(x, y) {
    this.x = x;
    this.y = y;
  },

  onClick: function() {

    if (myColor !== currentColor) {
      return;
    }

    if (!board.selected) {
        if (myColor !== this.color) {
          return;
        }
        board.selected = this;
        this.$el.addClass('selected');
    } else if (board.selected !== this && board.selected.color !== this.color) {
         socket.emit('eat', {
            fromId: board.selected.id,
            toId: this.id,
            rid: rid
        });
        board.selected.eat(this);
    } else if (board.selected === this || board.selected.color === this.color) {
        board.selected.deSelect();
    }
  },

  deSelect: function() {
    this.$el.removeClass('selected');
    board.selected = null;
  },

  moveTo: function(x, y, fn) {
    var me = this,
      left = x * cw + initLeft - cw / 2,
      top  = y * ch + initTop - ch / 2;

    me.deSelect();

    if (me.allowMoveTo(x, y)) {
      me.$el.animate({"left": left, "top": top}, "fast", fn);
      board.arr[me.x][me.y] = null;
      board.arr[x][y] = me;
      me.setXY(x, y);
    }
  },

  eat: function(qizi) {
    var me = this;
    if (qizi.color === me.color) {
      return;
    }

    me.moveTo(qizi.x, qizi.y, function() {
      qizi.$el.remove();
    });
  },

  allowMoveTo: function(x, y) {
    var me = this,
      i,j;
    switch (me.name) {
      case 'c':
        if (me.x === x || me.y === y) {
          if (me.x > x) {
            for(i = x + 1; i < me.x; i++) {
              if(board.arr[i][y]) {
                return false
              }
            }
          } else if (me.x < x) {
            for(i = this.x + 1; i < x; i++) {
              if(board.arr[i][y]) {
                return false
              }
            }
          } else if (me.y > y) {
            for(i = y + 1; i < me.y; i++) {
              if(board.arr[x][i]) {
                return false
              }
            }
          } else if (me.y < y) {
            for(i = y + 1; i < this.y; i++) {
              if(board.boardArr[x][i]) {
                return false
              }
            }
          }
          return true;
        } else {
          return false;
        }
        break;
      case 'm':
        if(Math.abs(y - this.y) == 1) {
          if( x - this.x == 2 && !board.arr[this.x+1][this.y]) {
            return true;
          } else if(this.x - x == 2 && !board.arr[this.x - 1][this.y]) {
            return true;
          } 
        } else if(Math.abs(y - this.y) == 2) {
          if( y - this.y == 2 && !board.arr[this.x][this.y+1]) {
            return true;
          } else if(this.y - y == 2 && !board.arr[this.x][this.y-1]) {
            return true;
          }
        }
        return false;
        break;
      case 'x':
        if (this.color === myColor &&
          y >=5 && y <= 9 &&
          Math.abs(x - this.x) == 2 &&
          Math.abs(y - this.y) == 2 && 
          !board.arr[(x + this.x) / 2][(y + this.y) / 2]) {

          return true;
        } else if (this.color !== myColor &&
          y >= 0 && y <= 4 &&
          Math.abs(x - this.x) == 2 &&
          Math.abs(y - this.y) == 2 && 
          !board.arr[(x + this.x) / 2][(y + this.y) / 2]) {
          return true;
        } else {
          return false;
        }
        break;
      case 's':
        if (this.color === myColor &&
          x >= 3 && x <= 5 &&
          y >= 7 && y <= 9 &&
          Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 1) {

          return true;
        } else if (this.color !== myColor &&
          x >= 3 && x <= 5 &&
          y >= 0 && y <= 2 &&
          Math.abs(x - this.x) == 1 && Math.abs(y - this.y) == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case 'j':
        if(this.color === myColor &&
          x >= 3 && x <= 5 &&
          y >= 7 && y <= 9 &&
          ((Math.abs(x - this.x) == 1 && y == this.y) || (Math.abs(y - this.y) == 1 && x == this.x))) {
          return true;
        } else if (this.color !== myColor &&
          x >= 3 && x <= 5 &&
          y >= 0 && y <= 2 &&
          ((Math.abs(x - this.x) == 1 && y == this.y) || (Math.abs(y - this.y) == 1 && x == this.x))) {
          return true;
        } else {
          return false;
        }
        break;
      case 'p':
        var countTemp = 0;
        if(x == this.x && y > this.y) {
          for(i = this.y + 1; i < y; i++) {
            if(board.arr[x][i]) {
              countTemp++;
            }
          }
        } else if(x == this.x && y < this.y) {
          for(i = y + 1; i < this.y; i++) {
            if(board.arr[x][i]) {
              countTemp++;
            }
          }
        } else if(y == this.y && x > this.x) {
          for(i = this.x + 1; i < x; i++) {
            if(board.arr[i][y]) {
              countTemp++;
            }
          }
        } else if(y == this.y && x < this.x) {
          for(i = x + 1; i < this.x; i++) {
            if(board.arr[i][y]) {
              countTemp++;
            }
          }
        }
        if(countTemp == 0) {
          return true;
        } else if(countTemp == 1 && board.arr[x][y]) {
          return true;
        }
        return false;
        break;
      case 'b':
        if ( (Math.abs(this.y - y) + Math.abs(this.x - x)) !== 1 ) {
          return false;
        } else {
          if (x === this.x && y === this.y - 1 && this.color === myColor) {
            return true;
          } else if (x === this.x && y === this.y + 1 && this.color !== myColor) {
            return true;
          } else if (y === this.y && Math.abs(x - this.x) === 1 && y <= 4 && this.color === myColor) {
            return true;
          } else if (y === this.y && Math.abs(x - this.x) === 1 && y >= 5 && this.color !== myColor) {
            return true;
          }
          return false;
        }
        break;
    }
  },

});