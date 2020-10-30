import { Compare } from '../../types/types'
/**
 * 堆「最大堆」
 * 采用数组存储：对于下标为 i 的结点，其左子结点的下标为 2 * i
 * 右子节点下标为 2 * i + 1，父节点下标为 Math.floor(i / 2)
 */

class Heap<T> {
  private length: number = 0
  private data: T[] = []
  private compare: Compare<T>
  constructor(compare: Compare<T>) {
    this.compare = compare
  }

  private swap(index1: number, index2: number) {
    const temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }

  /**
   * 插入
   */
  public insert(val: T) {
    if (this.length === 0) {
      // 从 1 开始，方便之后各个结点的标识
      this.data[1] = val
      this.length++
    } else {
      // 先将新增的值放入最后
      this.data.push(val)
      this.length++
      // 与其父元素对比并调整来满足堆的规则
      let index = this.length
      while (index >= 1) {
        // 获取父节点下标
        let fatherIndex = Math.floor(index / 2)
        // 如果大于父节点则交换
        if (this.compare(this.data[index], this.data[fatherIndex]) > 0) {
          this.swap(index, fatherIndex)
        }
        index = fatherIndex
      }
    }
  }

  /**
   * 删除头部结点
   * 为了保证堆的结构，将堆顶元素与数组最后一个元素替换后再删除，再将栈顶元素调整到适合的位置来维持堆的结构
   */
  public deleteHead() {
    // 将最后的元素与堆顶替换并删除替换后的数组的最后的元素
    this.data[1] = this.data[this.length]
    this.data[this.length] = undefined as any
    this.length--
    let i = 1
    while (i <= this.length) {
      let maxIndex = i
      // 找出大于其值的子节点中的最大值
      if (this.compare(this.data[maxIndex], this.data[2 * i]) < 0) {
        // 如果此节点小于左子节点
        maxIndex = 2 * i
      }
      if (this.compare(this.data[maxIndex], this.data[2 * i + 1]) < 0) {
        // 如果此节点小于右子节点
        maxIndex = 2 * i + 1
      }
      // 如果子节点没有比其大的，则停止
      if (maxIndex === i) {
        break
      }
      this.swap(i, maxIndex)
      i = maxIndex
    }
  }
}

const heap = new Heap<number>((data1, data2) => data1 - data2)

heap.insert(10)
heap.insert(8)
heap.insert(5)
heap.insert(12)
heap.insert(20)
heap.insert(22)
heap.deleteHead()

console.info(heap)
