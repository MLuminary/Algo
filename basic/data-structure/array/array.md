# Js 中的数组

> 在计算机科学中，数组数据结构（英语：array data structure），简称数组（英语：Array），是由相同类型的元素（element）的集合所组成的数据结构，分配一块连续的内存来存储。利用元素的索引（index）可以计算出该元素对应的存储地址。 --- 维基百科

我们看到维基百科中定义的数组有两个关键点：**相同类型**、 **连续内存**。连续内存其实也就意味着固定的长度，因为如果不固定长度，那么内存中位于数组之后的区域也就没办法分配。

但在 Js 中不仅可以存放不同类型的元素，而且长度还是可变的。

## Js 数组的实现

Js 的数组为什么可以如此强大呢，我们去看一下 v8 的源码

```c++
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray : public JSObject {
```

可以看到其实 JSArray 是继承自 JSObject 的，因此当然可以存放不同的类型。通过注释我们也可以看到 JSArray 是有两种表现形式的，fast or slow。

fast 会申请大块的连续内存，来提高效率，以空间换时间。当空间造成大量浪费的时候就会转化为 slow 模式，以时间换空间，节省内存，但也相应的会让效率变慢。

新创建的空数组，采用默认的方式为 fast，数组的长度是可变的，可以根据元素的增加和删除动态来调整存储空间的大小，内部是通过扩容和收缩机制来实现的。

```c++
static const uint32_t kMinAddedElementsCapacity = 16;

// Computes the new capacity when expanding the elements of a JSObject.
static uint32_t NewElementsCapacity(uint32_t old_capacity) {
  // (old_capacity + 50%) + kMinAddedElementsCapacity
  return old_capacity + (old_capacity >> 1) + kMinAddedElementsCapacity;
}
```

从上面源码可以看出，扩容后的容量为之前容量的 1.5 倍 + 16，扩容后也会将数组拷贝到新的内存空间中去。

```c++
if (2 * length + JSObject::kMinAddedElementsCapacity <= capacity) {
  // If more than half the elements won't be used, trim the array.
  // Do not trim from short arrays to prevent frequent trimming on
  // repeated pop operations.
  // Leave some space to allow for subsequent push operations.
  int elements_to_trim = length + 1 == old_length
                              ? (capacity - length) / 2
                              : capacity - length;
  isolate->heap()->RightTrimFixedArray(*backing_store, elements_to_trim);
  // Fill the non-trimmed elements with holes.
  BackingStore::cast(*backing_store)
      ->FillWithHoles(length,
                      std::min(old_length, capacity - elements_to_trim));
}
```

当数组 `length * 2 + 16` 小于等于当前容量时，则会触发收缩，根据 `length + 1` 与 `old_length` 是否相等来调整收缩的大小。
