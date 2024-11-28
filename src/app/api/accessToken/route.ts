import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const GET = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;

  return NextResponse.json({ accessToken }, { status: 200 });
};

export const DELETE = async () => {
  const response = NextResponse.json(
    { message: 'Access token deleted' },
    { status: 200 }
  );

  const cookieStore = await cookies();
  cookieStore.delete('accessToken');

  return response;
};
