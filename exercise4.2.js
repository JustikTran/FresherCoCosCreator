function toReadNumber(number) {
  if (
    typeof number !== "number" ||
    Number.isNaN(number) ||
    !Number.isFinite(number)
  ) {
    return "Invalid number.";
  }

  let result = "";
  let larger = Math.floor(number / 10000);
  let smaller = number % 10000;

  if (larger > 0) {
    result += readGroup(larger, larger.toString().length) + " vạn ";
  }

  result += readGroup(smaller, 4);

  return `${result}.`;
}

function readGroup(number, digits = 4) {
  const numberRead = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
    "mười",
  ];  

  let result = "";
  if (number >= 1000) {
    result += `${numberRead[Math.floor(number / 1000)]} ngàn `;
    number = number % 1000;
  }else if (digits === 4) {
    result += `${numberRead[0]} ngàn `;
  }

  if (number >= 100) {
    result += `${numberRead[Math.floor(number / 100)]} trăm `;
    number = number % 100;
  }else if (digits === 4) {
    result += `${numberRead[0]} trăm `;
  }

  if (number < 100 && number >= 20) {
    result += `${numberRead[Math.floor(number / 10)]} mươi`;
    switch (number % 10) {
      case 0:
        break;
      case 5:
        result += ` lăm`;
        break;
      case 1:
        result += ` mốt`;
        break;
      default:
        result += ` ${numberRead[number % 10]}`;
        break;
    }
  } else if (number < 100 && number >= 10) {
    result += `${numberRead[10]}`;
    switch (number % 10) {
      case 5:
        result += ` lăm`;
        break;
      case 0:
        break;
      default:
        result += ` ${numberRead[number % 10]}`;
        break;
    }
  } else {
    result += ` linh ${numberRead[number]}`;
  }

  return result;
}

console.log(toReadNumber(736312));
console.log(toReadNumber(6052));
console.log(toReadNumber(120021));


