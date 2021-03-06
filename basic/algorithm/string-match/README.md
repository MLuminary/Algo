# 字符串匹配

## BF

BF 算法，即暴力「Brute Force」算法，是普通的模式匹配算法，BF 算法的思想就是将目标串 S 的第一个字符与模式串 T 的第一个字符进行匹配，若相等，则继续比较 S 的第二个字符和 T 的第二个字符；若不相等，则比较 S 的第二个字符和 T 的第一个字符，依次比较下去，直到得出最后的匹配结果。BF 算法是一种蛮力算法。

## RK

RK 算法是由 Rabin 和 Karp 共同提出的一个算法。
RK 算法是对 BF 算法的一个改进：在 BF 算法中，每一个字符都需要进行比较，并且当我们发现首字符匹配时仍然需要比较剩余的所有字符。而在 RK 算法中，就尝试只进行一次比较来判定两者是否相等，即使用哈希比较，如果两个字符串 hash 后的值不相同，则它们肯定不相同；如果它们 hash 后的值相同，则判断为相同。如果存在哈希冲突的话则需要将相同的字符串都记录下来，然后之后再暴力比较。

## KMP

http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

## BM

https://www.ruanyifeng.com/blog/2013/05/boyer-moore_string_search_algorithm.html
