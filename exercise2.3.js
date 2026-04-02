function getRandomOf(min, max) {
  if (typeof min === "number" && typeof max === "number")
    return Math.floor(Math.random() * (max - min)) + min;

  return -1;
}

function getRandomElementOf(arr) {
    if (arr.length === 0) {
        return arr;
    }
    const index = getRandomOf(0, arr.length);
    if(index === -1){
        return -1;
    }

    return arr[index];
}

console.log(getRandomElementOf([1,2,3,4,5,6]));
console.log(getRandomElementOf('abcdefgh'));

