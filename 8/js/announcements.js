import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement } from './utils.js';
import { getRandomFeatures, getPhotos, getAvatarUrl, getOfferTitle, getDescription, getAdress } from './ads.js';

const TYPES = [ 'palace', 'flat', 'house', 'bungalow', 'hotel' ];
const TIMES = [ '12:00', '13:00', '14:00' ];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LAT_DIGITS = 5;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LNG_DIGITS = 5;
const MIN_PRICE = 1;
const MAX_PRICE = 200000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 30;
const PHOTOS_NUMBER = 3;

function createAnnouncements(amount) {
  const elems = [];
  for (let i = 0; i < amount; i++){
    const newAnnouncement = {};
    newAnnouncement.author = {};
    newAnnouncement.author.avatar = getAvatarUrl(i);
    newAnnouncement.offer = {};
    newAnnouncement.offer.title = getOfferTitle(i);
    newAnnouncement.offer.price = getRandomPositiveInteger (MIN_PRICE, MAX_PRICE);
    newAnnouncement.offer.type = getRandomArrayElement(TYPES);
    newAnnouncement.offer.rooms = getRandomPositiveInteger (MIN_ROOMS, MAX_ROOMS);
    newAnnouncement.offer.guests = getRandomPositiveInteger (MIN_GUESTS, MAX_GUESTS);
    newAnnouncement.offer.checkin = getRandomArrayElement(TIMES);
    newAnnouncement.offer.checkout = getRandomArrayElement(TIMES);
    newAnnouncement.offer.features = getRandomFeatures();
    newAnnouncement.offer.description = getDescription(i);
    newAnnouncement.offer.photos = getPhotos(PHOTOS_NUMBER);
    newAnnouncement.location = {};
    newAnnouncement.location.lat = getRandomPositiveFloat(LAT_MIN, LAT_MAX, LAT_DIGITS);
    newAnnouncement.location.lng = getRandomPositiveFloat(LNG_MIN, LNG_MAX, LNG_DIGITS);
    newAnnouncement.offer.adress = getAdress(newAnnouncement.location.lat, newAnnouncement.location.lng);
    elems.push(newAnnouncement);
  }
  return elems;
}

export { createAnnouncements };
