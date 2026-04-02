function factorial(number) {
  if (number <= 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

function combination(n, k) {
  if (!n) {
    return 0;
  }

  if (typeof k !== "number" || Number.isNaN(k) || !Number.isFinite(k)) {
    return -1;
  }

  if (k > n || k < 0) {
    return -1;
  }

  return factorial(n) / (factorial(k) * factorial(n - k));
}

console.log(combination(5, 3));
console.log(combination(0, 0));
console.log(combination(3, 5));
console.log(combination(5));
