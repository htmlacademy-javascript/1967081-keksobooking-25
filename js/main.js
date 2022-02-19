// https://learn.javascript.ru/task/random-min-max
function randomIntegerMinMax(min, max) {
    let result;
    if (min < 0) {
        min = 0;
    }
    if (max < 0) {
        max = 0;
    }
    if (min < max) {
        let swap = max;
        max = min;
        min = swap;
    }

    result = min + Math.random() * (max - min);
    return Math.round(result);
}
randomIntegerMinMax(-1,3);

function randomFloatMinMax(min, max) {
    let result;
    if (min < 0) {
        min = 0;
    }
    if (max < 0) {
        max = 0;
    }
    if (min < max) {
        let swap = max;
        max = min;
        min = swap;
    }

    result = min + Math.random() * (max - min);
    return result;
}

randomFloatMinMax(-1.1,3.5);
