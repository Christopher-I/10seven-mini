/**
 * Pages 36-43: Account Closures, ChexSystems, Response/Prevention Strategies, Transition, and Works Cited
 * Educational content about account closures, ChexSystems debanking, what to do when accounts close, transition to next section, and works cited
 */

'use client';

import { useState } from 'react';
import {
  ContentBox,
  Text,
  Stack,
  Center,
  PageNavigation
} from '@/core/design-system';

interface PageProps {
  onStepComplete?: (stepData: any) => void;
  stepData?: any;
}

// Page 36: Account Closures Introduction
export function Page36({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Let's talk about something else that could have happened. In some cases, the bank may just close your account without warning.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              What?!
            </Text>

            <div className="space-y-4">
              <div>
                <Text className="text-lg text-gray-700">
                  Common reasons this can happen include inactivity or low usage. But, unresolved overdrafts can also lead to account closure. If your account remains in the negative for too many days, you may get charged additional overdraft fees. If too many overdraft fees occur and go unpaid, the bank may close down your account (Rodriguez, 2023).
                </Text>
              </div>

              <div>
                <Text className="text-lg text-gray-700 font-semibold">
                  How can they do that?!
                </Text>
                <Text className="text-lg text-gray-700">
                  Generally, banks may close accounts for any reason and without notice. Can you see why some might say this is unfair or unjust? But it happens more often than you think. If a bank closes your account, it isn't required to notify you, so you may not receive a notification informing you of the closure (Lieber, 2023; Rodriguez, 2023; "Chex Systems, Inc. | CFPB, 2025). However, you can sign up for alerts, as we suggested on the previous page (Rodriguez, 2023).
                </Text>
              </div>
            </div>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 36 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 37: Wait, they can just close my account without telling me?
export function Page37({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Wait, they can just close my account without telling me?
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Yes. There is no federal law requiring banks to notify account holders if they plan to close their accounts (source).
            </Text>

            <Text className="text-lg text-gray-700">
              The bank is also required to return any money that may have been in the account, which may be received in the form of a check deposited into a different account that the bank has opened for you instead (Lieber, 2023; CPFB, 2023).
            </Text>

            <Text className="text-lg text-gray-700">
              At first, a bank account does not have a direct impact on your credit score (like, say, having your credit card closed), but this could become a problem if your account has any outstanding balances, such as unpaid overdraft fees. In other words, your outstanding balance could eventually be treated as if the bank extended a line of credit to you (i.e., you borrowed money from the bank) (Overdraft and Nonsufficient Fund Fees Insights from the Making Ends Meet Survey and Consumer Credit Panel, n.d., p. 26).
            </Text>

            <ContentBox variant="callout" className="bg-red-50 border border-red-200">
              <Text className="text-gray-700">
                Then they might send this debt information to a collection agency, causing a negative report on your credit by the credit bureaus, which can decrease your credit score (Rodriguez, 2023).
              </Text>
            </ContentBox>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 37 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 38: ChexSystems and Debanking
export function Page38({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            This is more common than you may think.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              The Senate Committee on Banking, Housing, and Urban Affairs recently looked into widespread debanking in the US. 8,056 complaints were reviewed, with most pertaining to the Big 4 US banks. Complaints cited a lack of communication about account closures, a lack of a clear process for recovery or appeals, and resulting financial hardship due to lack of account. It was suggested that federal regulation be implemented to help protect consumers, but since the Trump administration began leading the CFPB again in 2025, the agency has chosen to undo these protections and rulings (U.S. Senate Committee on Banking, Housing, and Urban Affairs, 2025).
            </Text>

            <Text className="text-lg text-gray-700">
              Note that if you have a "bad" banking history, this will likely show up on ChexSystems, a database financial institutions use to track banking history. Kind of like a credit bureau but for banking. You can request a report from ChexSystems if you want to check your banking history. To learn more, you can click here. How does this happen exactly? Ultimately there is no law prohibiting this practice, and as such, banks' policies govern what they can and cannot do in these circumstances. However, many banks' policies explain why they may close your account:
            </Text>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* Not enough activity */}
              <div className="space-y-3">
                <Text className="text-lg font-semibold text-gray-900">
                  Not enough activity in your account
                </Text>
                <ul className="space-y-2 text-gray-700">
                  <li className="text-base">
                    According to the deposit agreements of major banks like Chase, Wells Fargo, and Bank of America, a bank may close your account if you maintain little to no activity and keep it at a zero balance.
                  </li>
                  <li className="text-base">
                    Even if you maintain a balance but rarely engage in any activity, like online transfers or deposits for an extended time, your bank may consider your account dormant and close your account.
                  </li>
                  <li className="text-base">
                    According to HelpWithMyBank.org (a website run by the federal agency charged with regulating national banks), an account is considered abandoned or unclaimed when there is no customer-initiated activity or contact for a period of three to five years. However, most bank policies say that an account is considered dormant if there is no activity within thirty to sixty days.
                  </li>
                  <li className="text-base">
                    Ultimately, banks' policies prevail unless a law is enacted. As such, we invite you to check how the banks define things like dormant accounts.
                  </li>
                </ul>
              </div>

              {/* Excess overdraft fees */}
              <div className="space-y-3">
                <Text className="text-lg font-semibold text-gray-900">
                  Excess overdraft fees
                </Text>
                <ul className="space-y-2 text-gray-700">
                  <li className="text-base">
                    Overdrafting your account may result in a payment not going through and/or multiple overdraft fees.
                  </li>
                  <li className="text-base">
                    Banks tend to take action if they notice a consistent negative balance or failure to address it. These consequences are also typically outlined in your account's terms and conditions, which is why consumer advocates often recommend you review them. This is sage advice, and we acknowledge that the terms and conditions for anything are rarely accessible because they are riddled with legal language and seem to go on forever.
                  </li>
                </ul>
              </div>

              {/* Fraudulent activity */}
              <div className="space-y-3">
                <Text className="text-lg font-semibold text-gray-900">
                  Fraudulent activity
                </Text>
                <ul className="space-y-2 text-gray-700">
                  <li className="text-base">
                    If a bank suspects that you've been a victim of identity theft, it may close your account to protect against any further fraudulent activity.
                  </li>
                  <li className="text-base">
                    This suspicion usually arises during cases such as frequent or significant money transfers or withdrawals.
                  </li>
                </ul>
              </div>
            </div>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 38 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 39: Response strategies if account closes
export function Page39({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Remember that these fees and systems were designed to maximize profits for shareholders, first and foremost. The fees you incur are NOT your fault.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Most banks will list out the types of fees to expect; however, advice is often centered around "keeping enough money in your account." This puts the onus on you instead of them. We invite you to consider the different ways you can respond to bank fees and the practice of debit resequencing. You know what's best for you, so our hope is this list of approaches empowers you to consider what you want to do.
            </Text>

            <div className="space-y-6 mt-6">
              {/* Checklist items */}
              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Learn more about the fees your bank charges
                </Text>
                <Text className="text-base text-gray-700 mb-2">
                  Banks will typically list what fees they charge for different types of accounts they offer. For example, Bank of America lists out its fees for each account on their website. Note how each account comes with a different set of fees and requirements. Confusing? It's allowed to be (Bank of America, 2025).
                </Text>
                <Text className="text-sm text-gray-600 italic">
                  Things to consider: New fees come out and banks can change the names quite a bit—hard to find or buried in legalese—it is taxing/shame inducing and confusing.
                </Text>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Overdraft is an opt IN by default. So you actually get to decide if you want to opt in or opt out.
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  When you open a bank account, banks automatically assume you want overdraft and even may pre-select that as an option. This is often why people have overdraft without knowing it was actually a choice. If you would like to opt out, you can contact your bank and opt out. In that case, all ATM and one-time debit card transactions that exceed the funds in your account will be rejected, and you won't pay an overdraft fee (Stein, 2017).
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  It is worth noting, though, that if you opt out of overdraft and your transaction declines, the bank can charge you a nonsufficient funds fee—a charge from a financial institution for declining a transaction due to insufficient funds in an account, such as a bounced check or a failed ACH payment (CFPB, 2023). Overdrafts occur if the financial institution covers the transaction—thereby extending credit to the consumer—while NSFs occur when the financial institution does not cover the transaction.
                </Text>

                <Text className="text-base text-gray-700 mb-3">
                  By default you will not have overdraft "protection" because overdraft is an opt in feature. When you are opening an account, the bank will ask if you want overdraft protection. Oftentimes banks only mention the benefits of having overdraft and quickly assume you'll want it, but now with this information you get to make the decision that is best for you.
                </Text>

                <div className="mt-4 space-y-3">
                  <Text className="text-base text-gray-900 font-semibold">
                    There are valid reasons for opting in and valid reasons for remaining opted out.
                  </Text>

                  <div>
                    <Text className="text-base text-gray-900 font-medium">Reasons you may opt in:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li className="text-gray-700">You may want to ensure that your transactions go through and don't get declined. For example, to ensure that your electricity or water does not get turned off due to nonpayment, you opt in to overdraft because your utilities will get paid.</li>
                      <li className="text-gray-700">You may feel that you are very engaged and actively monitor your account, so you have confidence about your ability to manage your balance and hopefully avoid overdraft fees, especially now that you know about debit resequencing.</li>
                    </ul>
                  </div>

                  <div>
                    <Text className="text-base text-gray-900 font-medium">Reasons you may remain opted out:</Text>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li className="text-gray-700">You may be more overwhelmed with feeling like you'll constantly have to monitor your account balance, so you'd rather the transaction decline.</li>
                      <li className="text-gray-700">You'd like to avoid paying overdraft fees altogether.</li>
                    </ul>
                  </div>

                  <Text className="text-base text-gray-900 font-medium mt-3">
                    You are the authority on what makes the most sense for you. And, as we said, there are valid reasons for either choice. We hope you feel empowered even more so with this information to decide what's in your financial best interest.
                  </Text>
                </div>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Linking your accounts
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  If you have the ability to open a savings account with a minimum required amount of cash, you can link your savings account to your checking account as a potential fail-safe. Most banks will allow you to do this, so you take from the savings account instead of the overdraft (Vise, 2025).
                </Text>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-3">
                  <Text className="text-sm text-gray-800">
                    <strong>Note:</strong> You could be charged a fee for transferring from your savings account if that happens "too frequently," which would be defined by the bank. Essentially, banks expect the money in your savings account to remain as untouched as possible. While that makes sense broadly, it may not be realistic for everyone, especially those who are cash-strapped for reasons beyond their control, like making an unlivable wage. When this happens banks may charge you a fee, and at the most extreme, they may convert your savings account to a checking account because of the frequent activity.
                  </Text>
                </div>

                <Text className="text-base text-gray-700">
                  As before, there are valid reasons to link your checking and savings accounts—the biggest being that, at some banks, if you do this they claim you can avoid fees. However, given banks' policies and expectations about how infrequently they expect you to transfer money from your savings, if you feel as though those expectations are too cumbersome, it is understandable why you may not want to do this.
                </Text>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Turning on notifications and/or turning off auto-payments
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  There are many financial educators that suggest that everyone "should" turn on notifications so you know when your account balance is low. The heads-up could make a difference for some, but it also could induce shame or anxiety for others. We invite you to consider how you may react to alerts broadly, and if you feel as though they would benefit you, then consider how frequently you'd like to receive them.
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  The alternative to this is to schedule a time for you to check your bank account. For those who feel like alerts from your bank may cause anxiety or shame, this may be an alternative that aligns more with your participatory style.
                </Text>
                <Text className="text-base text-gray-700">
                  Another alternative you can consider is turning off any automatic payments so that these transactions don't inadvertently drain your account (Vise 2025). This may be helpful for those who feel like they would like to be a bit more "hands-on" when paying their bills—that the act of going in and conducting the transaction will feel more satisfying and grounding than being in auto-pilot. Again, you are the authority and hopefully you feel like you have even more information to make a decision that is in your financial best interest.
                </Text>
              </div>
            </div>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 39 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 40: Prevention strategies
export function Page40({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              There are some ways you can lessen the risk of experiencing an account closure. But remember, it's not your fault that it happens. Banks put these legal practices into place to ensure their future, not necessarily yours (Rodriguez, 2023).
            </Text>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 40 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 41: If closure happens - action steps
export function Page41({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              If you do experience an account closure, all reactions make sense—panic, hesitation, avoidance, wanting to solve things right away. When you feel you are in a better emotional position to handle the situation, we invite you to consider doing the following:
            </Text>

            <div className="space-y-6 mt-6">
              {/* Checklist items */}
              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Contact your bank ASAP
                </Text>
                <Text className="text-base text-gray-700">
                  If you haven't been notified of the closure, you should get in contact with your bank and find out what you need to do to receive your funds ASAP.
                </Text>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Stop direct deposits and automatic withdrawals
                </Text>
                <Text className="text-base text-gray-700">
                  If you have any direct deposits or automatic withdrawals in place, cancel them immediately. If you receive direct deposits from your job, you should make sure to redirect the deposit to another account or opt to receive by check until all has been settled.
                </Text>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  File a complaint
                </Text>
                <Text className="text-base text-gray-700">
                  If you believe your account was wrongly closed, you can submit a complaint to the federal Office of the Comptroller's Customer Assistance Group (File A Complaint, n.d.).
                </Text>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <Text className="text-lg font-semibold text-gray-900 mb-2">
                  Explore other options
                </Text>
                <Text className="text-base text-gray-700 mb-3">
                  Look into opening a different type of account, either at the same bank or a different bank. Be sure to contact your bank and see if they're willing to either reopen your closed account or allow you to open a new one. However, if the bank is unable to help you, you may need to open an account with a new bank or look into a second chance bank account. (Rodriguez, 2023)
                </Text>
                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <Text className="text-base text-gray-800">
                    <strong>Second chance bank accounts</strong> are bank accounts that are specifically designed for people who have had difficulty with traditional banking accounts in the past. Some major banks, such as Capital One, Wells Fargo and PNC, offer them with specific account features.
                  </Text>
                </div>
              </div>
            </div>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 41 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 42: Transition to Next Section
export function Page42({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-6">
            Wow, that was a lot.
          </h2>

          <Stack spacing="md">
            <Text className="text-lg text-gray-700">
              Yep–banking is straightforward and can seem boring, but it is important to understand the mechanisms behind your institution and the larger industry.
            </Text>

            <Text className="text-lg text-gray-700">
              Vulnerable and marginalized populations may know these experiences too well and find it hard to avoid them. Our goal is to make sure you feel empowered to navigate the experiences that come with banking and how to mitigate or address issues as they arise.
            </Text>

            <Text className="text-lg text-gray-700">
              In the next section, we'll talk about WHAT YOU MAY EXPERIENCE psychologically and emotionally when you bank. Whether you've experienced overdraft fees and account closures or you have a financial cushion, it's important to understand how so much of our financial decisions and behaviors have to do with our own personal experiences and past adverse experiences.
            </Text>
          </Stack>
        </ContentBox>

        <PageNavigation onContinue={onStepComplete} onBack={onStepComplete} />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 42 of 43</p>
        </div>
      </Stack>
    </div>
  );
}

// Page 43: Works Cited and Consulted - FINAL PAGE
export function Page43({ onStepComplete }: PageProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 pb-32 md:pb-6">
      <Stack spacing="lg">
        <ContentBox variant="callout" className="bg-transparent border-none">
          <h2 className="text-[28px] font-playfair font-semibold text-gray-900 mb-8 text-center">
            Works Cited and Consulted for this Unit
          </h2>

          <div className="space-y-8">
            {/* Alphabetical Order Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Alphabetical Order
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-700 space-y-3">
                  <p>12 USC Ch. 14: FEDERAL CREDIT UNIONS. (n.d.). Federal Credit Union Act. Retrieved September 27, 2025, from https://uscode.house.gov/view.xhtml?path=/prelim@title12/chapter14&edition=prelim</p>
                  <p>26 CFR § 1.1502-1 - Definitions. (n.d.). LII / Legal Information Institute. Retrieved September 29, 2025, from https://www.law.cornell.edu/cfr/text/26/1.1502-1</p>
                  <p>31 USC 5103: Legal tender. (n.d.). Retrieved September 14, 2025, from https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5103&num=0&edition=prelim</p>
                  <p>Allen, F., Demirguc-Kunt, A., Klapper, L., & Martinez Peria, M. S. (2016). The foundations of financial inclusion: Understanding ownership and use of formal accounts. Journal of Financial Intermediation, 27, 1–30. https://doi.org/10.1016/j.jfi.2015.12.003</p>
                  <p>Anderson, C. (2011, November 7). Judge OKs $410M BofA overdraft settlement. NBC News. https://www.nbcnews.com/id/wbna45198766</p>
                  <p>Bank of America. (2025). Annual Report 2024 [Annual Report]. https://investor.bankofamerica.com/regulatory-and-other-filings/annual-reports/content/0000070858-25-000155/0000070858-25-000155.pdf</p>
                  <p>Baradaran, M. (2017). The Color of Money: Black Banks and the Racial Wealth Gap. The Belknap Press.</p>
                  <p>Barone, A. (n.d.). How Banking Works, Types of Banks, and How To Choose the Best Bank for You. Investopedia. Retrieved September 12, 2025, from https://www.investopedia.com/terms/b/bank.asp</p>
                  <p>Bell, C. (2025, March 27). Senate votes to repeal CFPB's limits on excessive bank overdraft fees. CR Advocacy. https://advocacy.consumerreports.org/press_release/senate-votes-to-repeal-cfpb-limits-on-excessive-bank-overdraft-fees/</p>
                  <p>Bell, C. (2025, March 27). Senate votes to repeal CFPB's limits on excessive bank overdraft fees. CR Advocacy. https://advocacy.consumerreports.org/press_release/senate-votes-to-repeal-cfpb-limits-on-excessive-bank-overdraft-fees/</p>
                  <p>Bennett, K. (2025, September 15). Available Balance vs. Current Balance. Bankrate. https://www.bankrate.com/banking/checking/what-is-your-available-balance/</p>
                  <p>Bradford, T. (2020). Neobanks: Banks by Any Other Name? Federal Reserve Bank of Kansas City.</p>
                  <p>Brandt, F., & Georgiou, K. (2016). Shareholders vs Stakeholders Capitalism. Comparative Corporate Governance and Financial Regulation. https://scholarship.law.upenn.edu/fisch_2016/10</p>
                  <p>CFPB. (n.d.). Financial terms glossary. Consumer Financial Protection Bureau. https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/glossary/</p>
                  <p>Citigroup. (2025). 2024 Annual Report [Annual Report]. https://www.citigroup.com/rcs/citigpa/storage/public/citi-2024-annual-report.pdf</p>
                  <p>Consumer Financial Protection Circular 2022-06. (2022). https://files.consumerfinance.gov/f/documents/cfpb_unanticipated-overdraft-fee-assessment-practices_circular_2022-10.pdf</p>
                  <p>DeYoung, R., & Rice, T. (2004). How do banks make money? The fallacies of fee income. Economic Perspectives, 28(4). https://www.chicagofed.org/publications/economic-perspectives/2004/4qtr2004-part3-deyoung-rice</p>
                  <p>D-NY-12, C. B. (2021). H.R.4277 - 117th Congress (2021-2022): Overdraft Protection Act of 2021. Congress.gov. https://www.congress.gov/bill/117th-congress/house-bill/4277</p>
                  <p>FDIC Quarterly Banking Profile Fourth Quarter 2024 | FDIC.gov. (n.d.). Retrieved September 12, 2025, from https://www.fdic.gov/news/speeches/2025/fdic-quarterly-banking-profile-fourth-quarter-2024</p>
                  <p>fdic140-quarterlyvol3no1-afs-final.pdf. (n.d.).</p>
                  <p>Federal Deposit Insurance Corporation. (2023). 2023 FDIC National Survey of Unbanked and Underbanked Households | FDIC.gov. https://www.fdic.gov/household-survey</p>
                  <p>FRB: Large Commercial Banks-- June 30, 2025. (n.d.). Retrieved September 29, 2025, from https://www.federalreserve.gov/releases/lbr/current/</p>
                  <p>Glossary of Banking Terms and Phrases. (2020, September 12). HelpWithMyBank.Gov. https://www.helpwithmybank.gov/glossary/index-glossary.html</p>
                  <p>Gonzalez, Juan, and Amy Goodman. (2019, October 23). Race for Profit: Keeanga-Yamahtta Taylor on How Banks & Real Estate Biz Undermined Black Homeowners. Democracy Now. democracynow.org/2019/10/22/keeanga_yamahtta_taylor_race_for_profit</p>
                  <p>Grandoni, D. (2011, November 14). The Big Banks Have Plenty of Other Names for Fees. The Atlantic. https://www.theatlantic.com/business/2011/11/these-are-all-other-fees-big-banks-are-now-charging-you/335519/</p>
                  <p>JP Morgan Chase. (2025). 4Q24 Earnings Press Release [Annual Report]. https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2024/4th-quarter/36b3c0a4-3ecd-422e-8167-0a31372f3438.pdf</p>
                  <p>Klebnikov, S. (n.d.). The World's Largest Banks 2025: JPMorgan Tops Global 2000 For Third Straight Year. Forbes. Retrieved September 15, 2025, from https://www.forbes.com/sites/sergeiklebnikov/2025/06/12/the-worlds-largest-banks-2025-jpmorgan-tops-global-2000-for-third-straight-year/</p>
                  <p>National Credit Union Administration. (2025, June 17). Credit Union: Definition, Structure and How it Works. https://ncua.gov/regulation-supervision/manuals-guides/federal-credit-union-charter-application-guide/overview-federal-credit-unions</p>
                  <p>Net Income. (n.d.). FASB. https://asc.fasb.org/</p>
                  <p>Non-Sufficient Funds (NSF) Fees & Overdraft Protection. (2020, September 17). HelpWithMyBank.Gov. https://www.helpwithmybank.gov/help-topics/bank-accounts/nsf-fees-overdraft-protection/index-nsf-fees-overdraft-protection.html</p>
                  <p>Nygaard, V., & Falcettoni, E. (2025). Refining the Definition of the Unbanked. Finance and Economics Discussion Series. https://doi.org/doi.org/10.17016/feds.2025.033</p>
                  <p>Oladapo Olatinsu. (2023). FinTech Disruption and the Compliance Lag: Challenges in Supervising Non-traditional Financial Institutions. International Journal of Science and Research Archive, 10(3), 1458–1472. https://doi.org/10.30574/ijsra.2023.10.2.0985</p>
                  <p>Overdraft and Account Fees | FDIC.gov. (n.d.). Retrieved September 29, 2025, from https://www.fdic.gov/consumer-resource-center/2021-12/overdraft-and-account-fees</p>
                  <p>Penn State Sokolov-Miller Family Financial and Life Skills Center Glossary of Basic Financial Terms. (2017). https://financialliteracy.psu.edu/sites/default/files/FinLit-Glossary-of-Terms.pdf</p>
                  <p>Rhee, R. (2018). A Legal Theory of Shareholder Primacy. Minnesota Law Review. https://scholarship.law.umn.edu/mlr/122</p>
                  <p>Robinson, K. J. (2013, November 22). Savings and Loan Crisis. https://www.federalreservehistory.org/essays/savings-and-loan-crisis</p>
                  <p>Rodriguez, A. (2023, November 18). Did your bank close your account without warning? Here's what you can do. CNBC. https://www.cnbc.com/select/what-to-do-if-bank-closes-your-account/</p>
                  <p>Saeedy, A. (2025, January 16). Four things that helped banks haul in huge profits in 2024. The Wall Street Journal. https://www.wsj.com/finance/banking/bank-profits-2024-charts-3affc3f6?st=RsNXyX&reflink=desktopwebshare_permalink</p>
                  <p>Servon, L. J. (2018). The unbanking of America : how the new middle class survives. Mariner Books.</p>
                  <p>Stempel, J. (2012, February 7). JPMorgan settles overdraft fee case for $110 million. Reuters. https://www.reuters.com/article/markets/wealth/jpmorgan-settles-overdraft-fee-case-for-110-million-idUSTRE8161CS/</p>
                  <p>Sylla, R. (2010). The US Banking System: Origin, Development, and Regulation. History Now: The Journal | Gilder Lehrman Institute of American History, Issue 24. https://www.gilderlehrman.org/history-resources/essays/us-banking-system-origin-development-and-regulation</p>
                  <p>Tempkin, K., & Sawyer, N. (n.d.). Analysis of Alternative Financial Service Providers. The Urban Institute. https://www.urban.org/sites/default/files/alfresco/publication-pdfs/410935-Analysis-of-Alternative-Financial-Service-Providers.PDF</p>
                  <p>The Age of Customer Capitalism. (2010, January 1). Harvard Business Review. https://hbr.org/2010/01/the-age-of-customer-capitalism</p>
                  <p>Wells Fargo. (2025). 2024 Annual Report [Annual Report]. https://www.wellsfargo.com/assets/pdf/about/investor-relations/annual-reports/2024-annual-report.pdf</p>
                  <p>What We Do | FDIC.gov. (n.d.). Retrieved September 14, 2025, from https://www.fdic.gov/about/what-we-do</p>
                  <p>World Bank. (n.d.). Databank Worldbank Metadata Glossary. World Bank Metadate Glossary. https://databank.worldbank.org/metadataglossary/all/series</p>
                </div>
              </div>
            </div>

            {/* Order of Appearance Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Order of Appearance
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-700 space-y-3">
                  <p>12 USC Ch. 14: FEDERAL CREDIT UNIONS. (n.d.). Federal Credit Union Act. Retrieved September 27, 2025, from https://uscode.house.gov/view.xhtml?path=/prelim@title12/chapter14&edition=prelim</p>
                  <p>26 CFR § 1.1502-1 - Definitions. (n.d.). LII / Legal Information Institute. Retrieved September 29, 2025, from https://www.law.cornell.edu/cfr/text/26/1.1502-1</p>
                  <p>31 USC 5103: Legal tender. (n.d.). Retrieved September 14, 2025, from https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title31-section5103&num=0&edition=prelim</p>
                  <p>Allen, F., Demirguc-Kunt, A., Klapper, L., & Martinez Peria, M. S. (2016). The foundations of financial inclusion: Understanding ownership and use of formal accounts. Journal of Financial Intermediation, 27, 1–30. https://doi.org/10.1016/j.jfi.2015.12.003</p>
                  <p>Anderson, C. (2011, November 7). Judge OKs $410M BofA overdraft settlement. NBC News. https://www.nbcnews.com/id/wbna45198766</p>
                  <p>Bank of America. (2025). Annual Report 2024 [Annual Report]. https://investor.bankofamerica.com/regulatory-and-other-filings/annual-reports/content/0000070858-25-000155/0000070858-25-000155.pdf</p>
                  <p>Baradaran, M. (2017). The Color of Money: Black Banks and the Racial Wealth Gap. The Belknap Press.</p>
                  <p>Barone, A. (n.d.). How Banking Works, Types of Banks, and How To Choose the Best Bank for You. Investopedia. Retrieved September 12, 2025, from https://www.investopedia.com/terms/b/bank.asp</p>
                  <p>Bell, C. (2025, March 27). Senate votes to repeal CFPB's limits on excessive bank overdraft fees. CR Advocacy. https://advocacy.consumerreports.org/press_release/senate-votes-to-repeal-cfpb-limits-on-excessive-bank-overdraft-fees/</p>
                  <p>Bell, C. (2025, March 27). Senate votes to repeal CFPB's limits on excessive bank overdraft fees. CR Advocacy. https://advocacy.consumerreports.org/press_release/senate-votes-to-repeal-cfpb-limits-on-excessive-bank-overdraft-fees/</p>
                  <p>Bennett, K. (2025, September 15). Available Balance vs. Current Balance. Bankrate. https://www.bankrate.com/banking/checking/what-is-your-available-balance/</p>
                  <p>Bradford, T. (2020). Neobanks: Banks by Any Other Name? Federal Reserve Bank of Kansas City.</p>
                  <p>Brandt, F., & Georgiou, K. (2016). Shareholders vs Stakeholders Capitalism. Comparative Corporate Governance and Financial Regulation. https://scholarship.law.upenn.edu/fisch_2016/10</p>
                  <p>CFPB. (n.d.). Financial terms glossary. Consumer Financial Protection Bureau. https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/glossary/</p>
                  <p>Citigroup. (2025). 2024 Annual Report [Annual Report]. https://www.citigroup.com/rcs/citigpa/storage/public/citi-2024-annual-report.pdf</p>
                  <p>Consumer Financial Protection Circular 2022-06. (2022). https://files.consumerfinance.gov/f/documents/cfpb_unanticipated-overdraft-fee-assessment-practices_circular_2022-10.pdf</p>
                  <p>DeYoung, R., & Rice, T. (2004). How do banks make money? The fallacies of fee income. Economic Perspectives, 28(4). https://www.chicagofed.org/publications/economic-perspectives/2004/4qtr2004-part3-deyoung-rice</p>
                  <p>D-NY-12, C. B. (2021). H.R.4277 - 117th Congress (2021-2022): Overdraft Protection Act of 2021. Congress.gov. https://www.congress.gov/bill/117th-congress/house-bill/4277</p>
                  <p>FDIC Quarterly Banking Profile Fourth Quarter 2024 | FDIC.gov. (n.d.). Retrieved September 12, 2025, from https://www.fdic.gov/news/speeches/2025/fdic-quarterly-banking-profile-fourth-quarter-2024</p>
                  <p>fdic140-quarterlyvol3no1-afs-final.pdf. (n.d.).</p>
                  <p>Federal Deposit Insurance Corporation. (2023). 2023 FDIC National Survey of Unbanked and Underbanked Households | FDIC.gov. https://www.fdic.gov/household-survey</p>
                  <p>FRB: Large Commercial Banks-- June 30, 2025. (n.d.). Retrieved September 29, 2025, from https://www.federalreserve.gov/releases/lbr/current/</p>
                  <p>Glossary of Banking Terms and Phrases. (2020, September 12). HelpWithMyBank.Gov. https://www.helpwithmybank.gov/glossary/index-glossary.html</p>
                  <p>Gonzalez, Juan, and Amy Goodman. (2019, October 23). Race for Profit: Keeanga-Yamahtta Taylor on How Banks & Real Estate Biz Undermined Black Homeowners. Democracy Now. democracynow.org/2019/10/22/keeanga_yamahtta_taylor_race_for_profit</p>
                  <p>Grandoni, D. (2011, November 14). The Big Banks Have Plenty of Other Names for Fees. The Atlantic. https://www.theatlantic.com/business/2011/11/these-are-all-other-fees-big-banks-are-now-charging-you/335519/</p>
                  <p>JP Morgan Chase. (2025). 4Q24 Earnings Press Release [Annual Report]. https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/quarterly-earnings/2024/4th-quarter/36b3c0a4-3ecd-422e-8167-0a31372f3438.pdf</p>
                  <p>Klebnikov, S. (n.d.). The World's Largest Banks 2025: JPMorgan Tops Global 2000 For Third Straight Year. Forbes. Retrieved September 15, 2025, from https://www.forbes.com/sites/sergeiklebnikov/2025/06/12/the-worlds-largest-banks-2025-jpmorgan-tops-global-2000-for-third-straight-year/</p>
                  <p>National Credit Union Administration. (2025, June 17). Credit Union: Definition, Structure and How it Works. https://ncua.gov/regulation-supervision/manuals-guides/federal-credit-union-charter-application-guide/overview-federal-credit-unions</p>
                  <p>Net Income. (n.d.). FASB. https://asc.fasb.org/</p>
                  <p>Non-Sufficient Funds (NSF) Fees & Overdraft Protection. (2020, September 17). HelpWithMyBank.Gov. https://www.helpwithmybank.gov/help-topics/bank-accounts/nsf-fees-overdraft-protection/index-nsf-fees-overdraft-protection.html</p>
                  <p>Nygaard, V., & Falcettoni, E. (2025). Refining the Definition of the Unbanked. Finance and Economics Discussion Series. https://doi.org/doi.org/10.17016/feds.2025.033</p>
                  <p>Oladapo Olatinsu. (2023). FinTech Disruption and the Compliance Lag: Challenges in Supervising Non-traditional Financial Institutions. International Journal of Science and Research Archive, 10(3), 1458–1472. https://doi.org/10.30574/ijsra.2023.10.2.0985</p>
                  <p>Overdraft and Account Fees | FDIC.gov. (n.d.). Retrieved September 29, 2025, from https://www.fdic.gov/consumer-resource-center/2021-12/overdraft-and-account-fees</p>
                  <p>Penn State Sokolov-Miller Family Financial and Life Skills Center Glossary of Basic Financial Terms. (2017). https://financialliteracy.psu.edu/sites/default/files/FinLit-Glossary-of-Terms.pdf</p>
                  <p>Rhee, R. (2018). A Legal Theory of Shareholder Primacy. Minnesota Law Review. https://scholarship.law.umn.edu/mlr/122</p>
                  <p>Robinson, K. J. (2013, November 22). Savings and Loan Crisis. https://www.federalreservehistory.org/essays/savings-and-loan-crisis</p>
                  <p>Rodriguez, A. (2023, November 18). Did your bank close your account without warning? Here's what you can do. CNBC. https://www.cnbc.com/select/what-to-do-if-bank-closes-your-account/</p>
                  <p>Saeedy, A. (2025, January 16). Four things that helped banks haul in huge profits in 2024. The Wall Street Journal. https://www.wsj.com/finance/banking/bank-profits-2024-charts-3affc3f6?st=RsNXyX&reflink=desktopwebshare_permalink</p>
                  <p>Servon, L. J. (2018). The unbanking of America : how the new middle class survives. Mariner Books.</p>
                  <p>Stempel, J. (2012, February 7). JPMorgan settles overdraft fee case for $110 million. Reuters. https://www.reuters.com/article/markets/wealth/jpmorgan-settles-overdraft-fee-case-for-110-million-idUSTRE8161CS/</p>
                  <p>Sylla, R. (2010). The US Banking System: Origin, Development, and Regulation. History Now: The Journal | Gilder Lehrman Institute of American History, Issue 24. https://www.gilderlehrman.org/history-resources/essays/us-banking-system-origin-development-and-regulation</p>
                  <p>Tempkin, K., & Sawyer, N. (n.d.). Analysis of Alternative Financial Service Providers. The Urban Institute. https://www.urban.org/sites/default/files/alfresco/publication-pdfs/410935-Analysis-of-Alternative-Financial-Service-Providers.PDF</p>
                  <p>The Age of Customer Capitalism. (2010, January 1). Harvard Business Review. https://hbr.org/2010/01/the-age-of-customer-capitalism</p>
                  <p>Wells Fargo. (2025). 2024 Annual Report [Annual Report]. https://www.wellsfargo.com/assets/pdf/about/investor-relations/annual-reports/2024-annual-report.pdf</p>
                  <p>What We Do | FDIC.gov. (n.d.). Retrieved September 14, 2025, from https://www.fdic.gov/about/what-we-do</p>
                  <p>World Bank. (n.d.). Databank Worldbank Metadata Glossary. World Bank Metadate Glossary. https://databank.worldbank.org/metadataglossary/all/series</p>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Completion Message */}
          <ContentBox variant="callout" className="bg-[#E5DEEF] border-none mt-8">
            <Center className="mb-6">
              <Text className="text-2xl font-bold text-gray-900">
                Congratulations! You've completed Unit 2
              </Text>
            </Center>

            <Stack spacing="sm">
              <Text className="text-lg text-gray-900">
                You now have a deeper understanding of how banking fees work and how to navigate challenging banking situations.
              </Text>

              <Text className="text-lg font-semibold text-gray-900">
                Remember: The fees you've paid are NOT your fault, and you deserve better.
              </Text>
            </Stack>
          </ContentBox>
        </ContentBox>

        <PageNavigation
          onContinue={() => {
            onStepComplete?.({ unitCompleted: true });
            // Use window.location instead of router.push to avoid bundler conflicts
            setTimeout(() => {
              window.location.href = '/banking-fees';
            }, 500);
          }}
          onBack={onStepComplete}
        />

        <div className="hidden md:block text-center mt-8">
          <p className="text-sm text-gray-500">Page 43 of 43</p>
        </div>
      </Stack>
    </div>
  );
}
