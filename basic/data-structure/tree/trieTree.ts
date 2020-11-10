/**
 * 字典树
 */
export class TrieNode {
  public data: string
  public isLastNode: boolean = false
  public children: TrieNode[] = []
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
}

const trieTree = new TrieTree()
trieTree.insert('hello')
trieTree.insert('her')
trieTree.insert('how')
trieTree.insert('hi')

console.info(trieTree.find('her'))
