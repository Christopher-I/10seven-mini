/**
 * Simple Announcement Bar
 * Shows important announcements at the top of the dashboard
 */

'use client';

import { useState } from 'react';

interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'update' | 'alert';
  dismissible?: boolean;
}

// Current announcement - in production this would come from a CMS/database
const currentAnnouncement: Announcement = {
  id: 'welcome-2025',
  message: 'Welcome to the new semester! We\'ve added interactive features to help you master financial literacy.',
  type: 'info',
  dismissible: true
};

export function AnnouncementBar() {
  // Disabled - to re-enable, uncomment the code below
  return null;

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // const [dismissed, setDismissed] = useState(false);

  // if (dismissed || !currentAnnouncement) return null;

  // const typeStyles = {
  //   info: 'bg-white border-[#2E1E72] text-[#0F2D52]',
  //   update: 'bg-white border-[#8577B7] text-[#0F2D52]',
  //   alert: 'bg-white border-[#DBE250] text-[#0F2D52]'
  // };

  // return (
  //   <div className={`border-l-4 p-4 rounded-lg shadow-sm ${typeStyles[currentAnnouncement.type]}`} style={{ fontFamily: 'var(--font-red-hat)' }}>
  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center">
  //         <div className="flex-shrink-0">
  //           {currentAnnouncement.type === 'info' && (
  //             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  //             </svg>
  //           )}
  //           {currentAnnouncement.type === 'update' && (
  //             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  //             </svg>
  //           )}
  //           {currentAnnouncement.type === 'alert' && (
  //             <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
  //               <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  //             </svg>
  //           )}
  //         </div>
  //         <div className="ml-3">
  //           <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-red-hat)', fontWeight: '600' }}>{currentAnnouncement.message}</p>
  //         </div>
  //       </div>
  //       {currentAnnouncement.dismissible && (
  //         <div className="ml-auto pl-3">
  //           <button
  //             onClick={() => setDismissed(true)}
  //             className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-20 hover:bg-gray-600 ${
  //               currentAnnouncement.type === 'info' ? 'text-[#2E1E72] focus:ring-[#2E1E72]' :
  //               currentAnnouncement.type === 'update' ? 'text-[#8577B7] focus:ring-[#8577B7]' :
  //               'text-[#DBE250] focus:ring-[#DBE250]'
  //             }`}
  //             aria-label="Dismiss announcement"
  //           >
  //             <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  //               <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  //             </svg>
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  /* eslint-enable @typescript-eslint/no-unused-vars */
}