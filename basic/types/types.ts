/**
 * 二叉树中树节点必须是可以比较的
 * 因为数据各种各样，因此用户需要告诉二叉树你要以什么方式进行比较
 * 规则：data1 大于 data2 则返回值需要大于 0，相等则返回 0，data1 小于 data2 则返回值小于 0
 */

export type Compare<T> = (data1: T, data2: T) => number

/**
 * ps: 为什么不写到每个文件中
 * 当你在一个新的 ts 文件中编码时，它处于全局命名空间，比如我在 balancedBinaryTree 中声明 Compare
 * 然后又在 binarySearchTree 声明 Compare，ts 会报 「Ts2300 重复」
 * https://jkchao.github.io/typescript-book-chinese/project/modules.html
 */
