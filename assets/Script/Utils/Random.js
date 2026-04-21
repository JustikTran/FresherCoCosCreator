export function RandomPosition(minX, maxX, minY, maxY) {
  return {
    x: randomRange(minX, maxX),
    y: randomRange(minY, maxY),
  };
}

export function RandomIndex(param) {
  return Math.floor(randomRange(0, param));
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
