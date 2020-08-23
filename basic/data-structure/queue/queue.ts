import { SingleNode } from '../linked-list/singleList'

class Queue<T> {
  private head: SingleNode<T> | null = null
  private tail: SingleNode<T> | null = null

  enqueue(value: T) {
    const newNode = new SingleNode(value)
    // 队列为空
    if (!this.tail) {
      this.head = this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = this.tail.next
    }
  }

  dequeue() {
    if (!this.head) {
      return null
    }
    const value = this.head.value
    this.head = this.head.next
    return value
  }

  display() {
    if (!this.head) {
      return
    }
    let curNode = this.head
    let result = `${curNode.value}`
    while (curNode.next) {
      curNode = curNode.next
      result += `->${curNode.value}`
    }
    console.info(result)
  }
}

const queue = new Queue()

queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.enqueue(6)
queue.dequeue()
// queue.display();

// js 的 arr 可以直接模拟 队列
const arr = [1, 2, 3, 4, 5]
arr.shift() // [2,3,4,5]
arr.push(2) // [2,3,4,5,2]
// console.info(arr);
