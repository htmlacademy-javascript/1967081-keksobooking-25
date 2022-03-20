
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterFieldsets = mapFilter.querySelectorAll('select,fieldset');

function deactivateMap() {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i<adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
  mapFilter.classList.add('ad-form--disabled');
  for (let i = 0; i<mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].setAttribute('disabled', 'disabled');
  }
}

function activateMap() {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i<adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }
  mapFilter.classList.remove('ad-form--disabled');
  for (let i = 0; i<mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].removeAttribute('disabled');
  }
}

export { deactivateMap, activateMap };
