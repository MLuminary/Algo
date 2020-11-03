type Sort = {
  sortKey: number // 用于排序
}

class SkipList<T extends Sort> {
  private head: SkipListNode<T> // 跳表头结点
  private level = 1 // 跳表目前的最高索引层

  private MAX_LEVEL = 16
  private SKIPLIST_PROBAILITY = 0.5

  constructor() {
    this.head = new SkipListNode<T>(Number.MIN_VALUE, null, this.level)
  }

  /**
   * 理论来讲，一级索引中元素个数应该占原始数据的 50%，二级索引中元素个数占 25%，三级索引12.5% ，一直到最顶层。
   * 因为这里每一层的晋升概率是 50%。对于每一个新插入的节点，都需要调用 randomLevel 生成一个合理的层数。
   * 该 randomLevel 方法会随机生成 1~MAX_LEVEL 之间的数，且 ：
   *    50%的概率返回 1
   *    25%的概率返回 2
   *    12.5%的概率返回 3 ...
   */
  private randomLevel() {
    let level = 1
    while (Math.random() < this.SKIPLIST_PROBAILITY && level < this.MAX_LEVEL) {
      level++
    }
    return level
  }

  public insert(value: T) {
    const level = this.randomLevel() // 获得该结点需要建立的索引层级
    const newNode = new SkipListNode(value.sortKey, value, level)
    const prevNodes = new Array(level)
    let p = this.head
    for (let i = level - 1; i >= 0; i--) {
      while (p.nextNodes[i] && p.nextNodes[i].sortKey < value.sortKey) {
        p = p.nextNodes[i]
      }
      // 将需要向下寻找的结点记录下来
      prevNodes[i] = p
    }

    for (let i = 0; i < level; i++) {
      // 第一层为原始结点，其余只需要存储索引结点即可
      newNode.nextNodes[i] = prevNodes[i].nextNodes[i]
      prevNodes[i].nextNodes[i] = newNode
    }

    if (level > this.level) {
      this.level = level
    }
  }

  public findNode(sortKey: number) {
    let p = this.head
    for (let i = this.level - 1; i >= 0; i--) {
      while (p.nextNodes[i] && p.nextNodes[i].sortKey < sortKey) {
        p = p.nextNodes[i]
      }
    }

    if (p.nextNodes[0] && p.nextNodes[0].sortKey === sortKey) {
      return p.nextNodes[0]
    }
    return null
  }

  public delete(sortKey: number) {
    let p = this.head
    const prevNodes = []
    for (let i = this.level - 1; i >= 0; i--) {
      while (p.nextNodes[i] && p.nextNodes[i].sortKey < sortKey) {
        p = p.nextNodes[i]
      }
      prevNodes[i] = p
    }

    if (p.nextNodes[0] && p.nextNodes[0].sortKey === sortKey) {
      const node = p.nextNodes[0]
      for (let i = this.level - 1; i >= 0; i--) {
        if (
          prevNodes[i].nextNodes[i] &&
          prevNodes[i].nextNodes[i].sortKey === sortKey
        ) {
          prevNodes[i].nextNodes[i] = prevNodes[i].nextNodes[i].nextNodes[i]
        }
      }
      return node
    }
    // 如果删除了最高一层索引，需要更新 level
    while (this.level > 1 && !this.head.nextNodes[this.level]) {
      this.level--
    }

    return null
  }
}

class SkipListNode<T> {
  sortKey: number // 用于排序
  value: T | null
  maxLevel: number // 该节点的最大索引层级
  // 用于记录该结点每一层级的下一个「右边的」结点
  // 例如 this.nextNodes[2] 就为第二层级下该节点的下一个结点
  nextNodes: SkipListNode<T>[]

  constructor(sortKey: number, value: T | null, maxLevel: number) {
    this.sortKey = sortKey
    this.value = value
    this.maxLevel = maxLevel
    this.nextNodes = []
  }
}

const nodes = [
  { sortKey: 1, value: 'haoqin1' },
  { sortKey: 4, value: 'haoqin2' },
  { sortKey: 8, value: 'haoqin3' },
  { sortKey: 5, value: 'haoqin4' },
  { sortKey: 2, value: 'haoqin5' },
  { sortKey: 3, value: 'haoqin6' },
]

const list = new SkipList()
for (let i = 0; i < nodes.length; i++) {
  list.insert(nodes[i])
}

console.info(list)
console.info(list.findNode(4))