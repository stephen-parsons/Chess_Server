var express = require('express');
var session = require('express-session');
var sharedsession = require("express-socket.io-session");
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var JSON = require('circular-json')
var app = express();
var cors = require('cors')

var request = require('request');

mongoose.connect('mongodb://127.0.0.1/chessserver');
mongoose.Promise = global.Promise;

app.use(session({secret: 'parsonss'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb', parameterLimit: 1000000 }));
app.use(bodyParser.json({ limit: '5mb', parameterLimit: 1000000 }));
app.use(express.static(path.join(__dirname, './angularApp/dist')));
app.use(cors({origin: 'http://192.168.1.13:8000'}));

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, "0.0.0.0", function() {
	console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

socketIds = [];

io.sockets.on('connection', function (socket) {
	// if (socketIds.length >= 2){
	// 	socket.disconnect();
	// }

	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);

	socketIds.push(socket.id)
	socket.emit("playerConnected", socket.id);

	//ASSIGN CLIENT A COLOR
	// if (socketIds.length == 0){
	// 	socketIds.push({"socketId": socket.id, "color": "white"});
	// 	socket.emit("playerConnected", "white");
	// }
	// else if (socketIds.length == 1){
	// 	// console.log(socketIds[0]);
	// 	if (socketIds[0].color == "white"){
	// 		socketIds.push({"socketId": socket.id, "color": "black"});
	// 		socket.emit("playerConnected", "black");
	// 	}
	// 	else if (socketIds[0].color == "black"){
	// 		socketIds.push({"socketId": socket.id, "color": "white"});
	// 		socket.emit("playerConnected", "white");
	// 	}
	// }
	console.log(socketIds);
	
	//SOCKET EMITS AND LISTENS

	socket.on('disconnect', function(){
		// console.log(socketIds.indexOf(socket.id))
		socketIds.splice(socketIds.indexOf(socket.id)+1, 1);
		console.log("Client "+socket.id+" disconnected.")

	})

    socket.on('sendMove', function (data, cb) {
    	// console.log("Data from socket on: ", data);
    	cb("Receieved data on server end!");
    	io.sockets.emit('recieveMove', data);
    });
});