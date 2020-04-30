let isBigger = (a, b) => a > b;
let getDifference = (a, b) => isBigger(a, b) ? a - b : b - a;
getDifference(2, 5);