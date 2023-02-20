<script setup lang="ts">
import vertex from './vert.vt.glsl?raw'
import fragment from './frag.fs.glsl?raw'
import { canvasFullSize } from '~/utils/canvas'
import { createWebGL } from '~/utils/webgl'
import type { ColorListType } from '~/utils'
import { getRandomColor } from '~/utils'

const canvasWrapRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLCanvasElement>()

function initWebGL() {
  if (!canvasRef.value || !canvasWrapRef.value)
    return
  canvasFullSize(canvasWrapRef.value, canvasRef.value)
  const { gl, program } = createWebGL(canvasRef.value, { vertex, fragment })

  const points: ({ x: number; y: number; color: ColorListType })[] = []
  const a_Position = gl.getAttribLocation(program, 'a_Position')
  const u_Color = gl.getUniformLocation(program, 'u_Color')

  canvasRef.value.addEventListener('mousemove', (e) => {
    const x = (e.x / canvasRef.value!.width) * 2 - 1
    const y = (e.y / canvasRef.value!.height) * -2 + 1
    const color = getRandomColor()
    points.push({ x, y, color })
    points.forEach((i) => {
      gl.uniform2f(u_Color, i.x, i.y)
      gl.vertexAttrib2f(a_Position, i.x, i.y)
      gl.drawArrays(gl.POINTS, 0, 1)
    })
  })
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
