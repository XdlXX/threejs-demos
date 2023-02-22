<script setup lang="ts">
import vertex from './vert.vs.glsl?raw'
import fragment from './frag.fs.glsl?raw'
import { canvasFullSize } from '~/utils/canvas'
import { createWebGL } from '~/utils/webgl'

const canvasWrapRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLCanvasElement>()

function initWebGL() {
  if (!canvasRef.value || !canvasWrapRef.value)
    return
  canvasFullSize(canvasWrapRef.value, canvasRef.value)
  const { gl, program } = createWebGL(canvasRef.value, { vertex, fragment })

  const a_Position = gl.getAttribLocation(program, 'a_Position')
  const a_Color = gl.getAttribLocation(program, 'a_Color')

  const points = new Float32Array([
    0.0, 0.5, 1, 0, 1, 1.0,
    -0.5, -0.5, 1, 1, 1, 1.0,
    0.5, -0.5, 1, 1, 0, 1.0,
  ])
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

  const BYTES = points.BYTES_PER_ELEMENT

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, BYTES * 6, 0)
  gl.enableVertexAttribArray(a_Position) // 激活

  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, BYTES * 6, BYTES * 2)
  gl.enableVertexAttribArray(a_Color) // 激活

  gl.drawArrays(gl.TRIANGLE_FAN, 0, 3)
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
