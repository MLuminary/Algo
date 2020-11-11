export class TrieNode {
  public data: string
  public isLastNode: boolean = false
  public children: TrieNode[] = []
  public fail: TrieNode | null = null
  public pattern: string = ''
  constructor(data: string) {
    this.data = data
  }
}

class TrieTree {
  // 存储无意义字符
  private root: TrieNode = new TrieNode('/')

  private strToNumber = (str: string) => {
    return str.charCodeAt(0) - 'a'.charCodeAt(0)
  }

  public insert(data: string) {
    let curNode = this.root
    for (let i = 0; i < data.length; i++) {
      const index = this.strToNumber(data[i])
      if (!curNode.children[index]) {
        const newNode = new TrieNode(data[i])
        curNode.children[index] = newNode
      }
      curNode = curNode.children[index]
    }
    curNode.isLastNode = true
    curNode.pattern = data
  }

  public find(pattern: string) {
    let curNode = this.root
    for (let i = 0; i < pattern.length; i++) {
      const index = this.strToNumber(pattern[i])
      if (curNode.children[index]) {
        curNode = curNode.children[index]
        continue
      }
      return false
    }
    return true
  }

  // 创建失败指针
  public createFail() {
    const queue = [this.root]
    while (queue.length) {
      // 广度优先遍历
      const node = queue.shift()
      if (node) {
        for (let i in node.children) {
          const child = node.children[i]
          if (node === this.root) {
            // 第一层的 fail 指向的都是 root
            child.fail = this.root
          } else {
            let p = node.fail
            while (p) {
              // 如果父节点的 fail 节点的子节点与 child 相等
              if (p.children[i]) {
                child.fail = p.children[i]
                break
              }
              // 如果没有则再去匹配下一个 fail 节点
              p = p.fail
            }
            // 如果父节点没有 fail
            if (!p) {
              child.fail = this.root
            }
          }
          queue.push(child)
        }
      }
    }
  }

  // 校验字符串
  public match(text: string) {
    let curNode = this.root
    for (let i = 0; i < text.length; i++) {
      const index = this.strToNumber(text[i])
      // 如果此字符不存在且不是第一层时，则跳转到 fail 节点继续尝试
      if (!curNode.children[index] && curNode !== this.root) {
        curNode = curNode.fail!
      }
      curNode = curNode.children[index]
      // 如果没匹配，则从头重新匹配
      if (!curNode) {
        curNode = this.root
      }
      let p = curNode
      while (p && p !== this.root) {
        if (p.isLastNode) {
          const pos = i - p.pattern.length + 1
          console.log(`匹配模式串 ${p.pattern} 其起始位置在 ${pos}`)
        }
        p = p.fail!
      }
    }
  }
}

const trieTree = new TrieTree()
trieTree.insert('hello')
trieTree.insert('her')
trieTree.insert('how')
trieTree.insert('hi')
trieTree.createFail()

console.info(trieTree.match('hello how are you? hi, her name is hh'))
