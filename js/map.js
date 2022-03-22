import { createCard } from './templateCard.js';

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterFieldsets = mapFilter.querySelectorAll('select,fieldset');
const adress = document.querySelector('#address');
const START_LAT = 35.68950;
const START_LNG = 139.69171;
const START_MAP_ZOOM = 10;
const MAX_DIGITS_LAT = 5;
const MAX_DIGITS_LNG = 5;
const ICON_SIZE_WIDTH = 52;
const ICON_SIZE_HEIGHT = 52;
const ICON_ANCHOR_WIDTH = 26;
const ICON_ANCHOR_HEIGHT = 52;
const ICON_URL = './img/main-pin.svg';
const POINT_SIZE_WIDTH = 52;
const POINT_SIZE_HEIGHT = 52;
const POINT_ANCHOR_WIDTH = 26;
const POINT_ANCHOR_HEIGHT = 52;
const POINT_URL = './img/pin.svg';


function deactivateMap() {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
  mapFilter.classList.add('ad-form--disabled');
  for (let i = 0; i < mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].setAttribute('disabled', 'disabled');
  }
}

function activateMap() {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }
  mapFilter.classList.remove('ad-form--disabled');
  for (let i = 0; i < mapFilterFieldsets.length; i++) {
    mapFilterFieldsets[i].removeAttribute('disabled');
  }
}

function initializateMap(announcements) {
  deactivateMap();
  createMap(announcements);
  activateMap();
  setAdress(START_LAT, START_LNG);
}

function createMap(announcements) {
  const map = initializateFirstLayer();
  initializateTitleLayer(map);
  initializateIcon(map, true);
  initializatePoints(map, announcements);
}

function initializateIcon(map, isMainIcon) {
  const mainPinIcon = initializatePin(isMainIcon);
  const marker = initializateMarker(mainPinIcon);
  marker.addTo(map);
  marker.on('moveend', (evt) => {
    const latLng = evt.target.getLatLng();
    setAdress(latLng.lat, latLng.lng);
  });
}

function initializateMarker(pinIcon, lat = START_LAT, lng = START_LNG, isDraggable = true) {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },

    {
      draggable: isDraggable,
      icon: pinIcon,
    },
  );
  return marker;
}

function initializatePin(isMainIcon) {
  if (isMainIcon) {
    return L.icon({
      iconUrl: ICON_URL,
      iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
      iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
    });
  } else {
    return L.icon({
      iconUrl: POINT_URL,
      iconSize: [POINT_SIZE_WIDTH, POINT_SIZE_HEIGHT],
      iconAnchor: [POINT_ANCHOR_WIDTH, POINT_ANCHOR_HEIGHT],
    });
  }
}

function initializateFirstLayer() {
  const map = L.map('map-canvas')
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, START_MAP_ZOOM);
  return map;
}

function initializateTitleLayer(map) {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function setAdress(lat, lng) {
  adress.value = `${lat.toFixed(MAX_DIGITS_LAT)}, ${lng.toFixed(MAX_DIGITS_LNG)}`;
}

function initializatePoints(map, announcements) {
  announcements.forEach((element) => {
    const pointIcon = initializatePin(false);
    const marker = initializateMarker(pointIcon, element.location.lat, element.location.lng, false);  
    marker.addTo(map).bindPopup(createCard(element));
  });
}

export { initializateMap };
