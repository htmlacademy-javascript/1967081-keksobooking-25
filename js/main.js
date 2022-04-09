import { initializeFormValidation } from './validationForms.js';
import { initializateMap } from './map.js';
import { initializatePriceSlider } from './slider.js';
import { initializateUserEvents } from './userEvents.js';
import { addImages } from './avatar.js';

initializateMap();
initializatePriceSlider();
initializeFormValidation();
initializateUserEvents();
addImages();

