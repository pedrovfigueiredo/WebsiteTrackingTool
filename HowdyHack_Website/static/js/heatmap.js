var socket = null;

function updateWindowSize(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;

    var c2 = document.getElementById("myCanvas");
    c2.width = w;
    c2.height = h;
    
    // socket.emit("update window size", JSON.stringify([Math.floor(w / 10), Math.floor(h / 10)]));
}


function rgbFromIntensity(intensity) {
    var ratio = 2 * intensity;
    var b = Math.floor(Math.max(0, 255*(1 - ratio)));
    var r = Math.floor(Math.max(0, 255*(ratio - 1)));
    var g = 255 - b - r;

    return [r, g, b];
}

$(document).ready(function() {
    socket = io();
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    
    // Updating the canvas
    socket.on("send heatmap", function(hms) {
        var hms = JSON.parse(hms);
        var clicks_arr = hms[1];
        var moves_arr = hms[1];

        w = clicks_arr[0].length;
        h = clicks_arr.length;

        var c2 = document.getElementById("myCanvas");

        var ctx2 = c2.getContext("2d");

        var c1 = document.createElement("canvas");
        c1.width = w;
        c1.height = h;
        var ctx1 = c1.getContext("2d");

        var imgData = ctx1.createImageData(w, h);
        for (var i = 0; i < imgData.data.length; i += 4) {
            var x = (i / 4) % w;
            var y = Math.floor(i / (4 * w));
            var intensity = Math.floor(255 * clicks_arr[y][x])
            var rgb = rgbFromIntensity(clicks_arr[y][x])

            imgData.data[i] = rgb[0];
            imgData.data[i + 1] = rgb[1];
            imgData.data[i + 2] = rgb[2];
            imgData.data[i + 3] = intensity != 0 ? 255 : intensity;
        }

        ctx1.putImageData(imgData, 0, 0);
        ctx2.mozImageSmoothingEnabled = false;
        ctx2.webkitImageSmoothingEnabled = false;
        ctx2.msImageSmoothingEnabled = false;
        ctx2.imageSmoothingEnabled = false;
        ctx2.clearRect(0, 0, c2.width, c2.height);
        ctx2.drawImage(c1, 0, 0, c2.width, c2.height);

    });
});

