var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
var numclients = 0;
app.use(express.static("./../client"));
var id = 0;
/*exemplo objecto client
    var p1 = {
                name:   
                x:..
                y:..}*/
var clients = {};

io.on("connection", function(socket) {

	numclients++;
    var x = Math.floor(Math.random() * 100);
    var y = Math.floor(Math.random() * 100);
    var p = {
            id: id,
            posX: x,
            posY: y

            };

    for(var c in clients){
        socket.emit("enemy", clients[c]["id"], clients[c]["posX"], clients[c]["posY"]);
    }
    clients[socket.id] = p;
    //console.log(clients);
    //console.log("id: " + id);
    //console.log("x: " + x);
    //console.log("y: " + y);
    socket.emit("info", id, x, y);
    socket.broadcast.emit("enemy", id, x, y);
    id++;
    /*socket.emit("")
	socket.on("chat", function(message) {
		var msg = clients[socket.id] + ": " + message;
    	socket.broadcast.emit("message", msg);
    });

    socket.on("name", function(message) {
    	clients[socket.id] = message;
    	socket.emit("ready");
    	console.log(clients);
    });*/

    socket.on("disconnect", function(){
        socket.broadcast.emit("playerexit", clients[socket.id]["id"]);
        delete clients[socket.id];

    });
    socket.on("move", function(id, keys){
        //W + D
        if(keys[87] && keys[68]){
            console.log("CARREGARAM W + D");
            clients[socket.id]["posX"] += 5;
            clients[socket.id]["posY"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        } 
        //W + A
        else if(keys[87] && keys[65]){
            console.log("CARREGARAM W + A");
            clients[socket.id]["posX"] -= 5;
            clients[socket.id]["posY"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }
        //S + D
        else if(keys[83] && keys[68]){
            console.log("CARREGARAM S + D");
            clients[socket.id]["posX"] += 5;
            clients[socket.id]["posY"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }
        //S + A
        else if(keys[83] && keys[65]){
            console.log("CARREGARAM S + A");
            clients[socket.id]["posX"] -= 5;
            clients[socket.id]["posY"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }
        //W
        else if(keys[87]){
            console.log("CARREGARAM W");
            clients[socket.id]["posY"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }
        //D 
        else if(keys[68]){
            console.log("CARREGARAM D");
            clients[socket.id]["posX"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }
        //A 
        else if(keys[65]){
            console.log("CARREGARAM A");
            clients[socket.id]["posX"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        } 
        //S
        else if(keys[83]){
            console.log("CARREGARAM S");
            clients[socket.id]["posY"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }

    });

    /*socket.on("move", function(id, keys){

        if(key === 87){
            console.log("CARREGARAM W");
            clients[socket.id]["posY"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );

        } else if(key === 68){
            console.log("CARREGARAM D");
            clients[socket.id]["posX"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        } else if(key === 65){
            console.log("CARREGARAM A");
            clients[socket.id]["posX"] -= 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        } else if(key === 83){
            console.log("CARREGARAM S");
            clients[socket.id]["posY"] += 5;
            socket.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
            socket.broadcast.emit("updatePos", id, clients[socket.id]["posX"], clients[socket.id]["posY"] );
        }


    });*/
/*
	socket.emit("message", "Welcome to Cyber Chat");*/

});


console.log("Starting Socket App - http://localhost:3000");