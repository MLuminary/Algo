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

## 方法

Js 的数组提供了非常多的方法，我们这里将其分为三类：改变原数组、不改变原数组、遍历数组的方法。

### 改变原数组

**splice**

定义：通过删除或替换现有元素或者原地添加新的元素来修改数组, 并以数组形式返回被修改的内容。

参数：

- start： 指定修改开始的位置
- deleteCount?： 移除元素的个数「含 start 位」
- item1, item2...?： 向数组添加的新元素

返回值： 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

**sort**

定义： 用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的

参数：

- compareFunction?： 用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的 Unicode 位点进行排序。
  - firstEl： 第一个用于比较的元素。
  - secondEl： 第二个用于比较的元素。

返回值： 排序后的数组。请注意，数组已原地排序，并且不进行复制。

**pop**

定义： 方法从数组中删除最后一个元素，并返回该元素的值，当数组为空时返回 undefined。

**shift**

定义： 从数组中删除第一个元素，并返回该元素的值。

**push**

定义： 方法可向数组的末尾添加一个或多个元素，并返回该数组的新长度。

**unshift**

定义： 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度。

**reverse**

定义： 方法将数组中元素的位置颠倒，并返回该数组。

**copyWithin**

定义： 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度

参数：

- target： 复制序列到该位置
- start?： 开始复制元素的起始位置，若忽略则从 0 开始
- end?： 复制元素的结束位置「但不包括」，若忽略则为 arr.length

返回值： 改变后的数组

**fill**

定义： 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

参数：

- value： 用来填充数组元素的值
- start?： 起始索引，默认为 0
- end?： 终止索引，默认为 arr.length

返回值： 修改后的数组

### 不改变原数组

下面的这些方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。

**concat**

定义：方法用于合并两个或多个数组

```js
const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f']
const array3 = array1.concat(array2)

console.log(array3)
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

**includes**

定义：方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

参数：

- value: 需要查找的元素
- fromIndex?: 从 fromIndex 开始查找。 默认为 0

返回值：true or false

**join**

定义：方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```js
const elements = ['Fire', 'Air', 'Water']

console.log(elements.join())
// expected output: "Fire,Air,Water"

console.log(elements.join(''))
// expected output: "FireAirWater"

console.log(elements.join('-'))
// expected output: "Fire-Air-Water"
```

**slice**

定义：方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括 end）

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

console.log(animals.slice(2))
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4))
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5))
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

**toString**

定义：返回一个字符串，表示指定的数组及其元素

```js
const array1 = [1, 2, 'a', '1a']

console.log(array1.toString())
// expected output: "1,2,a,1a"
```

**toLocaleString**

定义：返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。[详细说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)

参数：

- locales?：带有 BCP 47 语言标记的字符串或字符串数组
- options?：一个可配置属性的对象

```js
var prices = ['￥7', 500, 8123, 12]
prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })

// "￥7,￥500,￥8,123,￥12"
```

**indexOf**

定义：方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1。

参数：

- searchElement: 想要查找的元素
- fromIndex?: 开始搜寻的索引位置

**lastIndexOf**

定义：lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找。

参数：

- searchElement: 想要查找的元素
- fromIndex?: 开始逆向搜寻的索引位置

### 遍历方法

在下面的众多遍历方法中，有很多方法都需要指定一个回调函数作为参数。在每一个数组元素都分别执行完回调函数之前，数组的 length 属性会被缓存在某个地方，所以，**如果你在回调函数中为当前数组添加了新的元素，那么那些新添加的元素是不会被遍历到的**。此外，如果在回调函数中对当前数组进行了其它修改，比如改变某个元素的值或者删掉某个元素，那么随后的遍历操作可能会受到未预期的影响。总之，**不要尝试在遍历过程中对原数组进行任何修改**，虽然规范对这样的操作进行了详细的定义，但为了可读性和可维护性，请不要这样做。

**forEach**

定义：数组的每个元素执行一次给定的函数。

tips: 除了抛出异常以外，没有办法中止或跳出 `forEach` 循环。如果你需要中止或跳出循环，`forEach` 方法不是应当使用的工具。

**entries**

定义：方法返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的键/值对。

```js
const array1 = ['a', 'b', 'c']

const iterator1 = array1.entries()

console.log(iterator1.next().value)
// expected output: Array [0, "a"]

console.log(iterator1.next().value)
// expected output: Array [1, "b"]
```

**every**

定义：方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```js
const isBelowThreshold = (currentValue) => currentValue < 40

const array1 = [1, 30, 39, 29, 10, 13]

console.log(array1.every(isBelowThreshold))
// expected output: true
```

**some**

定义：方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

```js
const array = [1, 2, 3, 4, 5]

// checks whether an element is even
const even = (element) => element % 2 === 0

console.log(array.some(even))
// expected output: true
```

**filter**

定义：方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']

const result = words.filter((word) => word.length > 6)

console.log(result)
// expected output: Array ["exuberant", "destruction", "present"]
```

**find**

定义：方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```js
const array1 = [5, 12, 8, 130, 44]

const found = array1.find((element) => element > 10)

console.log(found)
// expected output: 12
```

**findIndex**

定义：方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

```js
const array1 = [5, 12, 8, 130, 44]

const isLargeNumber = (element) => element > 13

console.log(array1.findIndex(isLargeNumber))
// expected output: 3
```

**keys**

定义：方法返回一个包含数组中每个索引键的 Array Iterator 对象，该迭代器会包含所有数组元素的键。

```js
const array1 = ['a', 'b', 'c']
const iterator = array1.keys()

for (const key of iterator) {
  console.log(key)
}

// expected output: 0
// expected output: 1
// expected output: 2
```

**map**

定义：方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```js
const array1 = [1, 4, 9, 16]

// pass a function to map
const map1 = array1.map((x) => x * 2)

console.log(map1)
// expected output: Array [2, 8, 18, 32]
```

**reduce**

定义：方法对数组中的每个元素执行一个由您提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。

参数：

- callback: 执行数组中每个值 (如果没有提供 initialValue 则第一个值除外)的函数
  - accumulator: 累计器累计回调的返回值 它是上一次调用回调时返回的累积值，或 initialValue（见于下方）。
  - currentValue: 数组中正在处理的元素。
  - index?: 数组中正在处理的当前元素的索引。 如果提供了 initialValue，则起始索引号为 0，否则从索引 1 起始。
  - array?: 调用 reduce() 的数组
- initialValue?: 作为第一次调用 callback 函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 **在没有初始值的空数组上调用 reduce 将报错**

返回值：函数累计处理的结果

```js
const array1 = [1, 2, 3, 4]
const reducer = (accumulator, currentValue) => accumulator + currentValue

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer))
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5))
// expected output: 15
```

**reduceRight**

定义：方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

**values**

定义：方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

```js
const array1 = ['a', 'b', 'c']
const iterator = array1.values()

for (const value of iterator) {
  console.log(value)
}

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
