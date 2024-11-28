import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/lib/axiosInstance';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const response = await axiosInstance.post('/auth/login', body);

    if (response.status === 201) {
      const { accessToken, user } = response.data;
      (await cookies()).set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return NextResponse.json({ user }, { status: 200 });
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.response?.data?.message },
        { status: error.response?.status }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
