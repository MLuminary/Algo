const arr = [7, 5, 19, 8, 4, 1, 20, 13, 16]
let arrLength = arr.length

/**
 * 堆化
 * 比较左右子节点，找出最大的来替换根节点，没有则不交换
 */
const heapify = (i: number) => {
  while (true) {
    let maxIndex = i
    if (2 * i + 1 < arrLength && arr[maxIndex] < arr[2 * i + 1]) {
      maxIndex = 2 * i + 1
    }
    if (2 * i + 2 < arrLength && arr[maxIndex] < arr[2 * i + 2]) {
      maxIndex = 2 * i + 2
    }
    if (maxIndex === i) {
      break
    }
    const temp = arr[i]
    arr[i] = arr[maxIndex]
    arr[maxIndex] = temp
    i = maxIndex
  }
}

/**
 * 建堆
 * 下标是 n/2 + 1 的节点为叶子节点，我们不需要堆化
 */
const buildHeap = () => {
  for (let i = Math.floor(arrLength / 2); i >= 0; i--) {
    heapify(i)
  }
}

const heapSort = () => {
  buildHeap()
  while (arrLength > 1) {
    const temp = arr[arrLength - 1]
    arr[arrLength - 1] = arr[0]
    arr[0] = temp
    arrLength--
    heapify(0)
  }
}

heapSort()

console.info(arr)
