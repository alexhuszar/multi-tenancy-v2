import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailOtp } from '../../../actions/otp.actions';
import { isRateLimitError } from '@multi-tenancy/appwrite';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, secret } = body;

    if (!userId || !secret) {
      return NextResponse.json(
        { error: 'userId and secret are required' },
        { status: 400 },
      );
    }

    if (typeof secret !== 'string' || secret.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 },
      );
    }

    await verifyEmailOtp({ userId, secret });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (isRateLimitError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(error.retryAfterMs / 1000)) } },
      );
    }
    const message = error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
