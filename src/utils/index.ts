export type ColorListType = [number, number, number, number ]

export function getRandomColor(): ColorListType {
  return [Math.random(), Math.random(), Math.random(), 1.0]
}

export function getTranslateMatrix(x = 0, y = 0, z = 0) {
  return new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, z, 1,
  ])
}

export function getScaleMatrix(x = 1, y = 1, z = 1) {
  return new Float32Array([
    x, 0.0, 0.0, 0.0,
    0.0, y, 0.0, 0.0,
    0.0, 0.0, z, 0.0,
    0, 0, 0, 1,
  ])
}
// 绕 z 轴旋转
export function getRotateMatrix(deg = 0) {
  return new Float32Array([
    Math.cos(deg), Math.sin(deg), 0.0, 0.0,
    -Math.sin(deg), Math.cos(deg), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0, 0, 0, 1,
  ])
}

export function maxMatrix(a: Float32Array, b: Float32Array) {
  const rs = new Float32Array(16)
  for (let i = 0; i < 4; i++) {
    rs[i] = a[i] * b[0] + a[i + 4] * b[1] + a[i + 8] * b[2] + a[i + 12] * b[3]
    rs[i + 4] = a[i] * b[4] + a[i + 4] * b[5] + a[i + 8] * b[6] + a[i + 12] * b[7]
    rs[i + 8] = a[i] * b[8] + a[i + 4] * b[9] + a[i + 8] * b[10] + a[i + 12] * b[11]
    rs[i + 12] = a[i] * b[12] + a[i + 4] * b[13] + a[i + 8] * b[14] + a[i + 12] * b[15]
  }
  return rs
}
