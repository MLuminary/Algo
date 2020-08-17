/**
 * 单链表
 * 包含单链表的插入、删除、翻转、查找、检测是否为环等
 */

class SingleNode<T> {
  public value: T
  public next: SingleNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class SingleList<T> {
  private readonly head: SingleNode<any>
  constructor() {
    this.head = new SingleNode(null) // 头结点为哨兵结点
  }

  findLast(): SingleNode<T> {
    let curNode = this.head
    while (curNode.next) {
      curNode = curNode.next
    }
    return curNode
  }

  append(value: T) {
    const lastNode = this.findLast()
    lastNode.next = new SingleNode(value)
  }
  // 顺序查找第一个元素
  findByValue(value: T): SingleNode<T> | null {
    let curNode = this.head
    while (curNode.next && curNode.value !== value) {
      curNode = curNode.next
    }

    return curNode.next === null && curNode.value !== value ? null : curNode
  }
  // 顺序查找第一个元素
  findIndexByValue(value: T, start = 0): number {
    if (!value) {
      return -1
    }
    let curNode = this.head
    let curIndex = -1
    while (curNode.next && (curNode.value !== value || curIndex < start)) {
      curNode = curNode.next
      curIndex++
    }

    return curNode.next === null && curNode.value !== value ? -1 : curIndex
  }

  findByIndex(index = 0): SingleNode<T> | null {
    if (index < 0) {
      return null
    }
    let curNode = this.head
    let curIndex = -1 // 隐藏掉 head 结点
    while (curNode.next && curIndex !== index) {
      curNode = curNode.next
      curIndex++
    }
    // 如果 curNode 是最后一个结点且 index 与 curIndex 不相等的话则返回 null
    return curNode.next === null && curIndex !== index ? null : curNode
  }

  insert(index: number, value: T) {
    const curNode = this.findByIndex(index)
    const insertNode = new SingleNode(value)
    if (!curNode) {
      console.info('index needs to be in the normal range')
      return
    }
    insertNode.next = curNode.next
    curNode.next = insertNode
  }

  findPrev(value: T): SingleNode<T> | null {
    let curNode = this.head
    while (curNode.next && curNode.next.value !== value) {
      curNode = curNode.next
    }

    return curNode.next === null ? null : curNode
  }

  remove(value: T) {
    const prevNode = this.findPrev(value)
    if (!prevNode) {
      return
    }

    prevNode.next = prevNode.next!.next
  }

  display() {
    let curNode = this.head
    let result = 'head'
    while (curNode.next) {
      curNode = curNode.next
      result += `->${curNode.value}`
    }
    console.info(result)
  }

  reverse() {
    let curNode = this.head.next
    let pre = null
    while (curNode) {
      const nextNode = curNode.next
      curNode.next = pre
      this.head.next = curNode
      pre = curNode
      curNode = nextNode
    }
  }

  isCircle() {
    let slow = this.head
    let fast = this.head
    while (fast && fast.next) {
      if (!fast.next.next) {
        return false
      }
      fast = fast.next.next
      slow = slow.next!
      if (fast === slow) {
        return true
      }
    }
    return false
  }
}

const singleList = new SingleList<number>()
singleList.append(1)
singleList.append(2)
singleList.append(4)
singleList.append(7)
singleList.append(2)
singleList.insert(0, 5)
console.info(singleList.findByValue(7))
console.info(singleList.findByIndex(3))
console.info(singleList.findIndexByValue(2, 3))
singleList.remove(2)
singleList.display()
singleList.reverse()
singleList.append(4)
singleList.append(7)
singleList.append(2)
singleList.insert(0, 5)
console.info(singleList.findByValue(7))
console.info(singleList.findByIndex(3))
console.info(singleList.findIndexByValue(2, 3))
singleList.remove(2)
singleList.display()
singleList.reverse()
singleList.display()
console.info(singleList.isCircle())
