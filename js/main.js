/* eslint-disable require-jsdoc */
// https://learn.javascript.ru/task/random-min-max
function getRandomIntMinMax(min, max) {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }
  if (min < max) {
    const swap = max;
    max = min;
    min = swap;
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
getRandomIntMinMax(-1, 3);

function getRandomFloatMinMax(min, max, decimalPlaces) {
  if (min < 0) {
    min = 0;
  }
  if (max < 0) {
    max = 0;
  }
  if (min < max) {
    const swap = max;
    max = min;
    min = swap;
  }

  if (typeof (decimalPlaces) == 'undefined') {
    decimalPlaces = 2;
  }
  let result = min + Math.random() * (max + 1 - min);
  result = result.toFixed(decimalPlaces);
  return result;
}
getRandomFloatMinMax(1, 3.5, 2);
