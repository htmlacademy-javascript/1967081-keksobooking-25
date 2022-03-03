// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat (a, b, digits = 2) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return Number(result.toFixed(digits));
}

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10'];
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LAT_DIGITS = 5;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LNG_DIGITS = 5;

function getRandomFeatures() {
  const randomFeatures = [];
  const quantity = getRandomPositiveInteger(1,FEATURES.length);
  const tempFeatures = FEATURES.slice();
  for (let i = quantity; i >= 1; i--) {
    const indexTempFeatures = getRandomPositiveInteger(0,tempFeatures.length-1);
    randomFeatures.push(tempFeatures[indexTempFeatures]);
    tempFeatures.splice(indexTempFeatures,1);
  }
  return randomFeatures;
}

function getRandomPhoto(number) {
  return `https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/${number}jpg`;
}


function getPhotos(quantity) {
  const randomPhotos = [];
  for (let i = 1; i <= quantity; i++){
    randomPhotos.push(getRandomPhoto(i));
  }
  return randomPhotos;
}

function getAvatarUrl(number) {
  const numberText = (number + 1 < 10) ? `0${number + 1}` : `${number + 1}`;
  return `img/avatars/user${numberText}.png`;
}

function getRandomArrayElement(objArray) {
  return objArray[getRandomPositiveInteger (0, objArray.length-1)];
}

function getOfferTitle(number) {
  return `Announcement №${number + 1}`;
}

function getDescription(number) {
  return DESCRIPTIONS[number];
}

function createAnnouncements(amount=10) {
  const announcements = [];
  for (let i = 0; i < amount; i++){
    const newAnnouncement = {};
    newAnnouncement.author = {};
    newAnnouncement.author.avatar = getAvatarUrl(i);
    newAnnouncement.offer = {};
    newAnnouncement.offer.title = getOfferTitle(i);
    newAnnouncement.location = {};
    newAnnouncement.location.lat = getRandomPositiveFloat(LAT_MIN, LAT_MAX, LAT_DIGITS);
    newAnnouncement.location.lng = getRandomPositiveFloat(LNG_MIN, LNG_MAX, LNG_DIGITS);
    newAnnouncement.price = getRandomPositiveInteger (1, 200000);
    newAnnouncement.type = getRandomArrayElement(TYPES);
    newAnnouncement.rooms = getRandomPositiveInteger (1, 10);
    newAnnouncement.guests = getRandomPositiveInteger (1, 30);
    newAnnouncement.checkin = getRandomArrayElement(TIMES);
    newAnnouncement.checkout = getRandomArrayElement(TIMES);
    newAnnouncement.features = getRandomFeatures();
    newAnnouncement.description = getDescription(i);
    newAnnouncement.photos = getPhotos(3);
    announcements.push(newAnnouncement);
  }
  return announcements;
}

console.log(createAnnouncements(10));
