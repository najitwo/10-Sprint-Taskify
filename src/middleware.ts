import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_KEY } from './constants/cookies';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get(TOKEN_KEY);

  if (!userToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 아래에서 시작하는 경로에서만 미들웨어 제한
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
