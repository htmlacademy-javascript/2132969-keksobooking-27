import {
  randomNumber,
  randomNumberWithComma,
  formatNumber
} from './math.js';

const TITLES = ['Тайтл первый', 'Тайтл второй', 'Тайтл третий'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Описание первое', 'Описание второе', 'Описание третее'];
const PHOTOS = [];

const mockTest = (_, index) => {
  const LAT = randomNumberWithComma(35.65000, 35.70000, 5);
  const LNG = randomNumberWithComma(139.70000, 139.80000, 5);
  return ({
    author: {
      avatar: `img/avatars/user${formatNumber(index + 1)}.png`
    },
    offer: {
      title: TITLES[randomNumber(0, TITLES.length - 1)],
      address: `${LAT} ${LNG}`,
      price: randomNumber(1, 10000),
      type: TYPES[randomNumber(0, TYPES.length - 1)],
      rooms: randomNumber(1, 4),
      guests: randomNumber(1, 6),
      checkin: CHECKIN[randomNumber(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[randomNumber(0, CHECKOUT.length - 1)],
      features: FEATURES.slice(0,`${randomNumber(1, FEATURES.length)}`),
      description: DESCRIPTIONS[randomNumber(0, DESCRIPTIONS.length - 1)],
      photos: PHOTOS.slice(0, `${randomNumber(1, PHOTOS.length)}`),
    },
    location: {
      lat: LAT,
      lng: LNG
    }
  });
};

const createRandomArray = () => Array.from({length: 10}, mockTest);
createRandomArray();

export {createRandomArray};
