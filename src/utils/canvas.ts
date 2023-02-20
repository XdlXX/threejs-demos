export function canvasFullSize(wrap: HTMLElement, canvas: HTMLCanvasElement) {
  canvas.width = wrap.offsetWidth
  canvas.height = wrap.offsetHeight
}
