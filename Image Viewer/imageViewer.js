

const img = new Image();
img.src = './wicked.jpg';

console.log("Yo");

console.log(`Image Resolution  -> [H: ${img.height} | W: ${img.width}]`);

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

console.log(`Canvas Resolution -> [H: ${canvas.height} | W: ${canvas.width}]`);

var hRatio = canvas.height / img.height;
var wRatio = canvas.width / img.width;
var tRatio = Math.min(hRatio, wRatio)

context.fillStyle = "#CAEAE9";
context.fillRect(0, 0, canvas.width, canvas.height)
img.onload = () =>{
    console.log("here");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}
// context.scale(2, 2)

console.log("Ye")

var clicks = 0;
function countClicks(){
    clicks+= 1;
    // img.width += 100
    // canvas.width += 100
    let a = 0
    let b = 0
    if(clicks % 2 === 0){ a = b = 0.5 }
    else{ a = b = 2 }
    context.scale(a, b)
    img.src = './wicked.jpg'
    document.getElementById("click").innerHTML = clicks;
}