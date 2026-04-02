function findNotExist(arr1, arr2) {
    const arr = new Set(arr1);
    return arr2.filter(x => !arr.has(x));
}

console.log(findNotExist([1,2,3,2,1,3], [1,2,3,4,5,3,2,6,4]));
console.log(findNotExist([], []));
console.log(findNotExist([1,2,3], []));


