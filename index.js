var context = require('2d-context')()
var createLoop = require('canvas-fit-loop')
var render = require('./lib/render.js')
var {initial} = require('./lib/board.js')

window.require = require

var canvas = context.canvas
document.body.appendChild(canvas)

// setup a retina-scaled canvas
var app = window.app = createLoop(canvas, { scale: window.devicePixelRatio })

function update (app) {
  app.width = app.shape[0] * app.scale
  app.height = app.shape[1] * app.scale
  var smallDim = Math.min(app.width, app.height)
  app.cellSize = smallDim / app.board.length
  app.left = (app.width - smallDim) / 2
  app.top = (app.height - smallDim) / 2
}

app.board = initial(Math.round(Math.min(...app.shape)*app.scale/10))

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
  app.board = initial()
  update(app)
})
