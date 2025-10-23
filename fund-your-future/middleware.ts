/**
 * Next.js Middleware
 * Route protection and redirects for demo mode
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if demo mode is enabled
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (!isDemoMode) {
    // Full mode - no restrictions
    return NextResponse.next();
  }

  // Demo mode - allowed routes
  const allowedRoutes = [
    '/',
    '/about',
    '/demo/whackamole',
    '/_next',
    '/api',
    '/favicon.ico',
    '/public',
    '/smith college logo.png',
  ];

  // Check if route is allowed
  const isAllowed = allowedRoutes.some((route) =>
    pathname === route || pathname.startsWith(route)
  );

  if (!isAllowed) {
    // Redirect to dashboard
    console.log('[Demo Mode] Redirecting from', pathname, 'to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
