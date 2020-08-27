# 排序

> 在计算机科学与数学中，一个排序算法（英语：Sorting algorithm）是一种能将一串资料依照特定排序方式进行排列的一种算法。

![sort](img/sort.png)

**排序算法的内存消耗**：

算法的内存消耗可以通过空间复杂度来衡量，针对排序算法的空间复杂度，我们还引入新的概念：**原地排序「sorted in place」**，用来特指空间复杂度是 O(1) 的排序算法。

**排序算法的稳定性**：

如果待排序的序列中存在值相等的元素，经过排序之后，**相等元素之间原有的先后顺序不变。**

那有什么用呢，假设你有一组订单数据，订单包含两个属性，一个是下单时间，一个是订单金额，我们希望按照金额从小到大进行排序，金额相等的订单按照下单时间从早到晚排序。对于稳定的排序算法，我们只需要先按照下单时间从早到晚进行排序，然后再按照金额从小到大进行排序即可，**因为第二次按照金额从小到大进行排序的后金额相等的订单还会保持原有的先后顺序不变**。但假如排序算法不稳定，则实现起来就会相对麻烦很多。

## 冒泡排序

冒泡排序是一种交换排序，它的基本思想是：两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止。

![bubbleSort](img/bubbleSort.gif)

```ts
const arr = [3, 5, 4, 1, 2, 6]

const bubbleSort = <T>(arr: T[]) => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let flag = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
        flag = true
      }
    }
    // 如果某次冒泡操作没有数据交换，说明已经达到完全有序
    if (!flag) break
    console.info(i) // 0 1 2
  }

  return arr
}
```

## 插入排序

插入排序，一般也被称为直接插入排序。对于少量元素的排序，它是一个有效的算法。插入排序是一种最简单的排序方法，它的基本思想是将一个记录插入到已经排好序的有序表中。在其实现过程使用双层循环，外层循环对除了第一个元素之外的所有元素，内层循环对当前元素前面有序表进行待插入位置查找，并进行移动

![insertionSort](img/insertionSort.gif)

```ts
const insertionSort = <T>(arr: T[]) => {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    const value = arr[i]
    let j = i - 1
    for (; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j]
      } else {
        break
      }
    }
    // 当左侧的数值都比右侧大，循环不会主动跳出，循环结束时 j 为 -1
    arr[j + 1] = value
  }
  return arr
}
```

## 选择排序

选择排序是一种简单直观的排序算法。它的工作原理是：第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。以此类推，直到全部待排序的数据元素的个数为零。

![selectionSort](img/selectionSort.gif)

```ts
const selectionSort = <T>(arr: T[]) => {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    const temp = arr[minIndex]
    arr[minIndex] = arr[i]
    arr[i] = temp
  }
  return arr
}
```
