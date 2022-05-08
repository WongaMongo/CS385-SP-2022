

const img = new Image();
img.src = './wicked.png'

window.onload = function(){
    
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0, 0, 0, 0)
    img.onload = () =>{
        context.drawImage("img", 0, 0, 0, 0, 960, 600);
    }
}

var clicks = 0;
function countClicks(){
    clicks+= 1;
    document.getElementById("click").innerHTML = clicks
}