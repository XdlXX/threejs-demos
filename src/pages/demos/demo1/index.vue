<script setup lang="ts">
import vertex from './vert.vt.glsl?raw'
import fragment from './frag.fs.glsl?raw'
import { canvasFullSize } from '~/utils/canvas'
import { createWebGL } from '~/utils/webgl'

const canvasWrapRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLCanvasElement>()

function initWebGL() {
  if (!canvasRef.value || !canvasWrapRef.value)
    return
  canvasFullSize(canvasWrapRef.value, canvasRef.value)
  const { gl } = createWebGL(canvasRef.value, { vertex, fragment })
  gl.drawArrays(gl.POINTS, 0, 1)
}

onMounted(() => {
  initWebGL()
})
</script>

<template>
  <div ref="canvasWrapRef" s-full>
    <canvas ref="canvasRef">您的浏览器不支持 Canvas </canvas>
  </div>
</template>
