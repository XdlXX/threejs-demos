precision mediump float;

uniform sampler2D u_Sampler;
uniform sampler2D u_Sampler1;

varying vec2 v_Tex;

void main(){
  vec4 c1=texture2D(u_Sampler,v_Tex);
  vec4 c2=texture2D(u_Sampler1,v_Tex);

  gl_FragColor=c1*c2;
}
