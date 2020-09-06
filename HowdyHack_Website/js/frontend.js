var count = 0;
 
function getClickPosition(e) {
    count++;
    var xPosition = e.clientX;
    var yPosition = e.clientY;
    
    var coor = "Click Coordinates: (" + xPosition + ", " + yPosition + ") Click Amount: " + count;
    
    document.getElementById("mouse_click").innerHTML = coor;
}

function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = "Coordinates: (" + x + ", " + y +")";
  document.getElementById("mouse_move").innerHTML = coor;
}

function clearCoor() {
  document.getElementById("mouse_move").innerHTML = "";
}