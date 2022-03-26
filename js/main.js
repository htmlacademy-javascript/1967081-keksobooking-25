import { createAnnouncements } from './announcements.js';
import { initializeFormValidation } from './validationForms.js';
import { initializateMap } from './map.js';
import { initializatePriceSlider } from './slider.js';
import { onUserEvents } from './userEvents.js';

const ANNOUNCEMENTS_NUMBER = 10;

const announcements = createAnnouncements(ANNOUNCEMENTS_NUMBER);
initializatePriceSlider();
initializeFormValidation();
initializateMap(announcements);
onUserEvents();

