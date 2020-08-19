import { SingleNode } from '../linked-list/singleList'
/**
 * Js 数组模拟栈
 */
const arr = []
// 入栈
arr.push(2)
// 出栈
arr.pop()

/**
 * 采用单向链表节点来构造栈结构
 */
export class ChainStack<T> {
  // 栈顶结点
  private node: SingleNode<T> | null
  public size: number
  constructor() {
    this.node = null
    this.size = 0
  }

  push(value: T) {
    if (!value) {
      return
    }
    const newNode = new SingleNode(value)
    if (!this.node) {
      this.node = newNode
    } else {
      // 头部插入新节点且将 node 替换为此时的头结点
      newNode.next = this.node
      this.node = newNode
    }
    this.size++
  }

  pop() {
    if (!this.node) {
      return
    }
    const value = this.node.value
    this.node = this.node.next
    this.size--
    return value
  }

  display() {
    let curNode = this.node
    if (!curNode) {
      console.info('stack is empty')
      return
    }
    let result = `${curNode.value}`
    while (curNode.next) {
      curNode = curNode.next
      result += `->${curNode.value}`
    }
    console.info(result)
  }
}

const chainStack = new ChainStack<number>()
chainStack.push(1)
chainStack.push(2)
chainStack.push(3)
chainStack.push(4)
chainStack.push(5)
console.info(chainStack.pop())
chainStack.display()
