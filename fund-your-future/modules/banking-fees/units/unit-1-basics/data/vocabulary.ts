/**
 * Banking Vocabulary Data for Unit 1
 * All terms and definitions from the unit outline
 */

export interface VocabularyTerm {
  term: string;
  definition: string;
  category: 'accounts' | 'fees' | 'transactions' | 'institutions' | 'financial';
}

export const BANKING_VOCABULARY: VocabularyTerm[] = [
  {
    term: "Alternative Financial Institutions",
    definition: "Financial services that operate outside of traditional financial institutions. These include nonbank checkcashing outlets, payday lenders, pawnshops, rent-to-own stores, and auto title lenders. This provides easy access to cash, though their rates tend to be higher (The Urban Institute). These are also known as Non-Traditional Financial Institutions.",
    category: "institutions"
  },
  {
    term: "Account Number",
    definition: "The unique ID number associated with your account. If you need to wire money or set up online bill payments, you will need this number.",
    category: "accounts"
  },
  {
    term: "Available Balance",
    definition: "The amount of money in a bank account that you have access to right now, factoring in pending transactions or deposits/withdrawals. (Bennet, 2025) For example, your available balance may say $400 because of a pending charge for $100, even though your current balance might say $500. If you are wondering how much you actually have to spend, check your available balance.",
    category: "accounts"
  },
  {
    term: "Bank",
    definition: "A chartered financial institution licensed to receive deposits and make loans, and may also provide other financial services such as wealth management, currency exchange, and safe deposit boxes. (Bradford 2020) (Barone 2020)",
    category: "institutions"
  },
  {
    term: "Bank Fees",
    definition: "Charges imposed by a bank or financial institution for account setup, maintenance, or other transactional activities.",
    category: "fees"
  },
  {
    term: "Bank Teller",
    definition: "Responsible for routine banking transactions at a financial institution. This includes cashing checks, withdrawals, and providing banking service information.",
    category: "institutions"
  },
  {
    term: "Checking Account",
    definition: "An account meant for everyday transactions and withdrawals.",
    category: "accounts"
  },
  {
    term: "Credit Card",
    definition: "Provides you with access to a cash substitute to pay for goods and services. You may pay interest on the amount you borrowed as well as other fees.",
    category: "financial"
  },
  {
    term: "Credit Union",
    definition: "A member-owned and controlled, not-for-profit, cooperative financial institution formed to provide its members with affordable and safe financial services. (National Credit Union Administration, 2025)",
    category: "institutions"
  },
  {
    term: "Current Balance",
    definition: "The amount of money in a bank account that does not factor in pending transactions or deposits/withdrawals. (Bennet, 2025) For example, your current balance may say $500 instead of $400, despite a pending charge for $100. Your available balance would be $400. If you are wondering how much you actually have to spend, check your available balance.",
    category: "accounts"
  },
  {
    term: "Custodial Account",
    definition: "A bank account set up and administered by an adult for a minor.",
    category: "accounts"
  },
  {
    term: "Debit Card",
    definition: "Connected to a bank or credit union account. It is money you have in an account and cannot be overspent unless your bank allows for overdraft.",
    category: "financial"
  },
  {
    term: "Debt Collections",
    definition: "If you've fallen behind on your bills or debts, a debt collector may contact you. Debt collectors are typically people or agencies paid by creditors to collect on certain past-due debts. The longer the payment is past due, the more it can hurt your credit score.",
    category: "financial"
  },
  {
    term: "Deposit",
    definition: "A sum of money that goes into a bank account. You can make bank deposits in several ways. The traditional method is to visit a local branch to deposit cash or physical checks. However, many deposits can now be handled electronically through account transfers, direct deposits, and remote check deposits. If you're employed, your employer may make regular bank deposits of your paycheck directly into your bank account.",
    category: "transactions"
  },
  {
    term: "Expenses",
    definition: "For individuals, the cost of something necessary for living. For companies, expenses represent the business activities that the corporation pays for. It's the money that goes out. Fixed expenses are costs that remain constant (e.g., rent) while variable expenses may change or are more unpredictable (e.g., medical bills). (Bennet, 2025)",
    category: "financial"
  },
  {
    term: "FDIC Insured",
    definition: "With FDIC insurance, your money held in a bank is protected by the federal government if your bank fails. But there are coverage limits - typically $250,000.",
    category: "institutions"
  },
  {
    term: "Inflation",
    definition: "When the prices of goods and services go up over time.",
    category: "financial"
  },
  {
    term: "Interest",
    definition: "The price you pay when you borrow money or the cost you charge to lend money. You can earn interest through your savings account because the bank uses that money to lend to others and earns interest, which you receive a portion of.",
    category: "financial"
  },
  {
    term: "Loss",
    definition: "Revenue - Expenses = Profit or Loss; If a corporation's revenue is less than its expenses, then the corporation suffers a loss. Reporting a loss typically results in a negative effect on the value of the stock.",
    category: "financial"
  },
  {
    term: "Net Income",
    definition: "For individuals, it is also known as your \"take-home pay\" after taxes, insurance, or retirement contributions. For companies, it is the money left over after taking out expenses. (Bennet, 2025) For companies, net income and profit are often used interchangeably, but net income is a specific type of profit calculation that takes into account all costs, expenses, and income streams and is used by publicly traded companies to calculate their earnings per share. (Boyte-White, 2024).",
    category: "financial"
  },
  {
    term: "Overdraft",
    definition: "Occurs when you don't have enough money in your account to cover a transaction, but the bank pays the transaction anyway. Typically, when this happens, the account holder is charged a fee.",
    category: "fees"
  },
  {
    term: "Profit",
    definition: "Revenue - Expenses = Profit or Loss; If a corporation's revenue is greater than its expenses, then the corporation enjoys a profit. Reporting a profit typically has a positive impact on the value of the stock.",
    category: "financial"
  },
  {
    term: "Revenue",
    definition: "The amount of money the corporation makes. Another word for it is total income.",
    category: "financial"
  },
  {
    term: "Routing Number",
    definition: "The eight- or nine-digit number used to identify your banking institution. If you need to wire money or set up online bill payments, you will need this number.",
    category: "accounts"
  },
  {
    term: "Savings Account",
    definition: "An interest-earning account meant for money you intend to hold for a certain amount of time.",
    category: "accounts"
  },
  {
    term: "Shareholders",
    definition: "For corporations, shareholders are those who own stocks of the company. They have the ultimate power because, by law, they have the right to vote for who sits on the board of directors and sit in leadership positions (e.g., CEO, CFO, etc.) at the company. Shareholders' rights include: ownership, voting, dividends (payouts of the company's profits, which can be in the form of additional stocks or cash), the ability to sell shares, information about the company, like board meeting minutes, and the right to sue if you feel the company is not acting in the best interest of the shareholders.",
    category: "financial"
  },
  {
    term: "Wire Transfer",
    definition: "A wire transfer is a common way to electronically move money from one bank account to another. They can be domestic (between two U.S. accounts) or between a U.S. and an international account. (Consumer Financial Protection Bureau, 2024)",
    category: "transactions"
  },
  {
    term: "Withdrawal",
    definition: "To remove funds from a bank account.",
    category: "transactions"
  }
];

