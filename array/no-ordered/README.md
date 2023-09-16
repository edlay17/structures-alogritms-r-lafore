## No ordered array without dublicates

### Efficiency
|  Operation | Number of iterations |
|---|---|
|find|N/2|
|insert|N + 1|
|delete|N/2 (find) + N/2 (move)|

### Features of an unsorted array
1) long insert (need to check dublicates)
2) slow find


### Summary
Because duplicates are not allowed, insertion takes a long time.

Due to the fact that there are no duplicates when searching, there is no need to check the entire array.

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