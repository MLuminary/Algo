import { SingleList } from './../linked-list/singleList'

type Value = {
  key: string | number
  [key: string]: any
}

class HashTable<T extends Value> {
  private buckets: SingleList<T>[] | T[] | undefined[] = []

  /**
   * 散列函数，截取后两位
   */
  private hash(key: T['key']) {
    if (typeof key === 'number') {
      key = key.toString()
    }

    return parseInt((key as string).substr(-2), 10)
  }

  /**
   * 新增
   * @param key 需要经过散列函数处理的 key 值
   * @param value 需要存储的真实数据
   */
  public put(value: T) {
    const index = this.hash(value.key)
    // 如果位置未被引用
    if (!this.buckets[index]) {
      // 如果没有冲突则不需要创建链表
      this.buckets[index] = value
    } else {
      // 如果之前已经添加过则不需要添加
      if (this.find(value.key)) {
        return
      }
      // 如果出现散列冲突，则用链表法
      const item = this.buckets[index]
      if (item instanceof SingleList) {
        // 如果之前已经建立过链表
        item.append(value)
      } else {
        const list = new SingleList<T>()
        list.append(item!)
        list.append(value)
        this.buckets[index] = list
      }
    }
  }
  /**
   * 根据 key 值查找元素
   */
  public find(key: T['key']) {
    const index = this.hash(key)
    if (this.buckets[index]) {
      const item = this.buckets[index]
      if (item instanceof SingleList) {
        return item.find({ callback: (value) => value.key === key })
      } else if ((this.buckets[index] as T).key === key) {
        return this.buckets[index]
      }
    }
    return null
  }

  /**
   * 会根据之前的值选择添加 or 覆盖
   */
  public update(key: T['key'], value: Omit<T, 'key'>) {
    const index = this.hash(key)
    if (this.buckets[index]) {
      const item = this.buckets[index]
      if (item instanceof SingleList) {
        const node = item.find({ callback: (value) => value.key === key })
        if (!node) {
          throw new Error('you need add it first')
        }
        node.value = { ...node.value, ...value }
      } else {
        this.buckets[index] = { ...this.buckets[index], ...value } as T
      }
    } else {
      throw new Error('you need add it first')
    }
  }

  public delete(key: T['key']) {
    const index = this.hash(key)
    if (this.buckets[index]) {
      const item = this.buckets[index]
      if (item instanceof SingleList) {
        const prevNode = item.findPrev({
          callback: (value) => value.key === key
        })
        if (prevNode) {
          prevNode.next = prevNode.next!.next
        }
      } else {
        return (this.buckets[index] = undefined)
      }
    }
  }
}

const hashTable = new HashTable()

hashTable.put({ key: 221301, name: '张三' })
hashTable.put({ key: 221301, name: '张三' })
hashTable.put({ key: 231301, name: '王五' })
hashTable.put({ key: 221303, name: '李四' })
hashTable.put({ key: 241202, name: '杨八' })
hashTable.update(231301, { jump: 1.2 })

hashTable.delete(241202)

console.info(hashTable)