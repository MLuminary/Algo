const queens: number[] = []
const queens2: number[][] = []
const len = 8

const isOk = (row: number, column: number) => {
  for (let i = row - 1; i >= 0; i--) {
    if (
      queens[i] === column ||
      Math.abs(column - queens[i]) === Math.abs(row - i)
    ) {
      return false
    }
  }
  return true
}

const cal8queen = (row: number) => {
  if (row === len) {
    queens2.push(queens.slice(0))
    return
  }

  for (let column = 0; column < len; column++) {
    if (isOk(row, column)) {
      queens[row] = column
      cal8queen(row + 1)
    }
  }
}

cal8queen(0)
// console.info(queens2)
