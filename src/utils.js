'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getShuffledArray = (array) => {
  array = array.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

const getZeroPaddedNumber = (number, zeroCount) => {
  const helperNumber = 10 ** zeroCount;
  return number >= helperNumber
    ? number
    : `${helperNumber + number}`.slice(1);
};

module.exports = {
  getRandomInt,
  getShuffledArray,
  getZeroPaddedNumber,
};
