const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const MIN_RANGE = 0;
const MAX_RANGE = 100000;
const START_STEP = 5000;
const STEP = 1000;
const MARGIN = 100;
function initializatePriceSlider() {
  noUiSlider.create(sliderElement, {
    range: {
      min: MIN_RANGE,
      max: MAX_RANGE,
    },
    start: START_STEP,
    step: STEP,
    connect: 'lower',
    margin: MARGIN,
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
  });
}

export { initializatePriceSlider };
