import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TOKEN_KEY } from '@/constants/cookies';

export const GET = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TOKEN_KEY)?.value || null;

  return NextResponse.json({ accessToken }, { status: 200 });
};

export const DELETE = async () => {
  const response = NextResponse.json(
    { message: 'Access token deleted' },
    { status: 200 }
  );

  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);

  return response;
};
