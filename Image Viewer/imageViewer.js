

const img = new Image();
img.src = './wicked.jpg';

console.log("Yo")

    
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
// context.fillStyle = "#000000";
// context.fillRect(0, 0, 0, 0)
img.onload = () =>{
    console.log("here")
    context.drawImage(img, 0, 0, 960, 600, 0, 0, 960, 600);
}


console.log("Ye")

var clicks = 0;
function countClicks(){
    clicks+= 1;
    document.getElementById("click").innerHTML = clicks
}