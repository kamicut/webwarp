/*
 * main.js
 *
 */

/* global twgl:false, document:false */
(function () {

'use strict';

var gl = twgl.getWebGLContext(document.getElementById("c"));
var programInfo = twgl.createProgramInfo(gl, ['vs', 'fs']);

var arrays = {
  a_position: {
    numComponents: 2,
    data: [ 1, 1, -1, 1,
            1, -1, -1, -1]
  },
  a_texCoord: {
    numComponents: 2,
    data: [ 1, 1, 0, 1,
            1, 0, 0, 0 ]
    }
};

var textures = twgl.createTextures(gl, {
  world: {
    src: "./world1024.jpg",
    min: gl.LINEAR, mag: gl.LINEAR,
  }
});

var uniforms = {
  u_image: textures.world
};

var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

function render(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(programInfo.program);

  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, gl.TRIANGLE_STRIP, bufferInfo);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);

})();
