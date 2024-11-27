import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_KEY } from './constants/cookies';

export function middleware(request: NextRequest) {
  const user = request.cookies.get(TOKEN_KEY);

  const restrictedPaths = ['/dashboard', '/mypage', '/mydashboard'];

  if (
    restrictedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/mypage',
    '/mydashboard/:path*',
    '/cards/:path*',
    '/columns/:path*',
    '/comments/:path*',
    '/invitations/:path*',
    '/users/me/:path*',
  ],
};
