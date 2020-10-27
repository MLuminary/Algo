/**
 * 平衡二叉树
 * 目的：解决普通查找二叉树失衡退化成链表的问题
 * 实现方式：每次插入和删除时都将检测操作路线上的节点的左右子树的高度，如果相差大于等于 2 则需要根据不同情况做一些调整来使其左右子树的高度差降为 2 以下
 */

type Compare<T> = (data1: T, data2: T) => number

class BalancedTreeNode<T> {
  public data: T
  public left: BalancedTreeNode<T> | null = null
  public right: BalancedTreeNode<T> | null = null
  public height: number = 0 // 结点的高度

  constructor(data: T) {
    this.data = data
  }
}

class BalancedTree<T> {
  private root: BalancedTreeNode<T> | null = null
  private compare: Compare<T>
  // compare 也可以给一个默认值，在这里不多纠结
  constructor(compare: Compare<T>) {
    this.compare = compare
  }
  /**
   * 获取结点的高度
   */
  private _getHeight(node: BalancedTreeNode<T> | null) {
    if (node === null) {
      return -1
    }
    return node.height
  }

  /**
   * 根据左右子节点高度重新计算根节点高度
   * 根节点的高度等于左右子树的高度 +1
   */
  private _calHeight(node: BalancedTreeNode<T>) {
    return Math.max(this._getHeight(node.left), this._getHeight(node.right)) + 1
  }

  /**
   * 左右子树相差大于等于 2 即视为失衡
   */
  private _isUnbalanced(node: BalancedTreeNode<T>) {
    return (
      Math.abs(this._getHeight(node.left) - this._getHeight(node.right)) >= 2
    )
  }
  // 左旋
  private _LRotate(node: BalancedTreeNode<T>) {
    // 把 node 的右结点旋转为根节点
    const curRoot = node.right!
    // 让此时根节点的左子树变为 node 的右子树
    node.right = curRoot.left
    // 让 node 成为此时根节点的左子树
    curRoot.left = node

    // node 与 curRoot 的高度都发生了变化，因此需要重新计算校准
    node.height = this._calHeight(node)
    curRoot.height = this._calHeight(curRoot)

    return curRoot
  }

  // 右旋
  private _RRotate(node: BalancedTreeNode<T>) {
    const curRoot = node.left!
    node.left = curRoot.right
    curRoot.right = node

    node.height = this._calHeight(node)
    curRoot.height = this._calHeight(curRoot)

    return curRoot
  }

  // 先左旋再右旋
  private _LRRotate(node: BalancedTreeNode<T>) {
    node.left = this._LRotate(node.left!)
    return this._RRotate(node)
  }

  // 先右旋再左旋
  private _RLRotate(node: BalancedTreeNode<T>) {
    node.right = this._RRotate(node.right!)
    return this._LRotate(node)
  }

  public insert(data: T) {
    if (data === null) {
      throw new Error('data can not be null')
    }
    this.root = this._insert(data, this.root)
  }

  private _insert(data: T, node: BalancedTreeNode<T> | null) {
    if (node === null) {
      node = new BalancedTreeNode(data)
    } else {
      if (this.compare(data, node.data) > 0) {
        node.right = this._insert(data, node.right)

        // 判断是否失衡
        if (this._isUnbalanced(node)) {
          // 如果插入的数据大于此节点右子结点的数据，则为 RR 型，需要进行左旋
          if (this.compare(data, node.right.data) > 0) {
            node = this._LRotate(node)
          } else if (this.compare(data, node.right.data) < 0) {
            node = this._RLRotate(node)
          }
        }
      } else if (this.compare(data, node.data) < 0) {
        node.left = this._insert(data, node.left)

        if (this._isUnbalanced(node)) {
          if (this.compare(data, node.left.data) > 0) {
            node = this._LRRotate(node)
          } else if (this.compare(data, node.left.data) < 0) {
            node = this._RRotate(node)
          }
        }
      } else {
        // 暂不处理相等时的逻辑
      }
    }

    node.height = this._calHeight(node)

    return node
  }

  public delete(data: T) {
    if (data === null) {
      throw new Error('data can not be null')
    }
    this.root = this._delete(data, this.root)
  }

  private _delete(data: T, node: BalancedTreeNode<T> | null) {
    if (node === null) {
      return null
    }

    if (this.compare(data, node.data) > 0) {
      node.right = this._delete(data, node.right)

      if (this._isUnbalanced(node)) {
        const curNode = node.left!
        if (this._getHeight(curNode.left) > this._getHeight(curNode.right)) {
          node = this._RRotate(node)
        } else {
          node = this._LRRotate(node)
        }
      }
    } else if (this.compare(data, node.data) < 0) {
      node.left = this._delete(data, node.left)

      if (this._isUnbalanced(node)) {
        const curNode = node.right!
        if (this._getHeight(curNode.right) > this._getHeight(curNode.left)) {
          node = this._LRotate(node)
        } else {
          node = this._RLRotate(node)
        }
      }
    } else {
      if (node.left && node.right) {
        // 删除节点的值替换为右子树的最小结点的值
        node.data = this.findMinNode(node.right)!.data
        // 删除右子树中的最小结点
        node.right = this._delete(node.data, node.right)
      } else {
        node = node.left ? node.left : node.right
      }
    }

    if (node) {
      node.height = this._calHeight(node)
    }

    return node
  }

  public findMinNode(node: BalancedTreeNode<T> | null) {
    if (node === null) {
      return null
    }
    let curNode = node
    while (curNode.left) {
      curNode = curNode.left
    }
    return curNode
  }
}

const tree = new BalancedTree<number>((data1, data2) => data1 - data2)

tree.insert(1)
tree.insert(2)
tree.insert(3)
tree.insert(4)
console.info(tree)
tree.delete(1)
console.info(tree)
