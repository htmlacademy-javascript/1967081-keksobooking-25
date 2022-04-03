import { onChangeFilters } from './map.js';
import { debounce } from './utils.js';

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');
const filters = document.querySelector('.map__filters-container');
const RERENDER_DELAY = 500;


function onUserEvents() {
  timein.addEventListener('change', onChangeTimein);
  timeout.addEventListener('change', onChangeTimeout);
  filters.addEventListener('change', debounce(onChangeFilters, RERENDER_DELAY));
}

function onChangeTimein() {
  timeout.value = timein.value;
}

function onChangeTimeout() {
  timein.value = timeout.value;
}

export { onUserEvents };
