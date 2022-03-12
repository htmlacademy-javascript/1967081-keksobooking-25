//module7-task1:
//как назвать нормально переменные пока не придумал
const template = document.querySelector('#card').content;
const templateArticle = template.querySelector('article');
const mapCanvas = document.querySelector('#map-canvas');
const TYPES = new Map([
  ['palace', 'Дворец'],
  ['flat', 'Квартира'],
  ['house', 'Дом'],
  ['bungalow', 'Бунгало'],
  ['hotel', 'Отель'],
]);

function addNewElement(announcement, block = mapCanvas) {
  const newArticle = templateArticle.cloneNode(true);
  const title = newArticle.querySelector('.popup__title');
  const adress = newArticle.querySelector('.popup__text--address');
  const price = newArticle.querySelector('.popup__text--price');
  const type = newArticle.querySelector('.popup__type');
  const roomsGuests = newArticle.querySelector('.popup__text--capacity');
  const checkinCheckout = newArticle.querySelector('.popup__text--time');
  const features = newArticle.querySelector('.popup__features');
  const description = newArticle.querySelector('.popup__description');
  const photos = newArticle.querySelector('.popup__photos');
  const avatar = newArticle.querySelector('.popup__avatar');
  const offer = announcement.offer;
  checkAddClassHiden(title, offer.title);
  title.textContent = offer.title;
  checkAddClassHiden(adress, offer.adress);
  adress.textContent = offer.adress;
  checkAddClassHiden(price, offer.price);
  price.textContent = `${offer.price} ₽/ночь`;
  checkAddClassHiden(type, offer.type);
  type.textContent = takeTypeRus(offer.type);
  if (offer.guests === '' && offer.rooms === '') {
    checkAddClassHiden(roomsGuests, '');
  }
  roomsGuests.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (offer.checkin === '' && offer.checkout === '') {
    checkAddClassHiden(checkinCheckout, '');
  }
  checkinCheckout.textContent = `Заезд после ${offer.checkin} , выезд до ${offer.checkout}`;
  checkAddClassHiden(offer.features, '', true);
  checkFeatures(features, offer.features);
  checkAddClassHiden(description, offer.description);
  description.textContent = offer.description;
  checkAddClassHiden(offer.photos, '', true);
  addPhotos(photos, offer.photos);
  checkAddClassHiden(avatar, announcement.author.avatar);
  avatar.src = announcement.author.avatar;
  block.appendChild(newArticle);

}

function addPhotos(photoTemplate, elems) {
  const photo = photoTemplate.querySelector('img');
  photo.remove();
  for (let i=0; i<elems.length; i++) {
    const newPhoto = photo.cloneNode(true);
    newPhoto.src = elems[i].src;
    photoTemplate.appendChild(newPhoto);
  }
}

//module7-task1:
//замудрёно, возможно стоило сделать через MAP
function checkFeatures(allFeatures, announcementFeatures) {
  const liList = allFeatures.children;
  for (let i=liList.length-1; i>=0; i--) {
    const className = liList[i].className;
    if (!findFeatures(announcementFeatures, className)) {
      liList[i].remove();
    }
  }
}

function findFeatures(elems, className) {
  let isFind = false;
  for (let i=0; i<elems.length; i++) {
    const element = elems[i];
    if (className.indexOf(element) >=0){
      isFind = true;
    }
  }
  return isFind;
}

function takeTypeRus(elem) {
  if (elem.textContent !== '') {
    return TYPES[elem.textContent];
  }
}

function checkAddClassHiden(elem, textContent, isArray = false) {

  if (!isArray && textContent === '') {
    elem.classList.add('hidden');
  }

  if (isArray && !elem.length) {
    elem.classList.add('hidden');
  }
}

export {addNewElement};
