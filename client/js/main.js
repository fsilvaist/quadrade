
var socket = io("http://localhost:3000");

var myName = "";
var ready = false;
var myX;
var myY;
var myID;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;


socket.on("info", function(id, x, y){

    
    myID = id;
    myX = x;
    myY = y;

    createDiv(id, x, y);

});

socket.on("enemy", function(id, x, y){

    createDiv(id, x, y);

});

socket.on("playerexit", function(id){

    deleteDiv(id);

});

socket.on("updatePos", function(id, x, y){

    console.log("UPDATE POS");
    var translateX = (-1 * (myX - x));
    var translateY = (-1 * (myY - y));
    document.getElementById(id).style.webkitTransform = "translate(" + translateX + "px," + translateY + "px)";
    /*document.getElementById(id).style.left = x.toString() + "px";
    document.getElementById(id).style.top = y.toString() + "px";*/

});


/*document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    key = e.keyCode;
    console.log("CARREGUEI TECLA");
    console.log(key);
    socket.emit("move", myID, key);
};*/

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
var keys = [];
function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
    socket.emit("move", myID, keys);
}
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
    socket.emit("move", myID, keys);
}



function createDiv(id, x, y) {
    var iDiv = document.createElement('div');
    console.log("id: " + id);
    console.log("x: " + x);
    console.log("y: " + y);
    iDiv.id = id;
    iDiv.style.position = "absolute";
    iDiv.style.left = x.toString() + "px";
    iDiv.style.top = y.toString() + "px";
    if(id === myID){
        iDiv.style.backgroundColor = "blue";
    }
    else{
        iDiv.style.backgroundColor = "red";
    }
    document.body.appendChild(iDiv);

};

function deleteDiv(id){

    document.getElementById(id).style.display = "none";

};
/*socket.on("disconnect", function() {
	setTitle("Disconnected");
});

socket.on("connect", function() {
	setTitle("Connected to Cyber Chat");
});

socket.on("message", function(message) {
	printMessage(message);
});

socket.on("ready", function(){
    ready = true;
});

document.forms[1].onsubmit = function () {
    if(ready){
        var input = document.getElementById("message");
        printMessage(myName + ": " + input.value);
        socket.emit("chat", input.value);
        input.value = '';
    }
    else{
        printMessage("MESSAGEM NÃO ENVIADA -> INSERIR NOME");
    }
};

document.forms[0].onsubmit = function () {
    var input = document.getElementById("name");
    myName = input.value;
    socket.emit("name", input.value);
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement("p");
    p.innerText = message;
    document.querySelector("div.messages").appendChild(p);
}
*/