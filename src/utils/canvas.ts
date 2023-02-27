export function canvasFullSize(wrap: HTMLElement, canvas: HTMLCanvasElement) {
  const setFull = () => {
    canvas.width = wrap.offsetWidth
    canvas.height = wrap.offsetHeight
  }
  setFull()
  window.addEventListener('resize', setFull)
  onUnmounted(() => {
    window.removeEventListener('resize', setFull)
  })
}
