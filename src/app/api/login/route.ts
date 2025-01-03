import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/lib/axiosInstance';
import { cookies } from 'next/headers';
import { TOKEN_KEY } from '@/constants/cookies';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const response = await axiosInstance.post('/auth/login', body);

    if (response.status === 201) {
      const { accessToken, user } = response.data;
      (await cookies()).set(TOKEN_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return NextResponse.json({ user }, { status: 200 });
    }

    return NextResponse.json(
      { message: response.data.message },
      { status: response.status }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
