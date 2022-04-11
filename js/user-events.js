const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const onChangeTimein = () => {
  timeout.value = timein.value;
};

const onChangeTimeout = () => {
  timein.value = timeout.value;
};

const initializateUserEvents = () => {
  timein.addEventListener('change', onChangeTimein);
  timeout.addEventListener('change', onChangeTimeout);
};

export { initializateUserEvents };
