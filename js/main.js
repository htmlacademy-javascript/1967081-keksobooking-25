import { initializeFormValidation } from './validation-forms.js';
import { initializeMap } from './map.js';
import { initializePriceSlider } from './slider.js';
import { initializeUserEvents } from './user-events.js';
import { addImages } from './avatar.js';

initializeMap();
initializePriceSlider();
initializeFormValidation();
initializeUserEvents();
addImages();

