import { Compare } from '../../types/types'
/**
 * 查找二叉树
 */

class TreeNode<T> {
  public data: T
  public right: TreeNode<T> | null = null
  public left: TreeNode<T> | null = null

  constructor(data: T) {
    this.data = data
  }
}

class Tree<T> {
  private root: TreeNode<T> | null = null
  private compare: Compare<T>

  constructor(compare: Compare<T>) {
    this.compare = compare
  }

  /**
   * 查找父节点
   * @return 返回 null 时表示只有初始结点，还未插入值
   */
  findParent(data: T) {
    let curNode = this.root
    let fatherNode = this.root
    // 如果当前节点等于要找的节点则不进入循环，之前存储的 node 即为 fatherNode
    while (curNode && this.compare(curNode.data, data) !== 0) {
      fatherNode = curNode
      if (this.compare(data, curNode.data) > 0) {
        curNode = curNode.right
      } else {
        curNode = curNode.left
      }
    }
    return fatherNode
  }

  /**
   * 查找数据
   */
  find(data: T) {
    let curNode = this.root
    while (curNode) {
      if (this.compare(data, curNode.data) > 0) {
        curNode = curNode.right
      } else if (this.compare(data, curNode.data) < 0) {
        curNode = curNode.left
      } else {
        return curNode
      }
    }
    return null
  }

  /**
   * 插入数据，如果相同则不插入
   */
  insert(data: T) {
    if (this.root === null) {
      this.root = new TreeNode(data)
    }
    let curNode = this.root
    while (curNode) {
      if (this.compare(data, curNode.data) > 0) {
        if (!curNode.right) {
          curNode.right = new TreeNode(data)
          return
        }
        curNode = curNode.right
      } else if (this.compare(data, curNode.data) < 0) {
        if (!curNode.left) {
          curNode.left = new TreeNode(data)
          return
        }
        curNode = curNode.left
      } else {
        return
      }
    }
  }

  /**
   * 删除数据
   * 1. 当删除的数据没有子节点时，直接删除
   * 2. 当删除的数据只有一个子节点时，直接指向删除节点的子节点
   * 3. 当删除的数据有两个子节点，找出删除节点的右子树中的最小节点替换到删除的节点中
   */
  delete(data: T) {
    let deleteNode = this.find(data)
    if (!deleteNode) {
      return
    }

    // 如果查找到了 deleteNode 的话其 parentNode 肯定也是存在的
    let deleteParentNode = this.findParent(data)
    if (!deleteParentNode) {
      return
    }

    // 如果有双子节点
    if (deleteNode.left && deleteNode.right) {
      let minNode = deleteNode.right
      let minParentNode = deleteNode
      while (minNode.left) {
        minParentNode = minNode
        minNode = minNode.left
      }
      deleteNode.data = minNode.data // 将右子树中最小的节点的数据替换到要删除的节点中
      deleteNode = minNode // 此时将 deleteNode 的引用改为 minNode，并不会影响树中原有的节点
      deleteParentNode = minParentNode
    }

    // 此时的 deleteNode 已经变成了叶子结点
    let child
    if (deleteNode.left) child = deleteNode.left
    else if (deleteNode.right) child = deleteNode.right
    else child = null
    // 父节点可能有左右结点，因此需要确认删除的结点的位置
    if (deleteParentNode.left && deleteParentNode.left === deleteNode) {
      deleteParentNode.left = child
    } else {
      deleteParentNode.right = child
    }
  }
}

const tree = new Tree<number>((data1, data2) => data1 - data2)

tree.insert(1)
tree.insert(3)
tree.insert(2)
tree.insert(7)
tree.insert(4)
tree.delete(7)
console.info(tree)
