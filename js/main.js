// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from './utils.js';
import {getRandomFeatures, getPhotos, getAvatarUrl, getOfferTitle, getDescription} from './ads.js';
import {addNewElement} from './templates.js';
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LAT_DIGITS = 5;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LNG_DIGITS = 5;

function createAnnouncements(amount=10) {
  const elems = [];
  for (let i = 0; i < amount; i++){
    const newAnnouncement = {};
    newAnnouncement.author = {};
    newAnnouncement.author.avatar = getAvatarUrl(i);
    newAnnouncement.offer = {};
    newAnnouncement.offer.title = getOfferTitle(i);
    newAnnouncement.offer.price = getRandomPositiveInteger (1, 200000);
    newAnnouncement.offer.type = getRandomArrayElement(TYPES);
    newAnnouncement.offer.rooms = getRandomPositiveInteger (1, 10);
    newAnnouncement.offer.guests = getRandomPositiveInteger (1, 30);
    newAnnouncement.offer.checkin = getRandomArrayElement(TIMES);
    newAnnouncement.offer.checkout = getRandomArrayElement(TIMES);
    newAnnouncement.offer.features = getRandomFeatures();
    newAnnouncement.offer.description = getDescription(i);
    newAnnouncement.offer.photos = getPhotos(3);
    newAnnouncement.location = {};
    newAnnouncement.location.lat = getRandomPositiveFloat(LAT_MIN, LAT_MAX, LAT_DIGITS);
    newAnnouncement.location.lng = getRandomPositiveFloat(LNG_MIN, LNG_MAX, LNG_DIGITS);
    newAnnouncement.offer.adress = `${newAnnouncement.location.lat}, ${newAnnouncement.location.lng}`;
    elems.push(newAnnouncement);
  }
  return elems;
}

//module7-task1:
//если делаю 1+ то не видно объявлений после первого
const announcements = createAnnouncements(2);
announcements.forEach((element) => {
  addNewElement(element);
});

