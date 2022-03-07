// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from './utils.js';
import {getRandomFeatures, getPhotos, getAvatarUrl, getOfferTitle, getDescription} from './ads.js';
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LAT_DIGITS = 5;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LNG_DIGITS = 5;

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

createAnnouncements(10);
