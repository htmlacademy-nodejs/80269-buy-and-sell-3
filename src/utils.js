'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;


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

const readFileContent = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, `utf8`);
    return fileContent.split(`\n`)
      .map((it) => it.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  getRandomInt,
  getShuffledArray,
  getZeroPaddedNumber,
  readFileContent,
};
