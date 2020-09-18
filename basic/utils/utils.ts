import _ from 'lodash'
/**
 * 先专注实现算法与数据结构，方法先试用 lodash 处理
 * 待算法与数据结构整理完毕可以考虑自己实现用到的方法
 */

/**
 * 比较两个值是否相等
 * @param value
 * @param other
 */
export const isEqual = (value: any, other: any) => {
  return _.isEqual(value, other)
}