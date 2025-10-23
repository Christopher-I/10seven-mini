/**
 * Redirect from old URL structure to new one
 * OLD: /module/banking-fees/unit/2
 * NEW: /banking-fees/2
 */

import { redirect } from 'next/navigation';

export default function Unit2PageRedirect() {
  redirect('/banking-fees/2');
}
