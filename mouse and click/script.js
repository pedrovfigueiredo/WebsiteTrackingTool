var count = 0;
 
function getClickPosition(e) {
    count++;
    var xPosition = e.clientX;
    var yPosition = e.clientY;
    
    var coor = "Click Coordinates: (" + xPosition + ", " + yPosition + ") Click Amount: " + count;
    
    document.getElementById("click").innerHTML = coor;
}

function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = "Coordinates: (" + x + ", " + y +")";
  document.getElementById("demo").innerHTML = coor;
}

function clearCoor() {
  document.getElementById("demo").innerHTML = "";
}