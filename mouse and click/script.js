var container = document.querySelector("#contentContainer");
var count = 0;
container.addEventListener("click", getClickPosition, false);
 
function getClickPosition(e) {
    
    count++;
    var parentPosition = getPosition(e.currentTarget);
    var xPosition = e.clientX;
    var yPosition = e.clientY;
    
    var coor = "Click Coordinates: (" + xPosition + ", " + yPosition + ") Click Amount: " + count;
    
    document.getElementById("click").innerHTML = coor;
}
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
    
  };
}

var container = document.querySelector("#contentContainer");
function showCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coor = "Coordinates: (" + x + ", " + y +")";
  document.getElementById("demo").innerHTML = coor;
}

function clearCoor() {
  document.getElementById("demo").innerHTML = "";
}