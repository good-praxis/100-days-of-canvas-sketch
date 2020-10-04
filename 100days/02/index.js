const canvasSketch = require('canvas-sketch')
import random from 'canvas-sketch-util/random'
import palettes from 'nice-color-palettes'
import { genGridPoints, generateGridQuadrants, setupMargin } from '../utils'

const dimensions = [2048, 2048]

const settings = {
  dimensions: dimensions,
}

const withMargin = setupMargin(300, dimensions)

const gridPoints = genGridPoints(80)
console.assert(gridPoints.length % 4 === 0, 'grid not dividable by 4') // guard against bad quadrents

const quadrants = generateGridQuadrants(gridPoints)

const sketch = ({ render }) => {
  return ({ context, width, height }) => {
    const colors = random.pick(palettes)
    context.fillStyle = colors.pop()
    context.fillRect(0, 0, width, height)

    quadrants.forEach((quad) => {
      const quadColor = colors.shift()

      quad.forEach((point) => {
        if (random.value() <= 0) {
          return
        }

        context.beginPath()

        const [x, y] = withMargin(point)

        context.fillStyle = quadColor
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x, y + 150 * (random.value() - 0.5))
        context.lineTo(x + 150 * (random.value() - 0.5), y)
        context.closePath()
        context.fill()
        context.rotate(random.value() - 0.5)
      })
    })

    setTimeout(render, 4000)
    // This way of looping makes it incredibly glitched, a reload may cause bad frames to be drawn
  }
}

canvasSketch(sketch, settings)
