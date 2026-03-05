import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');
  // const isVerifyPage = pathname.startsWith('/verify-email');

  // if (token && token.emailVerified === false) {
  //   if (isVerifyPage) return NextResponse.next();
  //   const dest = new URL('/verify-email', request.url);
  //   if (token.otpUserId) dest.searchParams.set('userId', String(token.otpUserId));
  //   return NextResponse.redirect(dest);
  // }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
