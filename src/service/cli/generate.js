'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  getShuffledArray,
  getZeroPaddedNumber,
  readFileContent,
} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_NAME = `./data/sentences.txt`;
const FILE_TITLES_NAME = `./data/titles.txt`;
const FILE_CATEGORIES_NAME = `./data/categories.txt`;
const PictureRange = {
  MIN: 1,
  MAX: 16,
};
const SentenceRange = {
  MIN: 1,
  MAX: 5,
};
const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};
const SumRange = {
  MIN: 1000,
  MAX: 100000,
};


const generateOffer = (titles, sentences, categories) => {
  const title = titles[getRandomInt(0, titles.length - 1)];

  const picture = `item${
    getZeroPaddedNumber(getRandomInt(PictureRange.MIN, PictureRange.MAX), 2)
  }.jpg`;

  const description = getShuffledArray(sentences)
    .slice(0, getRandomInt(SentenceRange.MIN, SentenceRange.MAX))
    .join(` `);

  const type = Math.random() > 0.5 ? OfferType.OFFER : OfferType.SALE;

  const sum = getRandomInt(SumRange.MIN, SumRange.MAX);

  const category = getShuffledArray(categories)
      .slice(0, getRandomInt(1, categories.length - 1));

  return {
    title,
    picture,
    description,
    type,
    sum,
    category,
  };
};

const generateOffers = (count, titles, sentences, categories) => {
  return Array(count)
    .fill({})
    .map(() => generateOffer(
        titles,
        sentences,
        categories
    ));
};


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (offersCount > MAX_COUNT || offersCount < DEFAULT_COUNT) {
      console.error(chalk.red(`Генерируется не менее 1, но не более 1000 объявлений.`));
      process.exit(ExitCode.error);
    }

    const [
      titles,
      sentences,
      categories,
    ] = await Promise.all([
      readFileContent(FILE_TITLES_NAME),
      readFileContent(FILE_SENTENCES_NAME),
      readFileContent(FILE_CATEGORIES_NAME),
    ]);

    const offers = generateOffers(offersCount, titles, sentences, categories);

    const content = JSON.stringify(offers);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Файл с моковыми данными успешно создан!`));
    } catch (err) {
      console.error(chalk.red(`Невозможно записать данные в файл!`));
    }
  },
};
