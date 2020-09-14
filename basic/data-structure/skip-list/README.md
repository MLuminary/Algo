# 跳表

> 链表加多级索引的结构，就是跳表、

- 时间复杂度 O(logN)
- 空间复杂度 O(n)

普通的链表查找的复杂度为 O(n), 插入和删除因为都需要先查找到先前的结点，虽然本身操作的复杂度为 O(1)，但算上查找的复杂度其实最后都为 O(n)。那怎么来提高链表的查找效率呢？

我们对链表建立一层索引，没两个结点提取一个一个结点到上一级，我们把抽出来的那一层叫「索引层」，down 指针指向下一个结点

![skipList](img/skipList.jpg)

假如我们要查找 16，我们可以先从索引层开始遍历，当遍历到 13 时，我们发现下一个结点为 17，则 16 肯定在这两个结点之间。然后我们通过索引层的 down 指针下降到原始层，继续遍历。这时我们只需要再遍历两个结点就可以找到 16 了。原来需要遍历 10 个结点，而现在只需要遍历 7 次就可以了。

因此我们可以看到，我们加了一层索引之后，查找一个结点需要遍历的次数变少了，也就是查找效率变高了，那我们再加几层呢？

![skipList2](img/skipList2.jpg)

可以看到，原来没有索引时，查找 62 需要遍历 62 个结点，而现在只需要遍历 11 个结点。

## Tips

虽然空间复杂度是 O(n)，但是在实际工作中，我们要排序的都是数据量很多的对象，而我们建立索引时只需要少量排序需要的数据即可，这部分空间与对象占用的空间相比其实很多情况下都是可以忽略不计的了。

### 跳表索引动态更新

当我们不停地往跳表中插入数据时，如果我们不更新索引，就有可能出现某两个索引结点之间数据非常多的情况。极端情况下，跳表还会退化成单链表

![skipList3](img/skipList3.jpg)

作为一种动态数据结构，我们需要某种手段来维护索引与原始链表大小之间的平衡，也就是说，如果链表中结点多了，索引结点就相应地增加一些，避免复杂度退化，以及查找、插入、删除操作性能下降。

## 代码

```ts

```
