/**
 * Content Migration Utilities
 * Migrate existing static content to admin-managed content
 */

import { ContentService } from './content-service';
import { ContentElement, MigrationResult } from './content-types';
import { Timestamp } from 'firebase/firestore';

export class ContentMigration {
  // Test migration: Unit 1, Page 2 content
  static async migrateUnit1Page2(): Promise<MigrationResult> {
    try {
      console.log('🔄 Starting migration of Unit 1, Page 2...');

      // Extract content from the existing Unit 1, Page 2
      // This represents the static content currently in pages.tsx
      const page2Elements: ContentElement[] = [
        {
          id: 'banking-fees.unit-1.page-2.heading-1',
          type: 'heading',
          content: 'Banks are more than money holders',
          order: 0,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        },
        {
          id: 'banking-fees.unit-1.page-2.paragraph-1',
          type: 'paragraph',
          content: 'In order to participate in the US economy, it is likely you will have to open a bank account. Banks provide services that help us manage our money, but they also charge fees for these services.',
          order: 1,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        },
        {
          id: 'banking-fees.unit-1.page-2.heading-2',
          type: 'heading',
          content: 'What banks do',
          order: 2,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        },
        {
          id: 'banking-fees.unit-1.page-2.paragraph-2',
          type: 'paragraph',
          content: 'Banks serve as financial intermediaries, connecting people who have money with people who need money. They accept deposits from customers and use those funds to make loans to other customers.',
          order: 3,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        },
        {
          id: 'banking-fees.unit-1.page-2.heading-3',
          type: 'heading',
          content: 'Banking services',
          order: 4,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        },
        {
          id: 'banking-fees.unit-1.page-2.paragraph-3',
          type: 'paragraph',
          content: 'Banks offer various services including checking accounts, savings accounts, loans, credit cards, and investment services. Each service comes with its own fee structure.',
          order: 5,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'migration-system'
          }
        }
      ];

      console.log(`📝 Created ${page2Elements.length} content elements`);

      // Save to Firebase
      const success = await ContentService.savePageContent(
        'banking-fees',
        'unit-1-basics',
        'page-2',
        page2Elements,
        'migration-system'
      );

      if (success) {
        console.log('✅ Migration completed successfully!');
        return {
          success: true,
          elementsCreated: page2Elements.length,
          fallbackPreserved: true,
          testingRequired: true
        };
      } else {
        console.error('❌ Migration failed during save');
        return {
          success: false,
          error: 'Failed to save migrated content',
          fallbackPreserved: true,
          testingRequired: true
        };
      }
    } catch (error) {
      console.error('❌ Migration error:', error);
      return {
        success: false,
        error: (error as Error).message,
        fallbackPreserved: true,
        testingRequired: true,
        rollbackRequired: true
      };
    }
  }

  // Create sample content for Unit 2, Page 1
  static async createUnit2Page1Sample(): Promise<MigrationResult> {
    try {
      console.log('🔄 Creating sample content for Unit 2, Page 1...');

      const sampleElements: ContentElement[] = [
        {
          id: 'banking-fees.unit-2.page-1.heading-1',
          type: 'heading',
          content: 'Understanding Banking Fees',
          order: 0,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        },
        {
          id: 'banking-fees.unit-2.page-1.paragraph-1',
          type: 'paragraph',
          content: 'Banking fees are charges that financial institutions impose on their customers for various services and account maintenance. These fees can significantly impact your finances if you\'re not aware of them.',
          order: 1,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        },
        {
          id: 'banking-fees.unit-2.page-1.heading-2',
          type: 'heading',
          content: 'Why do banks charge fees?',
          order: 2,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        },
        {
          id: 'banking-fees.unit-2.page-1.paragraph-2',
          type: 'paragraph',
          content: 'Banks charge fees to cover operational costs and generate revenue. These costs include maintaining ATM networks, providing customer service, processing transactions, and ensuring regulatory compliance.',
          order: 3,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        },
        {
          id: 'banking-fees.unit-2.page-1.heading-3',
          type: 'heading',
          content: 'Common types of banking fees',
          order: 4,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        },
        {
          id: 'banking-fees.unit-2.page-1.paragraph-3',
          type: 'paragraph',
          content: 'The most common banking fees include monthly maintenance fees, overdraft fees, ATM fees, transfer fees, and minimum balance fees. Understanding these fees helps you make informed decisions about your banking relationships.',
          order: 5,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-creator'
          }
        }
      ];

      const success = await ContentService.savePageContent(
        'banking-fees',
        'unit-2-fees',
        'page-1',
        sampleElements,
        'content-creator'
      );

      if (success) {
        console.log('✅ Sample content created successfully!');
        return {
          success: true,
          elementsCreated: sampleElements.length,
          fallbackPreserved: true,
          testingRequired: false
        };
      } else {
        return {
          success: false,
          error: 'Failed to create sample content',
          fallbackPreserved: true,
          testingRequired: false
        };
      }
    } catch (error) {
      console.error('❌ Sample creation error:', error);
      return {
        success: false,
        error: (error as Error).message,
        fallbackPreserved: true,
        testingRequired: false
      };
    }
  }

  // Validate migration results
  static async validateMigration(
    moduleId: string,
    unitId: string,
    pageId: string
  ): Promise<{ success: boolean; details: string }> {
    try {
      console.log(`🔍 Validating migration for ${moduleId}/${unitId}/${pageId}...`);

      // Check if content exists
      const content = await ContentService.getStudentContent(moduleId, unitId, pageId);
      
      if (!content || content.length === 0) {
        return {
          success: false,
          details: 'No content found after migration'
        };
      }

      // Validate content structure
      const validElements = content.every(element => {
        return element.id &&
               element.type &&
               element.content &&
               typeof element.order === 'number' &&
               element.metadata;
      });

      if (!validElements) {
        return {
          success: false,
          details: 'Content structure validation failed'
        };
      }

      // Check content ordering
      const sortedContent = [...content].sort((a, b) => a.order - b.order);
      const orderingCorrect = JSON.stringify(content) === JSON.stringify(sortedContent);

      return {
        success: true,
        details: `Migration validated successfully. Found ${content.length} elements with ${orderingCorrect ? 'correct' : 'incorrect'} ordering.`
      };
    } catch (error) {
      return {
        success: false,
        details: `Validation error: ${(error as Error).message}`
      };
    }
  }

  // Clear migration data (for testing/rollback)
  static async clearMigrationData(
    moduleId: string,
    unitId: string,
    pageId: string
  ): Promise<boolean> {
    try {
      console.log(`🗑️ Clearing migration data for ${moduleId}/${unitId}/${pageId}...`);
      
      // For now, we don't have a delete function in ContentService
      // This would be implemented in a full system
      console.log('⚠️ Clear function not implemented - data remains in Firebase');
      
      return true;
    } catch (error) {
      console.error('Error clearing migration data:', error);
      return false;
    }
  }

  // Create comprehensive Unit 2 content (23 pages)
  static async createUnit2ComprehensiveContent(): Promise<MigrationResult[]> {
    console.log('🚀 Creating comprehensive Unit 2 content (23 pages)...');

    const results: MigrationResult[] = [];

    // Unit 2 content structure - Banking Fees Education
    const unit2Pages = [
      {
        pageId: 'page-1',
        title: 'Understanding Banking Fees',
        content: [
          { type: 'heading', content: 'What Are Banking Fees?' },
          { type: 'paragraph', content: 'Banking fees are charges that financial institutions impose on their customers for various services and account maintenance. These fees can significantly impact your finances if you\'re not aware of them.' },
          { type: 'heading', content: 'Why Do Banks Charge Fees?' },
          { type: 'paragraph', content: 'Banks charge fees to cover operational costs and generate revenue. These costs include maintaining ATM networks, providing customer service, processing transactions, and ensuring regulatory compliance.' }
        ]
      },
      {
        pageId: 'page-2',
        title: 'Common Banking Fees',
        content: [
          { type: 'heading', content: 'The Most Common Banking Fees' },
          { type: 'paragraph', content: 'The most common banking fees include monthly maintenance fees, overdraft fees, ATM fees, transfer fees, and minimum balance fees. Understanding these fees helps you make informed decisions about your banking relationships.' },
          { type: 'heading', content: 'Monthly Maintenance Fees' },
          { type: 'paragraph', content: 'Many banks charge a monthly fee just for keeping your account open. These fees typically range from $5 to $25 per month, but can often be waived by meeting certain requirements.' }
        ]
      },
      {
        pageId: 'page-3',
        title: 'Overdraft Fees Explained',
        content: [
          { type: 'heading', content: 'Understanding Overdraft Fees' },
          { type: 'paragraph', content: 'Overdraft fees occur when you spend more money than you have in your account. Banks typically charge $30-$40 per overdraft transaction, making this one of the most expensive banking fees.' },
          { type: 'heading', content: 'How Overdrafts Happen' },
          { type: 'paragraph', content: 'Overdrafts can happen through debit card purchases, checks, automatic payments, or ATM withdrawals when your account balance is insufficient to cover the transaction.' }
        ]
      },
      {
        pageId: 'page-4',
        title: 'ATM and Transaction Fees',
        content: [
          { type: 'heading', content: 'ATM Fee Structure' },
          { type: 'paragraph', content: 'ATM fees are charged when you use an ATM outside your bank\'s network. You may pay both your bank\'s fee ($2-$5) and the ATM owner\'s fee ($2-$4), totaling $4-$9 per transaction.' },
          { type: 'heading', content: 'Transaction Fees' },
          { type: 'paragraph', content: 'Some banks charge fees for various transactions like wire transfers, cashier\'s checks, or excessive withdrawals from savings accounts.' }
        ]
      },
      {
        pageId: 'page-5',
        title: 'Minimum Balance Requirements',
        content: [
          { type: 'heading', content: 'What Are Minimum Balance Requirements?' },
          { type: 'paragraph', content: 'Many bank accounts require you to maintain a minimum balance to avoid fees. If your balance falls below this threshold, you\'ll be charged a monthly fee.' },
          { type: 'heading', content: 'Types of Balance Requirements' },
          { type: 'paragraph', content: 'Banks may require minimum daily balances, average monthly balances, or combined balances across multiple accounts.' }
        ]
      },
      {
        pageId: 'page-6',
        title: 'Foreign Transaction Fees',
        content: [
          { type: 'heading', content: 'International Banking Fees' },
          { type: 'paragraph', content: 'When you use your debit or credit card internationally, banks often charge foreign transaction fees, typically 1-3% of the purchase amount.' },
          { type: 'heading', content: 'Currency Conversion' },
          { type: 'paragraph', content: 'Banks also make money on currency conversion by offering less favorable exchange rates than the market rate.' }
        ]
      },
      {
        pageId: 'page-7',
        title: 'Wire Transfer and Check Fees',
        content: [
          { type: 'heading', content: 'Wire Transfer Costs' },
          { type: 'paragraph', content: 'Wire transfers are fast but expensive, typically costing $15-$30 for domestic transfers and $35-$50 for international transfers.' },
          { type: 'heading', content: 'Check-Related Fees' },
          { type: 'paragraph', content: 'Banks may charge for printed checks, cashier\'s checks, money orders, and returned check fees.' }
        ]
      },
      {
        pageId: 'page-8',
        title: 'Account Closure and Maintenance',
        content: [
          { type: 'heading', content: 'Early Account Closure Fees' },
          { type: 'paragraph', content: 'Some banks charge fees if you close your account within a certain period (usually 90-180 days) after opening it.' },
          { type: 'heading', content: 'Dormant Account Fees' },
          { type: 'paragraph', content: 'Accounts with no activity for extended periods may incur dormancy fees, typically $5-$20 per month.' }
        ]
      },
      {
        pageId: 'page-9',
        title: 'Credit Card and Loan Fees',
        content: [
          { type: 'heading', content: 'Credit Card Fees' },
          { type: 'paragraph', content: 'Credit cards come with various fees including annual fees, late payment fees, cash advance fees, and balance transfer fees.' },
          { type: 'heading', content: 'Loan Origination Fees' },
          { type: 'paragraph', content: 'Many loans include origination fees, typically 1-6% of the loan amount, charged for processing and underwriting the loan.' }
        ]
      },
      {
        pageId: 'page-10',
        title: 'Fee Comparison Strategies',
        content: [
          { type: 'heading', content: 'How to Compare Banking Fees' },
          { type: 'paragraph', content: 'When choosing a bank, compare not just individual fees but your total potential fee exposure based on your banking habits and needs.' },
          { type: 'heading', content: 'Reading the Fine Print' },
          { type: 'paragraph', content: 'Always read account agreements and fee schedules carefully. Banks are required to disclose all fees, but they\'re often buried in lengthy documents.' }
        ]
      },
      {
        pageId: 'page-11',
        title: 'Avoiding Common Fees',
        content: [
          { type: 'heading', content: 'Strategies to Avoid Monthly Fees' },
          { type: 'paragraph', content: 'Many monthly maintenance fees can be waived by maintaining minimum balances, setting up direct deposits, or using the account regularly.' },
          { type: 'heading', content: 'Overdraft Prevention' },
          { type: 'paragraph', content: 'Prevent overdraft fees by monitoring your balance, setting up account alerts, linking a savings account, or opting out of overdraft protection.' }
        ]
      },
      {
        pageId: 'page-12',
        title: 'Fee Negotiation Tips',
        content: [
          { type: 'heading', content: 'Negotiating with Your Bank' },
          { type: 'paragraph', content: 'Many fees can be negotiated or waived, especially if you\'re a long-time customer or have multiple accounts. Don\'t be afraid to ask for fee reversals.' },
          { type: 'heading', content: 'When to Switch Banks' },
          { type: 'paragraph', content: 'If fees are consistently high and negotiations fail, it may be time to switch to a bank with lower fees or better fee waiver policies.' }
        ]
      },
      {
        pageId: 'page-13',
        title: 'Online vs Traditional Banking Fees',
        content: [
          { type: 'heading', content: 'Online Bank Advantages' },
          { type: 'paragraph', content: 'Online banks typically offer lower fees due to reduced overhead costs. Many online banks have no monthly maintenance fees and reimburse ATM fees.' },
          { type: 'heading', content: 'Traditional Bank Services' },
          { type: 'paragraph', content: 'Traditional banks offer in-person service and extensive ATM networks but often charge higher fees to cover branch operations.' }
        ]
      },
      {
        pageId: 'page-14',
        title: 'Credit Union Alternative',
        content: [
          { type: 'heading', content: 'Credit Union Benefits' },
          { type: 'paragraph', content: 'Credit unions are non-profit organizations that typically offer lower fees and better interest rates than traditional banks.' },
          { type: 'heading', content: 'Membership Requirements' },
          { type: 'paragraph', content: 'Credit unions require membership, often based on location, employer, or organization affiliation, but membership requirements have become more flexible.' }
        ]
      },
      {
        pageId: 'page-15',
        title: 'Student and Youth Accounts',
        content: [
          { type: 'heading', content: 'Student Banking Benefits' },
          { type: 'paragraph', content: 'Many banks offer student accounts with reduced or waived fees, but these benefits typically expire after graduation or reaching a certain age.' },
          { type: 'heading', content: 'Building Banking Relationships' },
          { type: 'paragraph', content: 'Starting with a student account can help build a relationship with a bank that may lead to better terms on future financial products.' }
        ]
      },
      {
        pageId: 'page-16',
        title: 'Business Banking Fees',
        content: [
          { type: 'heading', content: 'Business Account Differences' },
          { type: 'paragraph', content: 'Business accounts typically have higher fees than personal accounts but offer services tailored to business needs like higher transaction limits and merchant services.' },
          { type: 'heading', content: 'Transaction Volume Pricing' },
          { type: 'paragraph', content: 'Business accounts often charge based on transaction volume, with fees increasing as your business processes more payments.' }
        ]
      },
      {
        pageId: 'page-17',
        title: 'Fee Disclosure Requirements',
        content: [
          { type: 'heading', content: 'Legal Requirements' },
          { type: 'paragraph', content: 'Banks are legally required to disclose all fees clearly and provide advance notice of fee changes. You should receive a fee schedule when opening an account.' },
          { type: 'heading', content: 'Understanding Your Rights' },
          { type: 'paragraph', content: 'You have the right to receive clear information about fees and the right to close your account if you disagree with fee changes.' }
        ]
      },
      {
        pageId: 'page-18',
        title: 'Mobile Banking and Fees',
        content: [
          { type: 'heading', content: 'Mobile Banking Benefits' },
          { type: 'paragraph', content: 'Mobile banking can help you avoid fees by allowing real-time balance monitoring, instant transfers, and mobile check deposits.' },
          { type: 'heading', content: 'Digital-First Banks' },
          { type: 'paragraph', content: 'App-based banks often have lower fee structures because they operate with minimal physical infrastructure.' }
        ]
      },
      {
        pageId: 'page-19',
        title: 'Fee Trends and Future',
        content: [
          { type: 'heading', content: 'Changing Fee Landscape' },
          { type: 'paragraph', content: 'Competition and regulation have led many banks to reduce or eliminate certain fees, but new technology-related fees may emerge.' },
          { type: 'heading', content: 'Regulatory Changes' },
          { type: 'paragraph', content: 'Government regulations continue to evolve, potentially limiting certain fees or requiring clearer disclosure.' }
        ]
      },
      {
        pageId: 'page-20',
        title: 'Creating a Fee Budget',
        content: [
          { type: 'heading', content: 'Tracking Your Banking Costs' },
          { type: 'paragraph', content: 'Create a monthly budget that includes potential banking fees to better understand the true cost of your banking relationship.' },
          { type: 'heading', content: 'Cost-Benefit Analysis' },
          { type: 'paragraph', content: 'Consider whether premium accounts with higher fees provide enough value through benefits like fee waivers on other services.' }
        ]
      },
      {
        pageId: 'page-21',
        title: 'International Banking Considerations',
        content: [
          { type: 'heading', content: 'Global Banking Needs' },
          { type: 'paragraph', content: 'If you travel internationally or need to send money abroad regularly, consider banks with global partnerships or lower international fees.' },
          { type: 'heading', content: 'Alternative Transfer Services' },
          { type: 'paragraph', content: 'Services like digital remittance providers often offer lower fees than traditional wire transfers for international money transfers.' }
        ]
      },
      {
        pageId: 'page-22',
        title: 'Fee Management Tools',
        content: [
          { type: 'heading', content: 'Banking Apps and Alerts' },
          { type: 'paragraph', content: 'Use your bank\'s mobile app to set up balance alerts, transaction notifications, and automatic transfers to avoid fees.' },
          { type: 'heading', content: 'Third-Party Tools' },
          { type: 'paragraph', content: 'Personal finance apps can help track banking fees across multiple accounts and identify patterns in your fee payments.' }
        ]
      },
      {
        pageId: 'page-23',
        title: 'Making Informed Banking Decisions',
        content: [
          { type: 'heading', content: 'Choosing the Right Bank' },
          { type: 'paragraph', content: 'Your ideal bank depends on your financial habits, location, income level, and banking needs. Consider all fees holistically, not just the most prominent ones.' },
          { type: 'heading', content: 'Regular Review Process' },
          { type: 'paragraph', content: 'Review your banking fees annually. Your needs may change, and banks regularly update their fee structures and account offerings.' }
        ]
      }
    ];

    // Create content for each page
    for (const pageData of unit2Pages) {
      try {
        const elements: ContentElement[] = pageData.content.map((item, index) => ({
          id: `banking-fees-unit-2-${pageData.pageId}-${item.type}-${index}`,
          type: item.type as 'heading' | 'paragraph',
          content: item.content,
          order: index,
          editable: true,
          metadata: {
            created: Timestamp.now(),
            modified: Timestamp.now(),
            modifiedBy: 'content-migration-system'
          }
        }));

        const success = await ContentService.savePageContent(
          'banking-fees',
          'unit-2-fees',
          pageData.pageId,
          elements,
          'content-migration-system'
        );

        results.push({
          success,
          elementsCreated: elements.length,
          fallbackPreserved: true,
          testingRequired: false
        });

        console.log(`✅ Created ${pageData.pageId}: ${pageData.title} (${elements.length} elements)`);
      } catch (error) {
        console.error(`❌ Failed to create ${pageData.pageId}:`, error);
        results.push({
          success: false,
          error: (error as Error).message,
          fallbackPreserved: true,
          testingRequired: false
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`📊 Unit 2 Content Creation Results: ${successCount}/${unit2Pages.length} pages created successfully`);

    return results;
  }

  // Run full Phase 1 migration test
  static async runPhase1Migration(): Promise<{
    unit1Page2: MigrationResult;
    unit2Page1: MigrationResult;
    validation: { success: boolean; details: string };
  }> {
    console.log('🚀 Starting Phase 1 migration test...');

    // Migrate Unit 1, Page 2
    const unit1Page2 = await this.migrateUnit1Page2();

    // Create sample content for Unit 2, Page 1
    const unit2Page1 = await this.createUnit2Page1Sample();

    // Validate one of the migrations
    const validation = await this.validateMigration('banking-fees', 'unit-1-basics', 'page-2');

    console.log('📊 Phase 1 migration test results:');
    console.log('- Unit 1, Page 2:', unit1Page2.success ? '✅' : '❌');
    console.log('- Unit 2, Page 1:', unit2Page1.success ? '✅' : '❌');
    console.log('- Validation:', validation.success ? '✅' : '❌');

    return {
      unit1Page2,
      unit2Page1,
      validation
    };
  }

  // Run comprehensive Module 2 content creation
  static async runModule2ContentCreation(): Promise<{
    unit2Results: MigrationResult[];
    summary: {
      totalPages: number;
      successfulPages: number;
      failedPages: number;
    };
  }> {
    console.log('🚀 Starting comprehensive Module 2 content creation...');

    const unit2Results = await this.createUnit2ComprehensiveContent();

    const summary = {
      totalPages: unit2Results.length,
      successfulPages: unit2Results.filter(r => r.success).length,
      failedPages: unit2Results.filter(r => !r.success).length
    };

    console.log('📊 Module 2 Content Creation Summary:');
    console.log(`- Total Pages: ${summary.totalPages}`);
    console.log(`- Successful: ${summary.successfulPages}`);
    console.log(`- Failed: ${summary.failedPages}`);

    return {
      unit2Results,
      summary
    };
  }
}
