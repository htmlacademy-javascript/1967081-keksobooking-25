import { createCardTemplates } from './templateCard.js';
import { createAnnouncements } from './announcements.js';

const announcements = createAnnouncements(2);
createCardTemplates(announcements);
