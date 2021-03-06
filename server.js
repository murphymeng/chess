var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require("url");
 
var port = 8888;
 
var app = http.createServer(function (request, response) {
 
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
    else {
        filePath = '.' + url.parse(request.url).pathname;
    }
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
    }
    
    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(port);
 
console.log('Server running at http://localhost:8888/');

var io = require('socket.io').listen(app);

io.configure(function () {
    io.set('transports', ['xhr-polling']);
    io.set('polling duration', 10);
});


io.sockets.on('connection', function (socket) {
  socket.on('servermove', function (data) {
    io.sockets.in(socket.room).emit('move', {color: data.color, x:data.x,y:data.y,x1:data.x1,y1:data.y1});
  });

  socket.on('challenge', function(data) {
    io.sockets.in(socket.room).emit('challenge', data);
  });

  socket.on('startFight', function(data) {
    io.sockets.in(socket.room).emit('startFight', data);
  });

  socket.on('shangzhen', function(data) {
    //socket.broadcast.emit('shangzhen', data);
    io.sockets.in(socket.room).emit('shangzhen', data);
  });

  socket.on('startRound', function(data) {
    io.sockets.in(socket.room).emit('startRound', data);
  });

  socket.on('move', function(data) {
    io.sockets.in(socket.room).emit('move', data);
  });

  socket.on('eat', function(data) {
    io.sockets.in(socket.room).emit('eat', data);
  });
});