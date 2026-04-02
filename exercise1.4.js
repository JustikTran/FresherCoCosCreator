function getFileExtension(fileName) {

    if(
        typeof fileName !== 'string' ||
        !fileName
    ){
        return null;
    }

    const lastDot = fileName.lastIndexOf('.');

    if(lastDot === 0 || lastDot === fileName.length -1){
        return null;
    }

    return fileName.slice(lastDot + 1);
}


console.log(getFileExtension('image.png'));
console.log(getFileExtension('Sound.mp3'));
console.log(getFileExtension('exe1.4.js'));

console.log(getFileExtension(123));
console.log(getFileExtension('.env'));
console.log(getFileExtension('file.'));


