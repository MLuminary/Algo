const a = 'wcsicdncsaskmf'
const b = 'csas'
/**
 * 暴力匹配
 */
const BF = (a: string, b: string): number => {
  for (let i = 0; i < a.length; i++) {
    let match = true
    for (let j = 0; j < b.length; j++) {
      if (a[i + j] !== b[j]) {
        match = false
        break
      }
    }
    if (match) {
      return i
    }
  }
  return -1
}

const getStrNum = (str: string, index: number): number => {
  return str.charCodeAt(index) - 'a'.charCodeAt(0)
}

const RK = (a: string, b: string): number => {
  const hash: number[] = []
  const table = []
  hash[0] = 0
  let count = 1
  let hashB = 0

  for (let i = 0; i < b.length; i++) {
    table[i] = count
    count *= 26
  }

  for (let i = 0; i < b.length; i++) {
    hash[0] += table[b.length - i - 1] * getStrNum(a, i)
    hashB += table[b.length - i - 1] * getStrNum(b, i)
  }

  if (hash[0] === hashB) {
    return 0
  }

  for (let i = 1; i < a.length - b.length + 1; i++) {
    hash[i] =
      (hash[i - 1] - getStrNum(a, i - 1) * table[b.length - 1]) * 26 +
      getStrNum(a, i + b.length - 1) * table[0]
    if (hash[i] === hashB) {
      return i
    }
  }

  return -1
}

console.info(BF(a, b))
console.info(RK(a, b))
