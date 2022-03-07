import {getRandomPositiveInteger} from './utils.js';

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10'];

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

function getOfferTitle(number) {
  return `Announcement №${number + 1}`;
}

function getDescription(number) {
  return DESCRIPTIONS[number];
}

export {getRandomFeatures, getRandomPhoto, getPhotos, getAvatarUrl, getOfferTitle, getDescription};

