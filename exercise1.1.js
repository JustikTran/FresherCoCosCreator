function toLocaleString(amount) {
  if (
    typeof amount !== "number" ||
    Number.isNaN(amount) ||
    !Number.isFinite(amount)
  ) {
    return null;
  }

  let [int, decimal] = amount.toString().split(".");
  
  let result = '';

  while (int.length > 3) {
    result = ',' + int.slice(-3) + result;
    int = int.slice(0, -3);
  }

 return int + result + (decimal ? `.${decimal}` : '');
}

console.log(toLocaleString(1000000000));
console.log(toLocaleString(99999.9999));

console.log(toLocaleString(NaN));
console.log(toLocaleString());
console.log(toLocaleString(undefined));




