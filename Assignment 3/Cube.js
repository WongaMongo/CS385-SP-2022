


function Cube(gl) {

    // var this.program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");
    this.program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    this.positions = [
        // --> Insert your vertex this.positions here
        
        //Front 4
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1, 
        -1,  1,  1,

        //Back 4
        -1, -1,  -1,
         1, -1,  -1,
         1,  1,  -1, 
        -1,  1,  -1,
        
    ];
    
    var indices = [
        // --> Insert your index values here

        //Front-side
        0, 1, 2, 
        0, 3, 2,

        //Right-side
        1, 2, 6, 
        1, 5, 6,
        
        //Top-side
        2, 3, 7,
        2, 6, 7,
        
        //Left-side
        3, 0, 4,
        3, 7, 4,

        //Back-side
        4, 5, 6,
        4, 7, 6,

        //Bottom-side
        5, 4, 0,
        5, 1, 0,

    ];

    var edges = [
        0, 1,  // "Front" face edges
        1, 2,
        2, 3,
        3, 0,
        4, 5,  // "Back" face edges
        5, 6,
        6, 7,
        7, 4,
        0, 4,  // "Side" edges
        1, 5,
        2, 6,
        3, 7
    ];
        
    this.positions.numComponents = 3;

    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );
    
    this.positions.aPosition = gl.getAttribLocation( this.program, "aPosition" );
    gl.enableVertexAttribArray( this.positions.aPosition );

    this.uniforms = {
        t  : gl.getUniformLocation(this.program, "t"),
        MV : gl.getUniformLocation(this.program, "MV"),
        P  : gl.getUniformLocation(this.program, "P")
    };
    // MV = gl.getUniformLocation(this.program, "MV");
    // P = gl.getUniformLocation(this.program, "P");
    this.MV = mat4(); //mat4(), ya boi, is in MV.js apparently
    this.P = mat4();


    this.render = function () {
        gl.useProgram( this.program );

        //doesn't consider this a function?
        // gl.uniform1(this.uniforms.t, t);
        gl.uniformMatrix4fv(this.uniforms.MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(this.uniforms.P, false, flatten(this.P));


        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.aPosition, this.positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        // Render the wireframe version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};