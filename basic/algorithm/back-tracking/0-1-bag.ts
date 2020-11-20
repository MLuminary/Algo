const items = [2, 5, 6, 4, 2, 1]
const bag: number[] = [] // 记录放入的包裹
const maxW = 10 // 背包的最大重量
let w = 0 // 背包的现重量

const putIn = (i: number, w: number) => {
  if (i >= items.length) {
    return
  }

  if (items[i] + w <= maxW) {
    putIn(i + 1, w + items[i])
    bag[i] = items[i]
  } else {
    putIn(i + 1, w)
  }
}

putIn(0, 0)
console.info(bag)
