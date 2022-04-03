import { MAX_PRICE } from './validationForms.js';

const formFiltres = document.querySelector('.map__filters-container');
const housingType = formFiltres.querySelector('#housing-type');
const housingPrice = formFiltres.querySelector('#housing-price');
const housingRooms = formFiltres.querySelector('#housing-rooms');
const housingGuests = formFiltres.querySelector('#housing-guests');
const housingFeaturesFieldset = formFiltres.querySelector('#housing-features');

const PRICE_FILTERS = {
  'middle': {
    priceMin: 10000,
    priceMax: 50000,
  },
  'low': {
    priceMin: 0,
    priceMax: 10000,
  },
  'high': {
    priceMin: 50000,
    priceMax: MAX_PRICE,
  },
};

function checkHousingType(offer, isInFilters) {
  if (housingType.value === 'any') {
    return isInFilters;
  }
  if (!(offer.type === housingType.value)) {
    return false;
  }
  return isInFilters;
}

function checkHousingPrice(offer, isInFilters) {
  if (housingPrice.value === 'any') {
    return isInFilters;
  }
  if (offer.price) {
    const priceMin = PRICE_FILTERS[housingPrice.value].priceMin;
    const priceMax = PRICE_FILTERS[housingPrice.value].priceMax;
    if (!(offer.price >= priceMin && offer.price <= priceMax)) {
      return false;
    }
  }
  return isInFilters;
}

function checkHousingRooms(offer, isInFilters) {
  if (housingRooms.value === 'any') {
    return isInFilters;
  }
  if (!(offer.rooms === Number(housingRooms.value))) {
    return false;
  }
  return isInFilters;
}

function checkHousingGuests(offer, isInFilters) {
  if (housingGuests.value === 'any') {
    return isInFilters;
  }
  if ((Number(housingGuests.value) === 0 && offer.guests !== 0)) {
    return false;
  }
  if (!(offer.guests >= Number(housingGuests.value))) {
    return false;
  }
  return isInFilters;
}

// function findFeaturesInCheckedList(feature) {
//   let isInFilters = false;
//   for (let i = 0; i < housingFeaturesChecked.length; i++) {
//     const checkedInput = housingFeaturesChecked[i];
//     if (checkedInput.value === feature){
//       isInFilters = true;
//     }
//   }
//   return isInFilters;
// }

function getArrayCheckedFeaturesInputs(housingFeaturesChecked) {
  const arrayChekedInputs = [];
  for (let i = 0; i < housingFeaturesChecked.length; i++) {
    arrayChekedInputs.push(housingFeaturesChecked[i].value);
  }
  return arrayChekedInputs;
}

function checkHousingFeatures(offer, isInFilters, housingFeaturesChecked) {
  if (!offer.features) {
    return false;
  }
  const checkedFeaturesInputs = getArrayCheckedFeaturesInputs(housingFeaturesChecked);
  if (!checkedFeaturesInputs.length) {
    return isInFilters;
  }

  const isNotFound = checkedFeaturesInputs.some((elem)=> offer.features.indexOf(elem) < 0);
  if (isNotFound) {
    return false;
  }

  return isInFilters;
}

function checkfilters(announcement) {
  let isInFilters = true;
  const housingFeaturesChecked = housingFeaturesFieldset.querySelectorAll('.map__checkbox:checked');
  const offer = announcement.offer;
  isInFilters = checkHousingType(offer, isInFilters);
  isInFilters = checkHousingPrice(offer, isInFilters);
  isInFilters = checkHousingRooms(offer, isInFilters);
  isInFilters = checkHousingGuests(offer, isInFilters);
  isInFilters = checkHousingFeatures(offer, isInFilters, housingFeaturesChecked);
  return isInFilters;
}

function getAdsInFilters(announcements) {
  const cloneAnnouncements = [...announcements];
  const filteredAnnouncements = cloneAnnouncements.filter(checkfilters);
  return filteredAnnouncements;
}

export { getAdsInFilters };