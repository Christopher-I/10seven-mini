/**
 * Central Page Registry for Unit 2
 * Imports from refactored page files and provides UNIT_2_PAGES export
 */

// Import from refactored page files
import { Page1, WhackAMolePages, Page3 } from './pages/pages-01-03';
import { Survey } from './components/Survey';
import {
  Page14, Page15, Page16, Page17, Page18, Page19, Page20,
  Page21, Page22, Page23, Page24, Page25
} from './pages/pages-14-25';
import {
  Page26, Page27, Page28, Page29, Page30
} from './pages/pages-26-30';
import {
  Page31, Page32, Page33, Page34, Page35
} from './pages/pages-31-35';
import {
  Page36, Page37, Page38, Page39, Page40, Page41, Page42, Page43
} from './pages/pages-36-42';

// Wrapper components for Survey pages (Pages 4-13)
interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

export function Page4(props: PageProps) {
  return <Survey currentQuestion={4} {...props} />;
}

export function Page5(props: PageProps) {
  return <Survey currentQuestion={5} {...props} />;
}

export function Page6(props: PageProps) {
  return <Survey currentQuestion={6} {...props} />;
}

export function Page7(props: PageProps) {
  return <Survey currentQuestion={7} {...props} />;
}

export function Page8(props: PageProps) {
  return <Survey currentQuestion={8} {...props} />;
}

export function Page9(props: PageProps) {
  return <Survey currentQuestion={9} {...props} />;
}

export function Page10(props: PageProps) {
  return <Survey currentQuestion={10} {...props} />;
}

export function Page11(props: PageProps) {
  return <Survey currentQuestion={11} {...props} />;
}

export function Page12(props: PageProps) {
  return <Survey currentQuestion={12} {...props} />;
}

export function Page13(props: PageProps) {
  return <Survey currentQuestion={13} {...props} />;
}

// All pages now imported from their respective files

// Export page registry - matches the exact structure expected by the app
export const UNIT_2_PAGES = [
  { id: 1, component: Page1, title: "Introduction" },
  { id: 2, component: WhackAMolePages, title: "Whack-A-Mole Game" },
  { id: 3, component: Page3, title: "Banking Context" },
  { id: 4, component: Page4, title: "Survey Question 1 of 10" },
  { id: 5, component: Page5, title: "Survey Question 2 of 10" },
  { id: 6, component: Page6, title: "Survey Question 3 of 10" },
  { id: 7, component: Page7, title: "Survey Question 4 of 10" },
  { id: 8, component: Page8, title: "Survey Question 5 of 10" },
  { id: 9, component: Page9, title: "Survey Question 6 of 10" },
  { id: 10, component: Page10, title: "Survey Question 7 of 10" },
  { id: 11, component: Page11, title: "Survey Question 8 of 10" },
  { id: 12, component: Page12, title: "Survey Question 9 of 10" },
  { id: 13, component: Page13, title: "Survey Question 10 of 10" },
  { id: 14, component: Page14, title: "Banking Emotions Transition" },
  { id: 15, component: Page15, title: "Banking History Introduction" },
  { id: 16, component: Page16, title: "Banking History Details" },
  { id: 17, component: Page17, title: "Your Reaction" },
  { id: 18, component: Page18, title: "Banks serve a variety of audiences" },
  { id: 19, component: Page19, title: "Banks answer to shareholders" },
  { id: 20, component: Page20, title: "Shareholder primacy requires profit focus" },
  { id: 21, component: Page21, title: "JPMorgan Chase Revenue Quiz" },
  { id: 22, component: Page22, title: "Bank Revenue Data" },
  { id: 23, component: Page23, title: "Content Check-in Introduction" },
  { id: 24, component: Page24, title: "Bank Fees Overview" },
  { id: 25, component: Page25, title: "Additional Bank Fees Overview" },
  { id: 26, component: Page26, title: "Is Anything Being Done?" },
  { id: 27, component: Page27, title: "Some Banks Have Eliminated Overdraft Fees" },
  { id: 28, component: Page28, title: "Is There Anything I Can Do to Protect Myself?" },
  { id: 29, component: Page29, title: "Let's Talk About Account Closures" },
  { id: 30, component: Page30, title: "Wait, They Can Just Close My Account?" },
  { id: 31, component: Page31, title: "The Unbanked" },
  { id: 32, component: Page32, title: "Predatory Lending and Payday Loans" },
  { id: 33, component: Page33, title: "Financial Empowerment and Community Solutions" },
  { id: 34, component: Page34, title: "Key Takeaways" },
  { id: 35, component: Page35, title: "Remember" },
  { id: 36, component: Page36, title: "Account Closures Introduction" },
  { id: 37, component: Page37, title: "Wait, they can just close my account?" },
  { id: 38, component: Page38, title: "ChexSystems and Debanking" },
  { id: 39, component: Page39, title: "Response Strategies" },
  { id: 40, component: Page40, title: "Prevention Strategies" },
  { id: 41, component: Page41, title: "Action Steps if Closure Happens" },
  { id: 42, component: Page42, title: "Transition to Next Section" },
  { id: 43, component: Page43, title: "Works Cited and Consulted" }
];