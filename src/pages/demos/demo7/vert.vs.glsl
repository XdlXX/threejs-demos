precision mediump float;

attribute vec2 a_Position;
uniform mat4 a_mat;

void main(){
  gl_Position= a_mat * vec4(a_Position,.0,1.);
}
