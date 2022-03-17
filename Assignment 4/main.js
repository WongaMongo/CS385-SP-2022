
"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    Sun = new Sphere();
    Earth = new Sphere();
    Moon = new Sphere();

    Sun.radius = 10
    Earth.radius = 5
    Moon.radius = 2

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
    sun.render()

    requestAnimationFrame(render);
}

window.onload = init;