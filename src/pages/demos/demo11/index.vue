<script setup lang="ts">
import vertex from './vert.vs.glsl?raw'
import fragment from './frag.fs.glsl?raw'
import { createWebGL } from '~/utils/webgl'
import LESSON_IMG from '~/assets/lesson.png'
import NO_ORDER_IMG from '~/assets/no-order.png'

const canvasWrapRef = shallowRef<HTMLDivElement>()
const canvasRef = shallowRef<HTMLCanvasElement>()

function initWebGL() {
  if (!canvasRef.value || !canvasWrapRef.value)
    return
  // canvasFullSize(canvasWrapRef.value, canvasRef.value)
  const { gl, program } = createWebGL(canvasRef.value, { vertex, fragment })

  const a_Position = gl.getAttribLocation(program, 'a_Position')
  const a_Tex = gl.getAttribLocation(program, 'a_Tex')
  const u_Sampler = gl.getUniformLocation(program, 'u_Sampler')
  const u_Sampler1 = gl.getUniformLocation(program, 'u_Sampler1')

  const points = new Float32Array([
    -0.5, -0.5, 0.0, 0.0,
    0.5, -0.5, 1.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    -0.5, 0.5, 0.0, 1.0,
  ])
  const buffer = gl.createBuffer()!
  const BYTES = points.BYTES_PER_ELEMENT
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, BYTES * 4, 0)
  gl.vertexAttribPointer(a_Tex, 2, gl.FLOAT, false, BYTES * 4, BYTES * 2)
  gl.enableVertexAttribArray(a_Position) // 激活
  gl.enableVertexAttribArray(a_Tex) // 激活

  Promise.all([
    getImage(NO_ORDER_IMG, gl, u_Sampler1, 1),
    getImage(LESSON_IMG, gl, u_Sampler, 0),
  ]).then(() => {
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
  })
}

function getImage(src: string, gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, index: number) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
    // 创建纹理对象
      const texture = gl.createTexture()!
      // 删除纹理对象
      // gl.deleteTexture(texture)

      // 反转图片Y轴。因为图片坐标和纹理坐标 Y 轴指向相反
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

      // 开启一个纹理单元
      gl.activeTexture(gl.TEXTURE0 + index)

      /**
     * 绑定纹理对象
     * @target gl.TEXTURE_2D： 2维纹理  gl.TEXTURE_CUBE_MAP：立方体纹理
     */
      gl.bindTexture(gl.TEXTURE_2D, texture)

      /**
     * 处理放大缩小
     * @target 同gl.bindTexture target
     * @pname gl.TEXTURE_MAG_FILTER: 放大 gl.TEXTURE_MIN_FILTER: 缩小 gl.TEXTURE_WRAP_S: 水平填充 gl.TEXTURE_WRAP_T: 垂直填充
     * @param 放大 或 缩小时（gl.NEAREST 使用像素颜色值，gl.LINEAR 使用四周加权平均值）；
     *        水平填充 或 垂直填充时（gl.REPEAT 平铺重复，gl.MIRRORED_REPEAT 镜像对称，gl.CLAMP_TO_EDGE 边缘延伸）
     */
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      // 纵横
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      /**
     * @target 同gl.bindTexture target
     * @level
     */
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      gl.uniform1i(location, index)
      resolve()
      // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
    }
  })
}

onMounted(() => {
  initWebGL()
})
</script>

<template>
  <div ref="canvasWrapRef" s-full>
    <canvas ref="canvasRef" width="500" height="500" bg-trueGray>您的浏览器不支持 Canvas </canvas>
  </div>
</template>
