
const orderForm = document.querySelector('.ad-form');
const capacity = orderForm.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');
const title = orderForm.querySelector('#title');
const price = orderForm.querySelector('#price');
const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

const dictionaryRoomsAndGuests = {
  '1' : ['1'],
  '2' : ['1', '2'],
  '3' : ['1', '2', '3'],
  '100' : ['0'],
};

const dictionaryErrorMessage = {
  '1' : 'Максимум гостей: 1',
  '2' : 'Максимум гостей: 2',
  '3' : 'Максимум гостей: 3',
  '100' : 'Не для гостей',
};

orderForm.addEventListener('submit', (evt) => { 
  const isFormValide = pristine.validate();
  if (!isFormValide) {
    evt.preventDefault();
  }
});

function validateForms() {
  pristine.addValidator(title, validateTitle, 'От 30 до 100 символов');
  pristine.addValidator(price, validatePrice, 'Максимальная цена: 100000');
  pristine.addValidator(capacity, validateRoomsAndGuests, getError);
  capacity.addEventListener('change', onGuestsChange);
  roomNumber.addEventListener('change', onGuestsChange);
}

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

function validatePrice (value) {
  return value > 0 && value <= 100000;
}

function validateRoomsAndGuests() {

  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  return (guests.includes(guest));

}

function onGuestsChange() {
  pristine.validate(capacity);
}

function getError() {
  const guests = dictionaryRoomsAndGuests[roomNumber.value];
  const guest = capacity.value;
  if (!guests.includes(guest)){
    return dictionaryErrorMessage[roomNumber.value];
  } else {
    return '';
  }
}

export { validateForms };
