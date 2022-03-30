import { sendDataToServer } from './fetch.js';

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
const MAX_PRICE = 100000;
const TEXT_ERROR_SEND_DATA = 'Ошибка размещения объявления!';
const HIDDEN_CLASS = 'hidden';
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

function resetForms() {
  orderForm.reset();
  filtersForm.reset();
}

function hideElement(elem) {
  elem.classList.add(HIDDEN_CLASS);
}

function createTemplateSuccessMessage() {
  const successMessage = templateSuccess.cloneNode(true);
  const divSuccess = successMessage.querySelector('div');
  document.addEventListener('click', () => {
    hideElement(divSuccess);
  });
  document.addEventListener('keydown', () => {
    hideElement(divSuccess);
  });
  divSuccess.classList.add(HIDDEN_CLASS);
  hideElement(divSuccess);
  document.body.append(divSuccess);
}

function createTemplateErrorMessage() {
  const errorMessage = templateError.cloneNode(true);
  const errorDiv = errorMessage.querySelector('div');
  const errorButton = errorMessage.querySelector('button');
  document.addEventListener('click', () => {
    hideElement(errorDiv);
  });
  document.addEventListener('keydown', () => {
    hideElement(errorDiv);
  });
  hideElement(errorDiv);
  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideElement(errorDiv);
  });
  document.body.append(errorMessage);
}

function createTemplateMessages() {
  createTemplateSuccessMessage();
  createTemplateErrorMessage();
}

function showSuccessMessage() {
  const divSuccess = document.querySelector('.success');
  divSuccess.classList.remove(HIDDEN_CLASS);
}

function showErrorMessage(message) {
  const errorDiv = document.querySelector('.error');
  const errorText = document.querySelector('.error__message');
  errorText.textContent = message;
  errorDiv.classList.remove(HIDDEN_CLASS);
}

function onSendDataToServerSuccess() {
  unblockSubmitButton();
  resetForms();
  showSuccessMessage();
}

function onSendDataToServerFail() {
  showErrorMessage(TEXT_ERROR_SEND_DATA);
  unblockSubmitButton();
}

function onSubmitValidForm(evt) {
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
}

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  // const isValid = true;
  if (isValid) {
    onSubmitValidForm(evt);
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
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

export { initializeFormValidation, onPriceChange, showErrorMessage, createTemplateMessages };
