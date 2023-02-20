export type ColorListType = [number, number, number, number ]

export function getRandomColor(): ColorListType {
  return [Math.random(), Math.random(), Math.random(), 1.0]
}
