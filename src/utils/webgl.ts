export function createWebGL(
  canvas: HTMLCanvasElement,
  shader: {
    vertex: string
    fragment: string
  },
) {
  const gl = canvas.getContext('webgl2')!
  const program = gl.createProgram()!
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
  gl.shaderSource(vertexShader, shader.vertex)
  gl.shaderSource(fragmentShader, shader.fragment)
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)

  gl.linkProgram(program)
  gl.useProgram(program)

  return {
    gl,
    program,
  }
}
