<script setup lang="ts">
import vertex from './vert.vs.glsl?raw'
import fragment from './frag.fs.glsl?raw'
import { canvasFullSize } from '~/utils/canvas'
import { createWebGL } from '~/utils/webgl'
import { getTranslateMatrix } from '~/utils'

const canvasWrapRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLCanvasElement>()

function initWebGL() {
  if (!canvasRef.value || !canvasWrapRef.value)
    return
  canvasFullSize(canvasWrapRef.value, canvasRef.value)
  const { gl, program } = createWebGL(canvasRef.value, { vertex, fragment })

  const a_Position = gl.getAttribLocation(program, 'a_Position')
  const a_mat = gl.getUniformLocation(program, 'a_mat')

  const points = new Float32Array([
    -0.5, -0.5,
    0.5, 0.5,
    -0.5, 0.5,
  ])
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_Position) // 激活

  let x = -1
  const animate = () => {
    x += 0.005
    if (x > 1)
      x = -1
    const matrix = getTranslateMatrix(x, x)
    gl.uniformMatrix4fv(a_mat, false, matrix)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3)
    requestAnimationFrame(animate)
  }
  animate()
}

onMounted(() => {
  initWebGL()
})
</script>

<template>
  <div ref="canvasWrapRef" s-full>
    <canvas ref="canvasRef" bg-trueGray>您的浏览器不支持 Canvas </canvas>
  </div>
</template>
