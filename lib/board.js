var array = require('array-range')

exports.initial = function initial (dimensions = 20 + Math.floor(Math.random()*300)) {
  return array(dimensions)
    .map((r) =>
      array(dimensions)
        .map((c) => Math.random() > 0.5 ? true : false))
}

exports.draw = function (ctx, {cellSize, left, top}, board) {
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (cell)
        ctx.fillRect(
          Math.floor(left + i * cellSize),
          Math.floor(top + j * cellSize),
          Math.floor(cellSize), Math.floor(cellSize)
        )
    }))
}

exports.tick = function (board) {
  return board.map((r, i) => r.map((c, j) => newCell(c, i, j, board)))
}

exports.print = function (board) {
  console.log(
    board.map((r)=>
      r.map((c)=>c?'x':' ').join('')).join('\n')
  )
}

function newCell (cell, row, col, board) {
  var ns = neighbours(row, col, board)
  if (cell) {
    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    // Any live cell with more than three live neighbours dies, as if by overcrowding.
    if (ns < 2 || ns > 3) return false
    // Any live cell with two or three live neighbours lives on to the next generation.
    else return true
  } else {
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    if (ns === 3) return true
    else return false
  }
}

function neighbours (row, col, board) {
  var ns = 0
  for (var i = row-1; i <= row+1; i++)
    for (var j = col-1; j <= col+1; j++) {
      if (!(i === row && j === col) &&
          i >= 0 && i < board.length &&
          j >= 0 && j < board.length &&
          board[i][j])
        ns+=1
    }
  return ns
}
