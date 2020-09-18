'use strict';

const fs = require(`fs`);
const {
  getRandomInt,
  getShuffledArray,
  getZeroPaddedNumber,
} = require(`../../utils`);


const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

const FILE_NAME = `mocks.json`;

const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];

const PictureRange = {
  MIN: 1,
  MAX: 16,
};

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];

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

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const generateOffer = () => {
  const title = TITLES[getRandomInt(0, TITLES.length - 1)];

  const picture = `item${
    getZeroPaddedNumber(getRandomInt(PictureRange.MIN, PictureRange.MAX), 2)
  }.jpg`;

  const description = getShuffledArray(SENTENCES)
    .slice(0, getRandomInt(SentenceRange.MIN, SentenceRange.MAX))
    .join(` `);

  const type = Math.random() > 0.5 ? OfferType.OFFER : OfferType.SALE;

  const sum = getRandomInt(SumRange.MIN, SumRange.MAX);

  const category = getShuffledArray(CATEGORIES)
      .slice(0, getRandomInt(1, CATEGORIES.length - 1));

  return {
    title,
    picture,
    description,
    type,
    sum,
    category,
  };
};


module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const offersCount = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (offersCount > 1000 || offersCount < 1) {
      console.error(`Генерируется не менее 1, но не более 1000 объявлений.`);
      process.exit(1);
    }

    const offers = Array(offersCount)
      .fill({})
      .map(generateOffer);
    const content = JSON.stringify(offers);

    console.log(offers);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Невозможно записать данные в файл!`);
      }

      console.info(`Файл с моковыми данными успешно создан!`);
    });
  },
};
