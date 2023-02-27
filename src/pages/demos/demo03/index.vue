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
  const a_PointSize = gl.getAttribLocation(program, 'a_PointSize')

  const points = new Float32Array([
    0, -0.5, 10.0,
    -0.5, 0.5, 20.0,
    0.5, 0.5, 30.0,
  ])
  const buffer = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  /**
   * @usage
   * gl.STATIC_DRAW: 写入一次，多次绘制
   * gl.STREAM_DRAW: 写入一次，绘制若干次
   * gl.DYNAMIC_DRAW: 写入多次，绘制多次
   */
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  // 每个数占的字节数
  const BYTES = points.BYTES_PER_ELEMENT

  /**
   * @index 数据
   * @size 每个点取多少个数据
   * @type 数据类型
   * @normalized 是否归一化
   * @stride 每次取数据间隔多少字节 （一个 float = 4 字节）
   * @offset 取数据偏移量
   */
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, BYTES * 3, 0)
  gl.enableVertexAttribArray(a_Position) // 激活
  // gl.disableVertexAttribArray(a_Position) // 禁止

  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, BYTES * 3, BYTES * 2)
  gl.enableVertexAttribArray(a_PointSize)

  gl.drawArrays(gl.POINTS, 0, points.length / 3)
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
