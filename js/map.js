import { getDataFromServer } from './fetch.js';
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

function initializateMap() {
  getDataFromServer(createMap);
  adress.value = setAdress(START_LAT, START_LNG);
}

function createMap(announcements) {
  deactivateMap();
  const map = initializateFirstLayer();
  initializateTitleLayer(map);
  createIcon(map, true);
  activateMap();
  createPoints(map, announcements);
}

function createIcon(map, isMainIcon) {
  const mainPinIcon = createPin(isMainIcon);
  const marker = createMarker(mainPinIcon);
  marker.addTo(map);
  marker.addEventListener('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    adress.value = setAdress(coordinates.lat, coordinates.lng);
  });
}

function createMarker(pinIcon, lat = START_LAT, lng = START_LNG, isDraggable = true) {
  const marker = L.marker(
    {
      lat,
      lng,
    },

    {
      draggable: isDraggable,
      icon: pinIcon,
    },
  );
  return marker;
}

function createPin(isMainIcon) {
  return (isMainIcon) ? (
    L.icon({
      iconUrl: ICON_URL,
      iconSize: [ICON_SIZE_WIDTH, ICON_SIZE_HEIGHT],
      iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
    })
  ) : (
    L.icon({
      iconUrl: POINT_URL,
      iconSize: [POINT_SIZE_WIDTH, POINT_SIZE_HEIGHT],
      iconAnchor: [POINT_ANCHOR_WIDTH, POINT_ANCHOR_HEIGHT],
    }));
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
  return `${lat.toFixed(MAX_DIGITS_LAT)}, ${lng.toFixed(MAX_DIGITS_LNG)}`;
}

function createPoints(map, announcements) {
  announcements.forEach((element) => {
    const pointIcon = createPin(false);
    const marker = createMarker(pointIcon, element.location.lat, element.location.lng, false);
    marker.addTo(map).bindPopup(createCard(element));
  });
}

export { initializateMap };
