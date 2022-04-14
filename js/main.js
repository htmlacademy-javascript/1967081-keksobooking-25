import { initializeFormValidation } from './validation-forms.js';
import { initializateMap } from './map.js';
import { initializePriceSlider } from './slider.js';
import { initializateUserEvents } from './user-events.js';
import { addImages } from './avatar.js';

initializateMap();
initializePriceSlider();
initializeFormValidation();
initializateUserEvents();
addImages();

