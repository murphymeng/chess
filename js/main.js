var initLeft = 28, // 棋盘左上角left值
    initTop = 25; // 棋盘左上角top值

var xianshou = 'r';
var qiziId = 1;
var cw = ch = 46; // 每个棋格的宽度和高度
var myColor = 'red';
var x, y;


$(function() {
    board = new Board({el: $('#board')});
    rc1 = new Qizi({name:'c', color: 'red', x: 0, y: 9});
    rm1 = new Qizi({name:'m', color: 'red', x: 1, y: 9});
    rx1 = new Qizi({name:'x', color: 'red', x: 2, y: 9});
    rs1 = new Qizi({name:'s', color: 'red', x: 3, y: 9});
    rj = new Qizi({name:'j', color: 'red', x: 4, y: 9});
    rs2 = new Qizi({name:'s', color: 'red', x: 5, y: 9});
    rx2 = new Qizi({name:'x', color: 'red', x: 6, y: 9});
    rm2 = new Qizi({name:'m', color: 'red', x: 7, y: 9});
    rc2 = new Qizi({name:'c', color: 'red', x: 8, y: 9});
    rp1 = new Qizi({name:'p', color: 'red', x: 1, y: 7});
    rp2 = new Qizi({name:'p', color: 'red', x: 7, y: 7});
    rb1 = new Qizi({name:'b', color: 'red', x: 0, y: 6});
    rb2 = new Qizi({name:'b', color: 'red', x: 2, y: 6});
    rb3 = new Qizi({name:'b', color: 'red', x: 4, y: 6});
    rb4 = new Qizi({name:'b', color: 'red', x: 6, y: 6});
    rb5 = new Qizi({name:'b', color: 'red', x: 8, y: 6});

    bc1 = new Qizi({name:'c', color: 'black', x: 0, y: 0});
    bm1 = new Qizi({name:'m', color: 'black', x: 1, y: 0});
    bx1 = new Qizi({name:'x', color: 'black', x: 2, y: 0});
    bs1 = new Qizi({name:'s', color: 'black', x: 3, y: 0});
    bj = new Qizi({name:'j', color: 'black', x: 4, y: 0});
    bs2 = new Qizi({name:'s', color: 'black', x: 5, y: 0});
    bx2 = new Qizi({name:'x', color: 'black', x: 6, y: 0});
    bm2 = new Qizi({name:'m', color: 'black', x: 7, y: 0});
    bc2 = new Qizi({name:'c', color: 'black', x: 8, y: 0});
    bp1 = new Qizi({name:'p', color: 'black', x: 1, y: 2});
    bp2 = new Qizi({name:'p', color: 'black', x: 7, y: 2});
    bb1 = new Qizi({name:'b', color: 'black', x: 0, y: 3});
    bb2 = new Qizi({name:'b', color: 'black', x: 2, y: 3});
    bb3 = new Qizi({name:'b', color: 'black', x: 4, y: 3});
    bb4 = new Qizi({name:'b', color: 'black', x: 6, y: 3});
    bb5 = new Qizi({name:'b', color: 'black', x: 8, y: 3});
});

