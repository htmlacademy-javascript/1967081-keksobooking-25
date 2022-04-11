import { loadDataFromServer } from './fetch.js';
import { getAdsInFilters } from './selection.js';
import { createCard } from './template-card.js';
import { debounce } from './utils.js';
import { createTemplateMessages } from './validation-forms.js';

const RERENDER_DELAY = 500;
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
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapFilterFieldsets = mapFilter.querySelectorAll('select,fieldset');
const adress = document.querySelector('#address');
const map = createFirstLayer();
const mainIconLayer = createNewLayer();
const pointsLayer = createNewLayer();
const filters = document.querySelector('.map__filters-container');

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

function createNewLayer() {
  return L.layerGroup().addTo(map);
}

const createPin = (isMainIcon) => (isMainIcon ? (
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
  })
));

const createMarker = (pinIcon, lat = START_LAT, lng = START_LNG, isDraggable = true) => {
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
};

const createPoints = (announcements) => {
  pointsLayer.clearLayers();
  const filteredAnnouncement = getAdsInFilters(announcements);
  let count = 0;
  for (let i = 0; i < filteredAnnouncement.length; i++) {
    if (count < ADS_COUNT) {
      const pointIcon = createPin(false);
      const marker = createMarker(pointIcon, filteredAnnouncement[i].location.lat, filteredAnnouncement[i].location.lng, false);
      marker.addTo(pointsLayer).bindPopup(createCard(filteredAnnouncement[i]));
      count++;
    } else {
      break;
    }
  }
};

const onChangeFilters = (announcements) => {
  createPoints(announcements);
};

const deactivateMap = () => {
  adForm.classList.add('ad-form--disabled');
  adFormFieldsets.forEach((elems) => elems.setAttribute('disabled', 'disabled'));
  mapFilter.classList.add('ad-form--disabled');
  mapFilterFieldsets.forEach((elems) => elems.setAttribute('disabled', 'disabled'));
};

const activateAds = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach((elems) => elems.removeAttribute('disabled'));
};

const activateFilters = () => {
  mapFilter.classList.remove('ad-form--disabled');
  mapFilterFieldsets.forEach((elems) => elems.removeAttribute('disabled'));
};

const activateMap = () => {
  activateAds();
  activateFilters();
};

const addEventFilters = (announcements) => {
  const getDebouncedFunction = (copyAnnouncements) => debounce(() => {
    onChangeFilters(copyAnnouncements);
  }, RERENDER_DELAY);
  const callbackOnChangeFilters = getDebouncedFunction(announcements);
  filters.addEventListener('change', callbackOnChangeFilters);
  filters.addEventListener('reset', callbackOnChangeFilters);
};

const setAdress = (lat, lng) => {
  adress.value = `${lat.toFixed(MAX_DIGITS_LAT)}, ${lng.toFixed(MAX_DIGITS_LNG)}`;
};

const addEventsMainMarker = (marker) => {
  marker.addTo(mainIconLayer);
  marker.addEventListener('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    setAdress(coordinates.lat, coordinates.lng);
  });
};

const getIcon = () => {
  mainIconLayer.clearLayers();
  const mainPinIcon = createPin(true);
  const marker = createMarker(mainPinIcon);
  return marker;
};

const createIconStartLocation = () => {
  const mainIcon = getIcon();
  setAdress(START_LAT, START_LNG);
  addEventsMainMarker(mainIcon);
};

const createMap = (announcements) => {
  addEventFilters(announcements);
  initializateTitleLayer();
  createIconStartLocation();
  activateMap();
  onChangeFilters(announcements);
};

const initializateMap = () => {
  createTemplateMessages();
  deactivateMap();
  loadDataFromServer(createMap);
};

export { initializateMap, onChangeFilters, createIconStartLocation, activateAds, initializateTitleLayer };
