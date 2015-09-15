var context = require('2d-context')()
var createLoop = require('canvas-fit-loop')
var render = require('./lib/render.js')
var {initial} = require('./lib/board.js')

window.require = require

var canvas = context.canvas
document.body.appendChild(canvas)

// setup a retina-scaled canvas
var app = createLoop(canvas, { scale: window.devicePixelRatio })

var size = 80
app.board = initial(size)

// start rendering
app.start()

// on requestAnimationFrame
app.on('tick', function(dt) {
  render(dt, context, app)
})

// handle window resize
app.on('resize', function() {
  // the unscaled size
  var width = app.shape[0]
  var height = app.shape[1]

  console.log('new canvas size', width, height)
})

canvas.addEventListener('click', function() {
  app.board = initial(size)
})
