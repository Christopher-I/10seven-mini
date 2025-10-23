/**
 * Unit 5: Banking As a Smithie - Complete Pages Export
 * Re-exports all pages from split files for cleaner organization
 */

import { Page1, Page2, Page3, Page4, Page5 } from './pages/pages-01-05';
import { Page6, Page7, Page8, Page9 } from './pages/pages-06-09';

// Export all pages for external use
export { Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9 };

// Combined page configuration for the unit
export const UNIT_5_PAGES = [
  { title: 'Student Account Introduction', component: Page1 },
  { title: 'What\'s the Deal with Student Accounts?', component: Page2 },
  { title: 'Specific Bank Examples', component: Page3 },
  { title: 'Study Abroad Introduction', component: Page4 },
  { title: 'Smith Study Abroad Financial Details', component: Page5 },
  { title: 'Pre-Departure Banking Preparation', component: Page6 },
  { title: 'Long-term Abroad Considerations', component: Page7 },
  { title: 'Emergency Financial Assistance', component: Page8 },
  { title: 'Works Cited', component: Page9 }
];