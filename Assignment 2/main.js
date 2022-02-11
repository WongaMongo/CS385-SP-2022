


function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    gl.clearColor(0.3, 0.3, 0.3, 1.0);
    cone = new Cone(gl, 33);
    render();
}

function render(){
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    cone.render();
}

window.onload = init;
