import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionTokenCookie = request.cookies.get('session_token');
  const isAuthenticated = !!sessionTokenCookie?.value; // Basic check, replace with your actual validation

  const { pathname } = request.nextUrl;

  // If trying to access login page and is authenticated, redirect to home
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If trying to access a protected route (root or /dashboard/*) and is not authenticated, redirect to login
  if (!isAuthenticated && (pathname === '/' || pathname.startsWith('/dashboard'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher specifies which routes the middleware should run on.
  // It includes the root, /login, and all paths under /dashboard.
  matcher: ['/', '/login', '/dashboard/:path*'],
}; 