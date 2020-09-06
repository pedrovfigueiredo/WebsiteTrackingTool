var socket = null;
var mouse_clicks = [];
var mouse_moves = [];
var latest_mouse_location = null;
 
function getClickPosition(e) {
  var xPosition = e.clientX;
  var yPosition = e.clientY;
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;

  mouse_clicks.push([xPosition / w, yPosition / h]);
    
  var coor = "Click Coordinates: (" + xPosition + ", " + yPosition + ")";
    
  // document.getElementById("mouse_click").innerHTML = coor;
}

function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;

  var l = [x / w, y / h];

  latest_mouse_location = l;
  mouse_moves.push(l);
  var coor = "Coordinates: (" + x + ", " + y +")";
  // document.getElementById("mouse_move").innerHTML = coor;
}

function clearCoor() {
  // document.getElementById("mouse_move").innerHTML = "";
}

$(document).ready(function() {

  $("html").click(function(e) {getClickPosition(e);});
  $("html").mousemove(function(e) {showCoords(e);});
  $("html").mouseout(function(e) {clearCoor();});

  socket = io();

  setInterval(function() {
    console.log("Emit update heatmap");
    if (latest_mouse_location != null && !mouse_moves.includes(latest_mouse_location)){
      mouse_moves.push(latest_mouse_location);
    }
    socket.emit("update heatmap", JSON.stringify(mouse_clicks), JSON.stringify(mouse_moves));
    
    mouse_clicks.length = 0;
    mouse_moves.length = 0;
}, 1000);

});