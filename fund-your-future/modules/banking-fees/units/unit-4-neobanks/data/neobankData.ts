/**
 * Neobank Data Types and Constants
 * Data structures and information for the neobank comparison feature
 */

export interface NeobankSwiperProps {
  onSwipingComplete: (results: Record<string, NeobankResult>) => void;
}

export interface NeobankResult {
  initialSwipe: 'left' | 'right';
  finalDecision?: 'match' | 'pass';
  considerationsViewed?: string[];
}

export interface Neobank {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  quickFacts: string[];
  color: string;
  considerations: NeobankConsideration[];
  detailedInfo: {
    description: string;
    pros: string[];
    cons: string[];
    bestFor: string[];
  };
}

export interface NeobankConsideration {
  id: string;
  title: string;
  content: string;
  type: 'feature' | 'limitation' | 'cost' | 'security';
}

export type FlowState = 'swiping' | 'considerations' | 'final-decision' | 'complete';

export const NEOBANKS: Neobank[] = [
  {
    id: 'chime',
    name: 'Chime',
    tagline: 'Banking that has your back',
    logo: '🏦',
    quickFacts: [
      'No monthly fees',
      'Early direct deposit',
      'Automatic savings',
      'Fee-free overdraft protection'
    ],
    color: 'from-green-400 to-green-600',
    considerations: [
      {
        id: 'no-physical-branches',
        title: 'No Physical Branches',
        content: 'Chime operates entirely online with no physical branch locations. All banking is done through the mobile app or website.',
        type: 'limitation'
      },
      {
        id: 'limited-atm-network',
        title: 'ATM Network Limitations',
        content: 'While Chime offers fee-free ATMs through partner networks, the selection may be more limited than traditional banks.',
        type: 'limitation'
      },
      {
        id: 'early-pay-feature',
        title: 'Early Direct Deposit',
        content: 'Get paid up to 2 days early with direct deposit, helping with cash flow management.',
        type: 'feature'
      },
      {
        id: 'automatic-savings',
        title: 'Automatic Savings Features',
        content: 'Round-up purchases and automatically save the change, plus percentage-based savings on purchases.',
        type: 'feature'
      }
    ],
    detailedInfo: {
      description: 'Chime is a financial technology company that partners with banks to offer fee-free mobile banking services.',
      pros: ['No monthly fees', 'Early direct deposit', 'Automatic savings tools', 'Large fee-free ATM network'],
      cons: ['No physical branches', 'Limited customer service hours', 'No interest on checking accounts'],
      bestFor: ['People comfortable with mobile-only banking', 'Those who want to avoid monthly fees', 'Users seeking automatic savings features']
    }
  },
  {
    id: 'dave',
    name: 'Dave',
    tagline: 'Banking for humans',
    logo: '💰',
    quickFacts: [
      'Cash advances up to $500',
      'Budgeting tools',
      'Overdraft alerts',
      'Side hustle finder'
    ],
    color: 'from-blue-400 to-blue-600',
    considerations: [
      {
        id: 'membership-fees',
        title: 'Monthly Membership Fee',
        content: 'Dave charges a monthly membership fee for access to premium features including cash advances.',
        type: 'cost'
      },
      {
        id: 'cash-advance-limits',
        title: 'Cash Advance Limitations',
        content: 'While advances up to $500 are possible, most users start with smaller limits that increase over time based on usage.',
        type: 'limitation'
      },
      {
        id: 'budgeting-tools',
        title: 'Built-in Budgeting Tools',
        content: 'Dave offers budgeting features and spending insights to help users manage their money better.',
        type: 'feature'
      },
      {
        id: 'overdraft-protection',
        title: 'Overdraft Alerts',
        content: 'Get notifications when your account balance is low to help avoid overdraft fees from other banks.',
        type: 'feature'
      }
    ],
    detailedInfo: {
      description: 'Dave is designed to help users avoid overdraft fees and manage their finances with cash advances and budgeting tools.',
      pros: ['Cash advances available', 'Overdraft alerts', 'Budgeting tools', 'Side hustle job finder'],
      cons: ['Monthly membership fees', 'Limited traditional banking services', 'Cash advance fees may apply'],
      bestFor: ['People who occasionally need cash advances', 'Users wanting budgeting assistance', 'Those seeking extra income opportunities']
    }
  },
  {
    id: 'paypal',
    name: 'PayPal',
    tagline: 'The simpler way to pay and get paid',
    logo: '💳',
    quickFacts: [
      'Integrated with PayPal payments',
      'Cash back rewards',
      'Mobile check deposit',
      'No monthly maintenance fees'
    ],
    color: 'from-indigo-400 to-indigo-600',
    considerations: [
      {
        id: 'paypal-ecosystem',
        title: 'PayPal Ecosystem Integration',
        content: 'Works best if you already use PayPal for online payments and transactions. Limited benefits if you don\'t use PayPal regularly.',
        type: 'limitation'
      },
      {
        id: 'account-holds',
        title: 'Account Hold Policies',
        content: 'PayPal is known for placing holds on accounts for suspicious activity, which could affect access to your funds.',
        type: 'security'
      },
      {
        id: 'cashback-rewards',
        title: 'Cash Back Debit Card',
        content: 'Earn cash back on purchases with the PayPal debit card, with bonus categories that rotate.',
        type: 'feature'
      },
      {
        id: 'seamless-transfers',
        title: 'Seamless PayPal Integration',
        content: 'Instantly access funds from PayPal transactions and easily move money between PayPal and your bank account.',
        type: 'feature'
      }
    ],
    detailedInfo: {
      description: 'PayPal offers banking services that integrate seamlessly with the PayPal payment platform.',
      pros: ['No monthly fees', 'PayPal ecosystem integration', 'Cash back rewards', 'Mobile check deposit'],
      cons: ['Best suited for PayPal users', 'Limited ATM network', 'Account hold policies'],
      bestFor: ['Frequent PayPal users', 'Online sellers and freelancers', 'People wanting cash back rewards']
    }
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    tagline: 'Send, spend, save, and invest',
    logo: '📱',
    quickFacts: [
      'Easy peer-to-peer payments',
      'Bitcoin trading',
      'Direct deposit',
      'Cash Card for purchases'
    ],
    color: 'from-purple-400 to-purple-600',
    considerations: [
      {
        id: 'limited-banking-services',
        title: 'Limited Traditional Banking',
        content: 'Cash App focuses primarily on peer-to-peer payments and has fewer traditional banking features compared to full-service banks.',
        type: 'limitation'
      },
      {
        id: 'customer-service',
        title: 'Customer Service Challenges',
        content: 'Customer support can be difficult to reach, with limited phone support and primarily app-based help.',
        type: 'limitation'
      },
      {
        id: 'bitcoin-investment',
        title: 'Built-in Bitcoin Trading',
        content: 'Buy, sell, and hold Bitcoin directly in the app with no additional fees for standard transactions.',
        type: 'feature'
      },
      {
        id: 'p2p-payments',
        title: 'Seamless P2P Payments',
        content: 'Send and receive money instantly with friends and family using just phone numbers or usernames.',
        type: 'feature'
      }
    ],
    detailedInfo: {
      description: 'Cash App provides peer-to-peer payments and basic banking services with investment features.',
      pros: ['Easy P2P payments', 'Bitcoin trading', 'Cash Card rewards', 'Direct deposit available'],
      cons: ['Limited banking features', 'Customer service issues', 'Security concerns with P2P transactions'],
      bestFor: ['Frequent P2P payment users', 'People interested in Bitcoin', 'Users wanting simple mobile banking']
    }
  }
];