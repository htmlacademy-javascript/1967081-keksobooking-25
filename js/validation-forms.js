import { NO_PHOTO_IMG } from './avatar.js';
import { sendDataToServer } from './fetch.js';
import { activateAds, createIconStartLocation, initializateTitleLayer } from './map.js';
import { MAX_PRICE } from './slider.js';

const TEXT_ERROR_SEND_DATA = 'Ошибка размещения объявления!';
const HIDDEN_CLASS = 'hidden';
const orderForm = document.querySelector('.ad-form');
const resetButton = document.querySelector('.ad-form__reset');
const filtersForm = document.querySelector('.map__filters');
const capacity = orderForm.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const title = orderForm.querySelector('#title');
const price = orderForm.querySelector('#price');
const type = orderForm.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const dictionaryRoomsAndGuests = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const dictionaryErrorMessage = {
  '1': 'Максимум гостей: 1',
  '2': 'Максимум гостей: 2',
  '3': 'Максимум гостей: 3',
  '100': 'Не для гостей',
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onGuestsChange = () => {
  pristine.validate(capacity);
};

const onPriceChange = () => {
  pristine.validate(price);
};

const clearAvatarAndPhotos = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const adsPreview = document.querySelector('.ad-form__photo img');
  avatarPreview.src = NO_PHOTO_IMG;
  adsPreview.src = NO_PHOTO_IMG;
};

const hideElement = (elem) => {
  elem.classList.add(HIDDEN_CLASS);
};

const validateTitle = (value) => (
  value.length >= 30 && value.length <= 100
);

const getError = () => {
  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  if (!guests.includes(guest)) {
    return dictionaryErrorMessage[roomNumber.value];
  }
  return null;
};

const getMinPrice = () => {
  switch (type.value) {
    case 'bungalow': return 0;
    case 'flat': return 1000;
    case 'hotel': return 3000;
    case 'house': return 5000;
    case 'palace': return 10000;
    default: throw new Error(`Unknown order state: '${type.value}'!`);
  }
};

const validateRoomsAndGuests = () => {

  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  return (guests.includes(guest));

};

const validatePrice = (value) => {
  const minPrice = getMinPrice();
  return value >= minPrice && value <= MAX_PRICE;
};

const getPriceError = () => {
  const minPrice = getMinPrice();
  return `Цена от ${minPrice} до ${MAX_PRICE}`;
};

const onTypeChange = () => {
  const minPrice = getMinPrice();
  price.setAttribute('placeholder', minPrice);
};

const resetForms = () => {
  orderForm.reset();
  filtersForm.reset();
  createIconStartLocation();
  price.value = Number(price.getAttribute('placeholder'));
  clearAvatarAndPhotos();
};

const createTemplateSuccessMessage = () => {
  const successMessage = templateSuccess.cloneNode(true);
  const divSuccess = successMessage.querySelector('div');
  divSuccess.classList.add(HIDDEN_CLASS);
  hideElement(divSuccess);
  document.body.append(divSuccess);
};

const createTemplateErrorMessage = () => {
  const errorMessage = templateError.cloneNode(true);
  const errorDiv = errorMessage.querySelector('div');
  const errorButton = errorMessage.querySelector('button');
  hideElement(errorDiv);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    onErrorMessageHide();
  });
  document.body.append(errorMessage);
};

const createTemplateMessages = () => {
  createTemplateSuccessMessage();
  createTemplateErrorMessage();
};

const removeErrorMesageListeners = () => {
  document.removeEventListener('click', onErrorMessageHide);
  document.removeEventListener('keydown', onErrorMessageKeydown);
};

const removeSuccessMesageListeners = () => {
  document.removeEventListener('click', onDivSuccesHide);
  document.removeEventListener('keydown', onDivSuccesKeydown);
};

function onDivSuccesHide() {
  const divSuccess = document.querySelector('.success');
  hideElement(divSuccess);
  removeSuccessMesageListeners();
}

function onDivSuccesKeydown(key) {
  const divSuccess = document.querySelector('.success');
  if (key.code === 'Escape') {
    hideElement(divSuccess);
    removeSuccessMesageListeners();
  }
}

function onErrorMessageHide() {
  const errorMessage = document.querySelector('.error');
  hideElement(errorMessage);
  removeErrorMesageListeners();
}

function onErrorMessageKeydown(key) {
  const divSuccess = document.querySelector('.error');
  if (key.code === 'Escape') {
    hideElement(divSuccess);
    removeErrorMesageListeners();
  }
}

const showSuccessMessage = () => {
  const divSuccess = document.querySelector('.success');
  divSuccess.classList.remove(HIDDEN_CLASS);
  document.addEventListener('click', onDivSuccesHide);
  document.addEventListener('keydown', onDivSuccesKeydown);
};

const showErrorMessage = (message) => {
  const errorDiv = document.querySelector('.error');
  const errorText = document.querySelector('.error__message');
  errorText.textContent = message;
  errorDiv.classList.remove(HIDDEN_CLASS);
  document.addEventListener('click', onErrorMessageHide);
  document.addEventListener('keydown', onErrorMessageKeydown);
};

const onError = (message) => {
  showErrorMessage(message);
  activateAds();
  initializateTitleLayer();
  createIconStartLocation();
};

const onSendDataToServerSuccess = () => {
  unblockSubmitButton();
  resetForms();
  showSuccessMessage();
};

const onSendDataToServerFail = () => {
  showErrorMessage(TEXT_ERROR_SEND_DATA);
  unblockSubmitButton();
};

const onSubmitValidForm = (evt) => {
  blockSubmitButton();
  sendDataToServer(
    () => {
      onSendDataToServerSuccess();
    },
    () => {
      onSendDataToServerFail();
    },
    new FormData(evt.target),
  );
};

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    onSubmitValidForm(evt);
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});


const initializeFormValidation = () => {
  pristine.addValidator(title, validateTitle, 'От 30 до 100 символов');
  pristine.addValidator(price, validatePrice, getPriceError);
  pristine.addValidator(capacity, validateRoomsAndGuests, getError);
  capacity.addEventListener('change', onGuestsChange);
  roomNumber.addEventListener('change', onGuestsChange);
  price.addEventListener('change', onPriceChange);
  type.addEventListener('change', onTypeChange);
};

export { initializeFormValidation, onPriceChange, showErrorMessage, createTemplateMessages, MAX_PRICE, onError };
