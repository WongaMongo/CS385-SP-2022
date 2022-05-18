

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

// Might be toxic, but it functions so I can't complain
// In order:
//              Resets context to the size of the entire canvas
//              Clears context, i.e. canvas area, then fills with filler color
//              Sets context to X,Y panned position
//              Scales context to scaled size
//              Rotates context to current value
//              Draws image in current context.

function reDraw(){
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.setTransform(1, 0, 0, 1, XPan * (scaleX > 1 ? scaleX : 1), YPan * (scaleY > 1 ? scaleY : 1));
    context.scale(scaleX, scaleY);
    context.rotate(rotation)
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
}

// Updates the numbers by the sliders
updateXPan = () => { 
    curXPan.innerHTML = panXValue.value;
    console.log(panXValue.value)
    if(panXValue.value === "0")
        XPan = 0
    else
        XPan = 12 * panXValue.value; 
    reDraw();
}
updateYPan = () => { 
    curYPan.innerHTML = panYValue.value; 
    console.log(`Pan Value: ${panYValue.value}`)
    if(panYValue.value === "0")
        YPan = 0
    else
        YPan = -8 * panYValue.value; 
    reDraw();
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
    reDraw();
}
updateRotate = () => { 
    curRotate.innerHTML = rotateValue.value; 
    rotation = rotateValue.value * -(Math.PI / 60)
    
    reDraw();
    // context.drawImage(img, -img.width/2, -img.height/2, img.width, img.height);
    console.log(`Rotate Value is: ${rotateValue.value}`)
    console.log(`Rotation Value is: ${rotation}`)
    // context.rotate(rotateValue.value * (Math.PI / 180))

}

// Event listeners, changes slider value when user changes value
// Moves those values in js to perform transformations
panXValue.addEventListener('input', updateXPan); updateXPan();
panYValue.addEventListener('input', updateYPan); updateYPan();
zoomValue.addEventListener('input', updateZoom); updateZoom();
rotateValue.addEventListener('input', updateRotate); updateRotate();


console.log("Doc")

// Resets the slider values, updates the values to reflect reset
// Then clears the canvas and redraws image at original position
function resetSliders(){
    document.getElementById("panX").value = 0;
    document.getElementById("panY").value = 0;
    document.getElementById("zoom").value = 0;
    document.getElementById("rotate").value = 0;

    updateXPan();
    updateYPan();
    updateZoom();
    updateRotate();

    reDraw();
}