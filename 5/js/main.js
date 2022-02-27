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

  return +result.toFixed(digits);
}

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10'];

function getRandomFeatures(){
  const randomFeatures = [];
  for (let i = 1; i<=7; i++){
    const index = getRandomPositiveInteger(0,5);
    const elem = features[index];
    if (!randomFeatures.includes(elem)){
      randomFeatures.push(elem);
    }
  }
  return randomFeatures;
}

function getPhotos(a, b){
  const randomPhotos = [];
  for (let i=a; i<=b; i++){
    randomPhotos.push(`https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/.${i}jpg`);
  }
  return randomPhotos;
}

function createObjects(amount=10) {
  const announcements = [];
  for (let i=0; i<amount; i++){
    const newAnnouncement = {};
    //author
    newAnnouncement.author = {};
    const number = (i+1<10) ? `0${i+1}` : `${i+1}`;
    //author.avatar
    newAnnouncement.author.avatar = `img/avatars/user${number}.png`;
    //offer
    newAnnouncement.offer = {};
    //offer.title
    //возможно добавить выбор из структуры по индексу
    newAnnouncement.offer.title = `Announcement №${i+1}`;
    //location
    newAnnouncement.location = {};
    //location.lat
    newAnnouncement.location.lat = getRandomPositiveFloat(35.65000,35.70000,5);
    //location.lng
    newAnnouncement.location.lng = getRandomPositiveFloat(139.70000,139.80000,5);
    //price
    newAnnouncement.price = getRandomPositiveInteger (1, 200000);
    //type
    newAnnouncement.type = types[getRandomPositiveInteger (0, 4)];
    //rooms
    newAnnouncement.rooms = getRandomPositiveInteger (1, 10);
    //guests
    newAnnouncement.guests = getRandomPositiveInteger (1, 30);
    //checkin
    newAnnouncement.checkin = times[getRandomPositiveInteger (0, 2)];
    //checkout
    newAnnouncement.checkout = times[getRandomPositiveInteger (0, 2)];
    //features
    newAnnouncement.features = getRandomFeatures();
    //description
    newAnnouncement.description = descriptions[i];
    //photos
    newAnnouncement.photos = getPhotos();
    announcements.push(newAnnouncement);
  }
  return announcements;
}

createObjects(10);
