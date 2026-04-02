function getRandomOf(min, max) {
  if (typeof min === "number" && typeof max === "number")
    return Math.floor(Math.random() * (max - min)) + min;

  return -1;
}

console.log(getRandomOf(0, 10));
console.log(getRandomOf(1));
console.log(getRandomOf('a', 'z'));
