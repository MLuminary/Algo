# 查找

> 在计算机科学中定义为：在一些「有序的/无序的」数据元素中，通过一定的方法找出与给定关键字相同的数据元素的过程叫做查找。也就是根据给定的某个值，在查找表中确定一个关键字等于给定值的记录或数据元素。

## 二分查找

> 二分查找针对的是一个有序的数据集合，查找思想有点类似分治思想。每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0。

### 举个 :chestnut:

我们假设只有 10 个订单，订单金额分别是：8，11，19，23，27，33，45，55，67，98。利用二分思想，每次都与区间的中间数据比对大小，缩小查找区间的范围。为了更加直观，我画了一张查找过程的图。其中，low 和 high 表示待查找区间的下标，mid 表示待查找区间的中间元素下标。

![binarySearch](img/binarySearch.jpg)

### 简单实现

```ts
const binarySearch = (value: number) => {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((high + low) / 2)
    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] < value) {
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return -1
}
```

### 变体

二分查找的变形问题有很多，我们只选择一个典型的来记录：「查找第一个值等于给定值的元素」

```ts
const binarySearchFirst = (value: number) => {
  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((high + low) / 2)
    if (arr[mid] > value) {
      high = mid - 1
    } else if (arr[mid] < value) {
      low = mid + 1
    } else {
      if (mid === 0 || arr[mid - 1] !== value) {
        return mid
      } else {
        high = mid - 1
      }
    }
  }
}
```
