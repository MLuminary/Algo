class LinkedNode<T> {
  public value: T
  public next: LinkedNode<T> | null
  public prev: LinkedNode<T> | null
  constructor(value: T) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LinkedList<T> {
  private readonly head: LinkedNode<any> = new LinkedNode(null)

  find(value: T) {
    let curNode: LinkedNode<T> | null = this.head
    while (curNode && curNode.value !== value) {
      curNode = curNode.next
    }

    return curNode
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
    const newNode = new LinkedNode(value)
    newNode.prev = lastNode
    lastNode.next = newNode
  }

  insert(targetValue: T, value: T) {
    if (!value) {
      return
    }
    const targetNode = this.find(targetValue)
    const newNode = new LinkedNode(value)
    if (!targetNode) {
      return
    }

    if (targetNode.next) {
      const nextNode = targetNode.next
      nextNode.prev = newNode
      newNode.next = nextNode
      targetNode.next = newNode
      newNode.prev = targetNode
    } else {
      targetNode.next = newNode
      newNode.prev = targetNode
    }
  }

  remove(value: T) {
    const removeNode = this.find(value)
    if (!removeNode) {
      return
    }
    // 有头结点的存在
    const prevNode = removeNode.prev!
    const nextNode = removeNode.next
    if (nextNode) {
      prevNode.next = nextNode
      nextNode.prev = prevNode
    } else {
      prevNode.next = null
    }
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
}

const linkedList = new LinkedList<number>()
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.append(5)
linkedList.append(6)
console.info(linkedList.find(6))
linkedList.insert(2, 8)
linkedList.insert(6, 9)
linkedList.remove(9)
linkedList.display()
