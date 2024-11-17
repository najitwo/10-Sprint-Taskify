import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user'); // TODO get token

  // const restrictedPaths = ['/dashboard', '/mypage', '/mydashboard'];
  const restrictedPaths = ['/test'];

  if (
    restrictedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!user) {
      // return NextResponse.redirect(new URL('/login', request.url));
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/dashboard/:path*', '/mypage', '/mydashboard/:path*'],
  matcher: ['/test'],
};
