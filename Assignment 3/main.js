
// precision highp float;

// out vec4 fColor;

// void main()
// {
//     fColor = vec4(1.0, 0.5, 0.5, 1.0);
// }

let angle = 0;
var canvas;
var P;

function init(){
    canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    
    gl.clearColor(0.05, 0.9, 0.7, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST)

    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.BACK_FACE);

    cube = new Cube(gl, 33);

    render();
    requestAnimationFrame(render);
}


// function resize(){
//     var width = canvas.clientWidth,
//         height = canvas.clientHeight;

//     gl.viewport(0, 0, width, height)
//     let aspect = width/height;
//     let fovy = 75 * Math.PI/180
//     P = perspective(fovy, aspect, near, far)
// }
// window.onresize = resize;

function render(){
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    
    angle += 0.13;
    cube.MV = rotate(angle, [1, 1, 1]); //rotation dark magic axis (1, 1, 1)
    
    cube.render();

    requestAnimationFrame(render)
}

window.onload = init;