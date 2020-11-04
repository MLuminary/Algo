import { SingleList } from './../linked-list/singleList'
/**
 * 图
 * 无向图
 * 暂且只支持 number 类型的数据存储，先将思路与结构理清，之后再做优化
 * 「先加快学习的进度！」
 */

class Graph {
  private v: number = 0 // 顶点最大点
  private adj: SingleList<number>[] = [] // 邻接表

  constructor(v: number) {
    this.v = v

    for (let i = 0; i < v; i++) {
      this.adj[i] = new SingleList()
    }
  }

  addEdge(s: number, e: number) {
    this.adj[s].append(e)
    this.adj[e].append(s)
  }

  /**
   * 广度优先遍历
   * @param s 起始点
   * @param e 终止点
   */
  public bfs(s: number, e: number) {
    if (s === e) {
      return
    }
    const visited: boolean[] = [] // 记录该点有没有被访问
    visited[s] = true
    const prev: number[] = [] // prev[2] = 3 则为 3 -> 2
    for (let i = 0; i < this.v; i++) {
      prev[i] = -1
    }
    const queue: number[] = [] // 用来存储已经被访问，但相连的点还没有被访问的点
    queue.push(s)
    while (queue.length) {
      const cur = queue.pop()!
      // 找到链表中的第一个值，也就是第一个相连的顶点
      let curNode = this.adj[cur].findByIndex(0)
      while (curNode) {
        const next = curNode.value
        // 如果没有访问
        if (!visited[next]) {
          prev[next] = cur
          if (next === e) {
            this.print(prev, s, e)
            return
          }
          visited[next] = true
          // 将当前访问的点添加到队列中
          queue.push(next)
        }
        curNode = curNode.next
      }
    }
  }

  public print(prev: number[], s: number, e: number) {
    let str = ''
    while (prev[e] !== -1 && e !== s) {
      str += e
      e = prev[e]
    }
    console.info(str.split('').reverse().join('->'))
  }
}

const graph = new Graph(8)
graph.addEdge(0, 1)
graph.addEdge(0, 3)
graph.addEdge(1, 2)
graph.addEdge(1, 4)
graph.addEdge(2, 5)
graph.addEdge(4, 5)
graph.addEdge(4, 6)
graph.addEdge(5, 7)
graph.addEdge(6, 7)
graph.bfs(0, 6)
