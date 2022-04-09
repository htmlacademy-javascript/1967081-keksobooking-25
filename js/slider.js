import { onPriceChange } from './validationForms.js';

const MIN_RANGE = 0;
const MAX_PRICE = 100000;
const START_STEP = 5000;
const STEP = 1000;
const MARGIN = 100;
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');

function initializatePriceSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_RANGE,
      max: MAX_PRICE,
    },
    start: START_STEP,
    step: STEP,
    connect: 'lower',
    margin: MARGIN,
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    onPriceChange();
  });
}

export { initializatePriceSlider, MAX_PRICE };
