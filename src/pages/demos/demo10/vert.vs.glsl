precision mediump float;

attribute vec2 a_Position;
attribute vec4 a_Tex;

varying vec2 v_Tex;

void main(){
  gl_Position=vec4(a_Position,.0,1.);
  v_Tex=vec2(a_Tex.x,a_Tex.y);
}
