
"use strict";

var gl;

var Sun;
var Earth;
var Moon;

var ms;

var near;
var far;

var year;
var day;
var axis;

// Worksheet stuff? Not sure if I need them all, but what's a few bytes between friends?
var aspect
var near
var far
var fovy
var distance

/*

    sun radius = 10
    earth radius = 5
        earth orbit = 20
    moon radius = 2
        moon orbit = 10
    
    
    diameter (D) = 64
    

*/

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    Sun = new Sphere();
    Earth = new Sphere();
    Moon = new Sphere();

    year = 365
    day = 1 

    aspect = 1
    near = 6
    far = 70
    fovy = 114.726205

    distance = 64

    axis = [0.0, 0.0, 1.0]

    Sun.radius = 10
    Earth.radius = 5
    Moon.radius = 2

    Earth.orbit = 20
    Moon.orbit = 10

    year = 365
    day = 1



    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    ms = new MatrixStack();
    var V = translate(0.0, 0.0, -0.5 * (near + far))
    ms.load(V)

    ms.push();
    ms.scale(Sun.radius);
    Sun.MV = ms.current();
    Sun.render();
    ms.pop();

    ms.push();
    ms.rotate(year, axis);
    ms.translate(distance, 0, 0);
    ms.push();
    // Possibly include this above push?
    // Hard to tell since he specifies 
    // The earth orbits the sun, the moon orbits the sun
    // Did he mean the earht orbits the sun, the moon orbits the earth?
    ms.rotate(day, axis);
    ms.scale(Earth.radius);
    Earth.MV = ms.current();
    Earth.render();
    ms.pop;
    ms.translate(Moon.distance, 0, 0);
    ms.scale(Moon.radius);
    Moon.MV = ms.current();
    Moon.render();
    ms.pop;

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    Sun.render()

    requestAnimationFrame(render);
}

window.onload = init;