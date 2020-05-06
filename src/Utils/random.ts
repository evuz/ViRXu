export function random(max = 10, min = 0) {
  if (max < min) {
    throw Error('max must be greater than min');
  }
  const diff = max - min + 1;
  return Math.floor(Math.random() * diff) + min;
}
