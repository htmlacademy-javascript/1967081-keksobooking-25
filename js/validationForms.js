import { sendDataToServer, showAlert } from './fetch.js';

const orderForm = document.querySelector('.ad-form');
const capacity = orderForm.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const title = orderForm.querySelector('#title');
const price = orderForm.querySelector('#price');
const type = orderForm.querySelector('#type');
const submitButton = document.querySelector('.ad-form__submit');
const MAX_PRICE = 100000;
const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
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

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    console.log(...(new FormData(evt.target).entries()));
    sendDataToServer(
      () => {
        unblockSubmitButton();
        orderForm.reset();
      },
      (message) => {
        showAlert(message);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

function initializeFormValidation() {
  pristine.addValidator(title, validateTitle, 'От 30 до 100 символов');
  pristine.addValidator(price, validatePrice, getPriceError);
  pristine.addValidator(capacity, validateRoomsAndGuests, getError);
  capacity.addEventListener('change', onGuestsChange);
  roomNumber.addEventListener('change', onGuestsChange);
  price.addEventListener('change', onPriceChange);
}

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

function validatePrice(value) {
  const minPrice = getMinPrice();
  return value >= minPrice && value <= MAX_PRICE;
}

function getPriceError() {
  const minPrice = getMinPrice();
  return `Цена от ${minPrice} до ${MAX_PRICE}`;
}

function getMinPrice() {
  switch (type.value) {
    case 'bungalow': return 0;
    case 'flat': return 1000;
    case 'hotel': return 3000;
    case 'house': return 5000;
    case 'palace': return 10000;
    default: throw new Error(`Unknown order state: '${type.value}'!`);
  }
}

function validateRoomsAndGuests() {

  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  return (guests.includes(guest));

}

function onPriceChange() {
  pristine.validate(price);
}

function onGuestsChange() {
  pristine.validate(capacity);
}

function getError() {
  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  if (!guests.includes(guest)) {
    return dictionaryErrorMessage[roomNumber.value];
  } else {
    return null;
  }
}

export { initializeFormValidation, onPriceChange };
