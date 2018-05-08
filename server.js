var express = require('express');
var session = require('express-session');
var sharedsession = require("express-socket.io-session");
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var JSON = require('circular-json');
var app = express();
var cors = require('cors');
var clone = require('clone');

var request = require('request');

mongoose.connect('mongodb://127.0.0.1/chessserver');
mongoose.Promise = global.Promise;

app.use(session({secret: 'parsonss'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb', parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '5mb', parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, './angularApp/dist')));
app.use(cors());

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, "0.0.0.0", function() {
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

socketIds = [];

io.sockets.on('connection', function (socket) {

	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	// socketIds.push(socket.id)
	socket.emit("playerConnected", socket.id);
	// console.log(socketIds);
	
	//SOCKET EMITS AND LISTENS

	socket.on('disconnect', function(){
		// socketIds.splice(socketIds.indexOf(socket.id)+1, 1);
		console.log("Client "+socket.id+" disconnected.")
		// console.log(socketIds);
	})

    socket.on('sendMove', function (data, cb) {
    	// console.log("Data from socket on: ", data);
    	cb("Receieved data on server end!");
    	socket.broadcast.emit('receiveMove', data);
    });
});