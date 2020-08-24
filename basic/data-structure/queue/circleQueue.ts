class CircleQueue<T> {
  private items: T[] = []
  private n: number // 总容量
  private head: number = 0
  private tail: number = 0
  // 循环队列的容量是固定的
  constructor(n: number) {
    this.n = n
  }

  enqueue(value: T) {
    if (this.isFull()) {
      console.info('队列已满，无法入队')
      return
    } else {
      this.items[this.tail] = value
      this.tail = (this.tail + 1) % this.n
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      console.info('队列为空，无法出队')
      return
    } else {
      const value = this.items[this.head]
      this.head = (this.head + 1) % this.n
      return value
    }
  }

  isFull() {
    return (this.tail + 1) % this.n === this.head
  }

  isEmpty() {
    return this.tail === this.head
  }
}

const circleQueue = new CircleQueue(8)

circleQueue.enqueue(1)
circleQueue.enqueue(2)
circleQueue.enqueue(3)
circleQueue.enqueue(4)
circleQueue.dequeue()
circleQueue.dequeue()
circleQueue.dequeue()
circleQueue.enqueue(5)
circleQueue.enqueue(6)
circleQueue.enqueue(7)
circleQueue.enqueue(8)
circleQueue.enqueue(9)
circleQueue.enqueue(10)
circleQueue.enqueue(11)
console.info(circleQueue.dequeue())
