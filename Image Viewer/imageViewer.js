

// Draw image only allows data in certain forms. 
// A normal image is not a that form
// This allows an image to be a HTMLImageElement
const img = new Image();
img.src = './wicked.jpg';

console.log("Yo");

console.log(`Image Resolution  -> [H: ${img.height} | W: ${img.width}]`);

// Getting canvas proportions from the html
const canvas = document.getElementById("canvas");

// Declaring it as a 2d object
const context = canvas.getContext("2d");

console.log(`Canvas Resolution -> [H: ${canvas.height} | W: ${canvas.width}]`);

// Scaling which I couldn't get right and needed to look up
// Apparently this is the scaling norm for canvas and images on html
// I'm not sure why it uses the lesser of height and width, 
// instead of height for height, width for width, but if it works. . .
var hRatio = canvas.height / img.height;
var wRatio = canvas.width / img.width;
var tRatio = Math.min(hRatio, wRatio)

// Just fills the canvas background
context.fillStyle = "#CCECEC";
context.fillRect(0, 0, canvas.width, canvas.height)

// After the image loads then I draw it into the canvas
img.onload = () => {
    console.log("here");
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}
// context.scale(2, 2)

console.log("Ye")

// Getting slider values from the html
var panValue = document.getElementById("pan");
var zoomValue = document.getElementById("zoom");
var rotateValue = document.getElementById("rotate");

// Getting output values from the html
var curPan = document.getElementById("curPan");
var curZoom = document.getElementById("curZoom");
var curRotate = document.getElementById("curRotate");

// Updates the numbers by the sliders
updatePan = () => { curPan.innerHTML = panValue.value; }
updateZoom = () => { curZoom.innerHTML = zoomValue.value; }
updateRotate = () => { curRotate.innerHTML = rotateValue.value; }

// Event listeners, changes slider value when user changes value
panValue.addEventListener('input', updatePan); updatePan();
zoomValue.addEventListener('input', updateZoom); updateZoom();
rotateValue.addEventListener('input', updateRotate); updateRotate();


console.log("Doc")

// Button clicking function
// Just allows me to test methods and transformations
// Before I catually code them in.

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