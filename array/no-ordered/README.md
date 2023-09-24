## No ordered array

### Efficiency
|  Operation | Number of iterations | Number of it. without dublicates |
|---|---|---|
|find|N/2|N/2|
|insert|1|N + 1|
|delete|N/2 (find) + N/2 (move)|N/2 (find) + N/2 (move)|

### Features of an unsorted array
1) very simple algoritms
2) fast insert (slow without dublicates)
3) slow find


### Summary
Insert is very fast, but because duplicates are not allowed, insertion takes a long time.

## How to use
open index.html and open web developer console

make sure that browser will stop code execution on breakpoints


run in console:
```
const array = new Array(number); // create array
array.push(element); // insert element
array.delete(element); // delete element
array.findIndex(element); // find index of the element
```