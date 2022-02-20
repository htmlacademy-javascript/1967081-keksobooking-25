/* eslint-disable require-jsdoc */
// https://learn.javascript.ru/task/random-min-max
function getRandomIntMinMax(min, max) {
  if (min < max) {
    const swap = max;
    max = min;
    min = swap;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
getRandomIntMinMax(-1, 3);

function getRandomFloatMinMax(min, max, digitsNumber) {
  if (min < max) {
    const swap = max;
    max = min;
    min = swap;
  }

  let result = min + Math.random() * (max + 1 - min);
  result = result.toFixed(digitsNumber);
  return result;
}
getRandomFloatMinMax(1, 3.5, 2);
