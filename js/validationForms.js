
const orderForm = document.querySelector('.ad-form');
const pristine = new Pristine(orderForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form__error' // Класс для элемента с текстом ошибки
});

orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

function validationForms() {
  titleVadlidation();
  priceVadlidation();
  roomsAndGuestsVadlidation();
}

function titleVadlidation() {
  function validateTitle (value) {
    return value.length >= 30 && value.length <= 100;
  }
  pristine.addValidator(orderForm.querySelector('#title'), validateTitle, 'От 30 до 100 символов');

}

function priceVadlidation() {
  function validatePrice (value) {
    return value > 0 && value <= 100000;
  }
  pristine.addValidator(orderForm.querySelector('#price'), validatePrice, 'Максимальная цена: 100000');

}

function roomsAndGuestsVadlidation() {

  const capacity = orderForm.querySelector('#capacity');
  const roomNumber = document.querySelector('#room_number');
  const dictionary = {
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

  function validateroomsAndGuests () {
    const roomNumberValue = document.querySelector('#room_number').value;
    const guests = dictionary[roomNumberValue];
    const guest = capacity.value;
    if (guests.indexOf(guest) < 0){
      return false;
    } else {
      return true;
    }
  }

  function getError() {
    const roomNumberValue = document.querySelector('#room_number').value;
    const guests = dictionary[roomNumberValue];
    const guest = capacity.value;
    if (guests.indexOf(guest) < 0){
      return dictionaryErrorMessage[roomNumberValue];
    } else {
      return '';
    }
  }

  function onGuestsChange() {
    pristine.validate(capacity);
  }

  capacity.addEventListener('change', onGuestsChange);
  roomNumber.addEventListener('change', onGuestsChange);

  pristine.addValidator(capacity, validateroomsAndGuests, getError);

}

export { validationForms };
