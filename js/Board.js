var Board = Backbone.View.extend({

  el: $('#board'),

  events: {
    "click": "onClick"
  },

  initialize: function() {
    var me = this;
    me.arr = [];
    for (var i = 0; i < 9; i++) {
      me.arr[i] = []
      for (var j = 0; j < 8; j++) {
        me.arr[i][j] = null;
      }
    }
  },

  onClick: function(e) {
    var me = this;
    if (!me.selected) {
      return;
    }

    // 无视棋盘外的点击
    if (e.clientX < initLeft - cw/2 ||
        e.clientX > initLeft + 8*cw  + cw/2 ||
        e.clientY < initTop - cw/2 ||
        e.clientT > initTop + 9*ch + cw/2) {
        return;
    }

    var x = Math.round((e.clientX - initLeft) / cw),
        y = Math.round((e.clientY - initTop) / ch),
        left = x * cw + initLeft - cw / 2,
        top  = y * ch + initTop - ch / 2;

    if (board.arr[x][y]) {
      return;
    }

    if (x === board.selected.x && y === board.selected.y) {
      return;
    }

    me.selected.moveTo(left, top);
  }

});