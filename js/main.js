import { initializeFormValidation } from './validationForms.js';
import { initializateMap } from './map.js';
import { initializatePriceSlider } from './slider.js';
import { onUserEvents } from './userEvents.js';

initializatePriceSlider();
initializeFormValidation();
initializateMap();
onUserEvents();

