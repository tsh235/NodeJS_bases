export const declOfNum = (num, words) =>
  num + ' ' + words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? Math.abs(num) % 10 : 5]];
