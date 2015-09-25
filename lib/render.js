var accum = require("time-accumulator")(200)
var {draw, tick, print} = require('./board.js')

var left = 0
module.exports = function (dt, ctx, app) {
  accum(dt, function () {
    ctx.clearRect(0, 0, app.width, app.height)
    draw(ctx, app, app.board)
    app.board = tick(app.board)
  })
}
