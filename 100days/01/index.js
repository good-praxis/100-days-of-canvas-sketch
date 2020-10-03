const canvasSketch = require('canvas-sketch')
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { genGridPoints, generateGridQuadrants, setupMargin } from '../utils'

const dimensions = [2048, 2048]

const settings = {
  dimensions: dimensions,
}

const withMargin = setupMargin(300, dimensions)

const gridPoints = genGridPoints(20)
console.assert(gridPoints.length % 4 === 0, 'grid not dividable by 4') // guard against bad quadrents

const quadrants = generateGridQuadrants(gridPoints)

const colors = random.pick(palettes)

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, width, height)

    quadrants.forEach((quad) => {
      const quadColor = colors.shift()

      quad.forEach((point) => {
        context.beginPath()

        const [x, y] = withMargin(point)

        context.arc(x, y, 50 + random.value() * 20, 0, Math.PI * 2, false)
        context.fillStyle = quadColor
        context.fill()
      })
    })
  }
}

canvasSketch(sketch, settings)
