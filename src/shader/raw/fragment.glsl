
precision lowp float;
//接受传递过来的值
varying vec2 vUv;

void main()
{
    gl_FragColor=vec4(vUv,0.0,1.0);
}