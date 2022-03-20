import { createCardTemplates } from './templateCard.js';
import { createAnnouncements } from './announcements.js';
import { initializeFormValidation } from './validationForms.js';

const announcements = createAnnouncements(2);
createCardTemplates(announcements);
initializeFormValidation();
