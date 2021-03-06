import { isEqual } from './../../utils/utils'
/**
 * 单链表
 */
export class SingleNode<T> {
  public value: T
  public next: SingleNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

export class SingleList<T> {
  private readonly head: SingleNode<T>
  constructor() {
    this.head = new SingleNode<any>(null) // 头结点为哨兵结点
  }

  findLast() {
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
  find({ value, callback }: { value?: T; callback?: (value: T) => boolean }) {
    let curNode: SingleNode<T> | null = this.head.next
    while (curNode) {
      // 除去头结点的 null
      if (callback && callback(curNode.value)) {
        return curNode
      }

      if (isEqual(curNode.value, value)) {
        return curNode
      }

      curNode = curNode.next
    }

    return null
  }

  // 顺序查找第一个元素
  findIndexByValue(value: T, start = 0): number {
    if (!value) {
      return -1
    }
    let curNode: SingleNode<T> | null = this.head
    let curIndex = -1
    while (curNode && (!isEqual(curNode.value, value) || curIndex < start)) {
      curNode = curNode.next
      curIndex++
    }

    return curNode ? curIndex : -1
  }

  findByIndex(index = 0): SingleNode<T> | null {
    if (index < 0) {
      return null
    }
    let curNode: SingleNode<T> | null = this.head
    let curIndex = -1 // 隐藏掉 head 结点
    while (curNode && curIndex !== index) {
      curNode = curNode.next
      curIndex++
    }

    return curNode
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

  findPrev({
    value,
    callback,
  }: {
    value?: T
    callback?: (value: T) => boolean
  }): SingleNode<T> | null {
    let curNode = this.head
    while (curNode.next) {
      if (callback && callback(curNode.next.value)) {
        return curNode
      }

      if (isEqual(curNode.next.value, value)) {
        return curNode
      }

      curNode = curNode.next
    }
    // 如果 prev 为最后一个元素则返回 null
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
      result += `->${JSON.stringify(curNode.value)}`
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
console.info(singleList.find({ value: 3 }))
console.info(singleList.findByIndex(4))
console.info(singleList.findIndexByValue(2, 3))
singleList.remove(2)
singleList.append(8)
singleList.display()
singleList.reverse()
singleList.display()
console.info(singleList.isCircle())
