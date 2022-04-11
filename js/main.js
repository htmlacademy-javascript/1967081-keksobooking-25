import { initializeFormValidation } from './validation-forms.js';
import { initializateMap } from './map.js';
import { initializatePriceSlider } from './slider.js';
import { initializateUserEvents } from './user-events.js';
import { addImages } from './avatar.js';

initializateMap();
initializatePriceSlider();
initializeFormValidation();
initializateUserEvents();
addImages();

