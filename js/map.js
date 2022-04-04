import { loadDataFromServer } from './fetch.js';
import { getAdsInFilters } from './selection.js';
import { createCard } from './templateCard.js';
import { createTemplateMessages } from './validationForms.js';

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
const ADS_COUNT = 10;
const map = createFirstLayer();
const pointsLayer = createPointsLayer();
let allAnnouncements = [];

const onChangeFilters = () => {
  const announcements = [...allAnnouncements];
  createPoints(announcements);
};

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
  createTemplateMessages();
  deactivateMap();
  loadDataFromServer(createMap);
  adress.value = getAdress(START_LAT, START_LNG);
}

function createMap(announcements) {
  allAnnouncements = [...announcements];
  initializateTitleLayer();
  createIcon();
  activateMap();
  onChangeFilters();
}

function createIcon() {
  const mainPinIcon = createPin(true);
  const marker = createMarker(mainPinIcon);
  marker.addTo(map);
  marker.addEventListener('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    adress.value = getAdress(coordinates.lat, coordinates.lng);
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

function createFirstLayer() {
  return L.map('map-canvas')
    .setView({
      lat: START_LAT,
      lng: START_LNG,
    }, START_MAP_ZOOM);

}

function initializateTitleLayer() {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function createPointsLayer() {
  return  L.layerGroup().addTo(map);
}

function getAdress(lat, lng) {
  return `${lat.toFixed(MAX_DIGITS_LAT)}, ${lng.toFixed(MAX_DIGITS_LNG)}`;
}

function createPoints(announcements) {
  pointsLayer.clearLayers();
  const filteredAnnouncement = getAdsInFilters(announcements);
  let count = 0;
  filteredAnnouncement.forEach((element) => {
    if (count < ADS_COUNT) {
      const pointIcon = createPin(false);
      const marker = createMarker(pointIcon, element.location.lat, element.location.lng, false);
      marker.addTo(pointsLayer).bindPopup(createCard(element));
      count++;
    }
  });
}

export { initializateMap, onChangeFilters };