export interface QuizQuestion {
  id: number;
  definitions: string[];
  terms: string[];
  correctAnswers: string[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    definitions: [
      "The eight- or nine-digit number used to identify your banking institution. If you need to wire money or set up online bill payments, you will need this number.",
      "The unique ID number associated with your account. If you need to wire money or set up online bill payments, you will need this number."
    ],
    terms: ["Account Number", "Routing Number"],
    correctAnswers: ["Routing Number", "Account Number"]
  },
  {
    id: 2,
    definitions: [
      "Financial services that operate outside of traditional financial institutions. These include nonbank checkcashing outlets, payday lenders, pawnshops, rent-to-own stores, and auto title lenders.",
      "Chartered financial institutions that can accept deposits, make loans, and offer other financial services.",
      "Member-owned and controlled, not-for-profit, cooperative financial institutions."
    ],
    terms: ["Credit Unions", "Banks", "Alternative Financial Institutions"],
    correctAnswers: ["Alternative Financial Institutions", "Banks", "Credit Unions"]
  },
  {
    id: 3,
    definitions: [
      "A bank account set up and administered by an adult for a minor.",
      "An account meant for everyday transactions and withdrawals.",
      "An interest-earning account meant for money you intend to hold for a certain amount of time."
    ],
    terms: ["Checking Account", "Savings Account", "Custodial Account"],
    correctAnswers: ["Custodial Account", "Checking Account", "Savings Account"]
  },
  {
    id: 4,
    definitions: [
      "The amount of money the corporation makes.",
      "The business activities that the corporation pays for.",
      "The ending amount of the money the corporation makes minus the business activities the corporation paid for."
    ],
    terms: ["Expenses", "Revenue", "Profit or Loss"],
    correctAnswers: ["Revenue", "Expenses", "Profit or Loss"]
  },
  {
    id: 5,
    definitions: [
      "The amount of money in a bank account that you have access to right now, factoring in pending transactions or deposits/withdrawals.",
      "The amount of money in a bank account that does not factor in pending transactions or deposits/withdrawals."
    ],
    terms: ["Current Balance", "Available Balance"],
    correctAnswers: ["Available Balance", "Current Balance"]
  }
];

// Helper function to randomize vocabulary terms
export function getRandomizedTerms(): VocabularyTerm[] {
  return [...BANKING_VOCABULARY].sort(() => Math.random() - 0.5);
}

// Helper function to get terms by category
export function getTermsByCategory(category: VocabularyTerm['category']): VocabularyTerm[] {
  return BANKING_VOCABULARY.filter(term => term.category === category);
}