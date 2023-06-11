//设置精度
precision lowp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

//向片元着色器传递的值
varying vec2 vUv;

// highp -2^16-2^16
// mediump -2^10-2^10
// lowp -2^8-2^8



void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix*modelMatrix*vec4(position,1.0);
}