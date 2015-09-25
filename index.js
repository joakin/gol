var context = require('2d-context')()
var createLoop = require('canvas-fit-loop')
var render = require('./lib/render.js')
var {initial} = require('./lib/board.js')

window.require = require

var canvas = context.canvas
document.body.appendChild(canvas)

// setup a retina-scaled canvas
var app = window.app = createLoop(canvas, { scale: window.devicePixelRatio })

function boardSize(app, cellSize = 4 + Math.random()*40) {
  let dim = Math.min(...app.shape)*app.scale
  app.cellSize = cellSize
  return Math.floor(dim/cellSize)
}

function update (app) {
  app.dimensions = [app.width, app.height] = app.shape.map((d) => d * app.scale)
  var smallDim = Math.min(...app.dimensions)
  app.margins = [app.left, app.top] = app.dimensions.map((d) => (d - smallDim) / 2)
}

app.board = initial(boardSize(app, 10))
update(app)

// start rendering
app.start()

// on requestAnimationFrame
app.on('tick', function(dt) {
  render(dt, context, app)
})

// handle window resize
app.on('resize', function() {
  update(app)
  console.log('new canvas size', app.width, app.height)
})

canvas.addEventListener('click', function() {
  app.board = initial(boardSize(app))
  update(app)
})
