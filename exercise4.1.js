function toRoman(number) {
  if (!number || typeof number !== "number") {
    return null;
  }

  const romanNumbers = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";

  for(const [value, symbol] of romanNumbers){
    while (number >= value) {
        result += symbol;
        number -= value;
    }
  }

  return result;
}


console.log(toRoman(2026));
console.log(toRoman(1943));
console.log(toRoman(NaN));
console.log(toRoman());



