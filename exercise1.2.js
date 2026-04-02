function getDecimal(amount) {
    return Math.floor(amount * 100) / 100;
}

function toShortenString(amount){
    if(
        typeof amount !== 'number' ||
        Number.isNaN(amount) || 
        !Number.isFinite(amount)
    ){
        return null;
    }

    if(amount >= 1_000_000_000){
        return getDecimal(amount / 1e9) + 'B';
    }

    if(amount >= 1_000_000){
        return getDecimal(amount / 1e6) + 'M';
    }

    if(amount >= 1_000){
        return getDecimal(amount / 1e3) + 'K';
    }

    return amount;
}

console.log(toShortenString(99999));
console.log(toShortenString(123456789));
console.log(toShortenString(10000000000));


console.log(toShortenString(NaN));
console.log(toShortenString());
console.log(toShortenString(undefined));


