const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

function onUserEvents() {
  timein.addEventListener('change', onChangeTimein);
  timeout.addEventListener('change', onChangeTimeout);
}

function onChangeTimein() {
  timeout.value = timein.value;
}

function onChangeTimeout() {
  timein.value = timeout.value;
}

export { onUserEvents };
