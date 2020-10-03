const { lerp } = require('canvas-sketch-util/math')

export const genGridPoints = (count = 5) => {
  const points = []
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1)
      const v = count <= 1 ? 0.5 : y / (count - 1)
      points.push([u, v])
    }
  }

  return points
}

export const generateGridQuadrants = (grid) => {
  return [
    grid.filter(([u, v]) => u < 0.5 && v < 0.5),
    grid.filter(([u, v]) => u < 0.5 && v > 0.5),
    grid.filter(([u, v]) => u > 0.5 && v < 0.5),
    grid.filter(([u, v]) => u > 0.5 && v > 0.5),
  ]
}

export const setupMargin = (margin, [width, height]) => {
  return ([u, v]) => {
    const x = lerp(margin, width - margin, u)
    const y = lerp(margin, height - margin, v)
    return [x, y]
  }
}
