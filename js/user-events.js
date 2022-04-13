const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

const onTimeinChange = () => {
  timeout.value = timein.value;
};

const onTimeoutChange = () => {
  timein.value = timeout.value;
};

const initializeUserEvents = () => {
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);
};

export { initializeUserEvents };
