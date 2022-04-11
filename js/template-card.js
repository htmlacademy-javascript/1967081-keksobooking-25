const types = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const roomsDeclination = {
  1: 'комната',
  2: 'комнаты',
  3: 'комнаты',
  4: 'комнаты',
  5: 'комнат',
  6: 'комнат',
  7: 'комнат',
  8: 'комнат',
  9: 'комнат',
  10: 'комнат',
};

const guestsDeclination = {
  1: '-ого гостя',
  2: '-ух гостей',
  3: '-ёх гостей',
  4: '-ёх гостей',
  5: '-и гостей',
  6: '-и гостей',
  7: '-и гостей',
  8: '-и гостей',
  9: '-и гостей',
  10: '-и гостей',
  11: '-и гостей',
  12: '-и гостей',
  13: '-и гостей',
  14: '-и гостей',
  15: '-и гостей',
  16: '-и гостей',
  17: '-и гостей',
  18: '-и гостей',
  19: '-и гостей',
  20: '-и гостей',
  21: '-ого гостя',
  22: '-ух гостей',
  23: '-ёх гостей',
  24: '-ёх гостей',
  25: '-и гостей',
  26: '-и гостей',
  27: '-и гостей',
  28: '-и гостей',
  29: '-и гостей',
  30: '-и гостей',
};

const getPrice = (price) => (
  `${price} ₽/ночь`
);

const getCheckinCheckout = (checkin, checkout) => (
  `Заезд после ${checkin} , выезд до ${checkout}`
);

const getRoomsGuests = (rooms, guests) => {
  const textRooms = roomsDeclination[rooms];
  const textGuests = guestsDeclination[guests];
  return  `${rooms} ${textRooms} для ${guests}${textGuests}`;
};

const getPhotos = (photoTemplate, elems) => {
  const photo = photoTemplate.querySelector('img');
  const photos = [];
  elems.forEach((elem) => {
    const newPhoto = photo.cloneNode(true);
    newPhoto.src = elem;
    photos.push(newPhoto);
  });
  return photos;
};

const addPhotosHtml = (photoTemplate, photos) => {
  photoTemplate.innerHTML = '';
  photos.forEach((elem) => photoTemplate.appendChild(elem));
};

const getFeatureClass = (feature) => (
  `popup__feature--${feature}`
);

const createFeatures = (offerFeatures) => {
  const features = [];
  offerFeatures.forEach((elem) => {
    const htmlLi = document.createElement('li');
    htmlLi.classList.add('popup__feature');
    const featureClass = getFeatureClass(elem);
    htmlLi.classList.add(featureClass);
    features.push(htmlLi);
  });
  return features;
};

const addFeatures = (popupFeatures, features) => {
  popupFeatures.innerHTML = '';
  features.forEach((elems) => popupFeatures.appendChild(elems));
};

const takeTypeRus = (elem) => {
  if (elem) {
    return types[elem];
  }
};

const createCard = (announcement) => {
  const template = document.querySelector('#card').content;
  const templateArticle = template.querySelector('article');
  const newArticle = templateArticle.cloneNode(true);
  const title = newArticle.querySelector('.popup__title');
  const adress = newArticle.querySelector('.popup__text--address');
  const price = newArticle.querySelector('.popup__text--price');
  const type = newArticle.querySelector('.popup__type');
  const roomsGuests = newArticle.querySelector('.popup__text--capacity');
  const checkinCheckout = newArticle.querySelector('.popup__text--time');
  const popupFeatures = newArticle.querySelector('.popup__features');
  const description = newArticle.querySelector('.popup__description');
  const popupPhotos = newArticle.querySelector('.popup__photos');
  const avatar = newArticle.querySelector('.popup__avatar');
  const offer = announcement.offer;
  const HIDDEN_CLASS = 'hidden';
  title.textContent = offer.title;
  adress.textContent = offer.adress;
  price.textContent = getPrice(offer.price);
  if (offer.type) {
    type.textContent = takeTypeRus(offer.type);
  } else {
    type.classList.add(HIDDEN_CLASS);
  }
  if (offer.rooms && offer.guests) {
    roomsGuests.textContent = getRoomsGuests(offer.rooms, offer.guests);
  } else {
    roomsGuests.classList.add(HIDDEN_CLASS);
  }
  if (offer.checkin && offer.checkout) {
    checkinCheckout.textContent = getCheckinCheckout(offer.checkin, offer.checkout);
  } else {
    checkinCheckout.classList.add(HIDDEN_CLASS);
  }
  if (offer.features && offer.features.length) {
    const features = createFeatures(offer.features);
    addFeatures(popupFeatures, features);
  } else {
    popupFeatures.classList.add(HIDDEN_CLASS);
  }
  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.classList.add(HIDDEN_CLASS);
  }
  if (offer.photos && offer.photos.length) {
    const photos = getPhotos(popupPhotos, offer.photos);
    addPhotosHtml(popupPhotos, photos);
  } else {
    popupPhotos.classList.add(HIDDEN_CLASS);
  }
  if (announcement.author.avatar) {
    avatar.src = announcement.author.avatar;
  } else {
    avatar.classList.add(HIDDEN_CLASS);
  }
  return newArticle;
};

export { createCard };
