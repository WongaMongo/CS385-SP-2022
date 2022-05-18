

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
var scaleX = 1
var scaleY = 1

var XPan = 0
var YPan = 0

var rotation = 0

// Just fills the canvas background
context.fillStyle = "#CCECEC";
context.fillRect(0, 0, canvas.width, canvas.height)

// After the image loads then I draw it onto the canvas
img.onload = () => {
    console.log("here");
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(img, XPan, YPan, img.width, img.height, 0, 0, canvas.width, canvas.height);
}
// context.scale(2, 2)

// function reDrawImage(a, b, c, d, e, f, g, h){
//     context.drawImage(img, a, b, c, d, e, f, g, h)
// }



console.log("Ye")

// Getting slider values from the html
var panXValue = document.getElementById("panX");
var panYValue = document.getElementById("panY");
var zoomValue = document.getElementById("zoom");
var rotateValue = document.getElementById("rotate");

// Getting output values from the html
var curXPan = document.getElementById("curXPan");
var curYPan = document.getElementById("curYPan");
var curZoom = document.getElementById("curZoom");
var curRotate = document.getElementById("curRotate");

function reRender(){
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.scale(scaleX, scaleY);
    context.rotate(rotation)
    context.drawImage(img, XPan, YPan, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

// Updates the numbers by the sliders
updateXPan = () => { 
    curXPan.innerHTML = panXValue.value;
    console.log(panXValue.value)
    if(panXValue.value === "0")
        XPan = 0
    else
        XPan = -20 * panXValue.value; 
    reRender();
}
updateYPan = () => { 
    curYPan.innerHTML = panYValue.value; 
    console.log(`Pan Value: ${panYValue.value}`)
    if(panYValue.value === "0")
        YPan = 0
    else
        YPan = 10 * panYValue.value; 
    reRender();
}
updateZoom = () => { 
    curZoom.innerHTML = zoomValue.value; 
    if(zoomValue.value < 0){
        let temp = zoomValue.value;
        temp *= -1;
        temp = 1 - (temp / 10)
        if(temp)
            scaleX = scaleY = temp.toFixed(1);
        else
            scaleX = scaleY = 0.05
    }
    else if(zoomValue.value === "0")
        scaleX = scaleY = 1;
    else
        scaleX = scaleY = zoomValue.value; 
    console.log(`scales -> ${scaleX, scaleY}`)
    reRender();
}
updateRotate = () => { 
    curRotate.innerHTML = rotateValue.value; 
    rotation = rotateValue.value * -(Math.PI / 60)
    
    reRender();

    console.log(`Rotate Value is: ${rotateValue.value}`)
    console.log(`Rotation Value is: ${rotateValue.value * (Math.PI / 180)}`)
    // context.rotate(rotateValue.value * (Math.PI / 180))

}

// Event listeners, changes slider value when user changes value
// Moves those values in js to perform transformations
panXValue.addEventListener('input', updateXPan); updateXPan();
panYValue.addEventListener('input', updateYPan); updateYPan();
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