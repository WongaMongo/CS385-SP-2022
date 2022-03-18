
"use strict";

var gl;

var Sun = undefined;
var Earth = undefined;
var Moon = undefined;
var t = 0.0;

var ms;

var near;
var far;

const HoursPerDay = 24;
const HoursPerYear = 365.25 * HoursPerDay;

var year;
var day;
var axis;

// Worksheet stuff? Not sure if I need them all, 
// but what's a few bytes between friends?
var aspect
var near
var far
var fovy
var distance = 64

var D

/*

    sun radius = 10
    earth radius = 5
        earth orbit = 20
    moon radius = 2
        moon orbit = 10
    
    
    diameter (D) = 64
    Is diameter and distance the same?
    d might represent delta? 

    The lectures are confusing over zoom
    Does MatrixStack.js consist of the transformations?
    i.e. we use them and play with the stack to manage them
    or do we use it WITH transformations? 

    There's years then there's hours per year
    Is year a collection of days, or hours? 
    Or are both items valid and separate?

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

    
    
    Sun.radius = 30
    // Sun.radius = 696340
    Earth.radius = 10
    Moon.radius = 2
    
    Earth.orbit = 180
    Moon.orbit = 10

    Earth.distance = Earth.orbit
    Moon.distance = Moon.orbit
    
    
    requestAnimationFrame(render);
}

function render() {
    
    // Update your motion variables here
    D = 2 * (Earth.orbit + Moon.orbit + Moon.radius)    
    fovy = 71.6957758
    aspect = 1
    near = 150
    // near = 350
    far = D + near
    axis = [0.0, 1.0, 1.0]
    year = t / 4
    day = t / HoursPerYear * 360

    // theta = delta times time?
    // or maybe we're incrementing t by hours?
    // t += distance * t

    t += 1

    ms = new MatrixStack();
    var V = translate(0.0, 0.0, -0.5 * (near + far))
    var P = perspective(fovy, aspect, near, far)
    ms.load(V)
    
    // V's in
    ms.push();
    ms.scale(Sun.radius);
    // Sun reads the stack
    Sun.P = P
    Sun.color = vec4(0.9, 0.9, 0.1, 1.0)
    Sun.MV = ms.current();
    // Sun render's
    Sun.render();
    // Sun's out
    ms.pop();
    
    // Pushing in for earth
    ms.push();
    // Earth yearly rotation around sun
    ms.rotate(year, axis);

    // Changing Earth coord system
    ms.translate(Earth.distance, 0, 0);
    // Pushing to seperate the earth data
    // This is so that the earth data we don't need for the moon
    // just gets the boot
    ms.push();
    ms.rotate(day, axis);
    // Possibly include rotate above this push?
    // Hard to tell since he specifies 
    // The earth orbits the sun, the moon orbits the sun
    // Did he mean the earth orbits the sun, the moon orbits the earth?

    // Earth's daily revolution
    // Scaling earth coords
    ms.scale(Earth.radius);
    // Earth gets it's relative perspective
    Earth.P = P
    Earth.color = vec4(0.222, 0.933, 0.655, 1.0)
    // Read stack to assign new Earth mv value
    // Earth reads from the stack
    Earth.MV = ms.current();

    // Start earth
    Earth.render();

    // Earth's partially out
    // only the Earth data we need is in
    ms.pop;
    
    // Changing moon coord system
    ms.translate(Moon.distance/5, 0, 0);
    // Scaling moon coords
    ms.scale(Moon.radius/4);
    // Moon get's its relative perspective
    Moon.P = P
    Moon.color = vec4(0.9, 0.9, 0.9, 1.0)
    // Moon reads from the stack
    Moon.MV = ms.current();
    // Moon's rendered
    Moon.render();

    // Moon and leftover earth data out
    ms.pop;

    // Stack is clean and serene

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    Sun.render()
    Earth.render()
    Moon.render()

    requestAnimationFrame(render);
}

window.onload = init;