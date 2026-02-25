'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '../../components/Button';

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();
  const userId = searchParams.get('userId') ?? '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!userId) {
    return (
      <div className="form-container">
        <p className="form-message">Invalid verification link.</p>
      </div>
    );
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, secret: otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Verification failed. Please try again.');
        return;
      }

      await update({ emailVerified: true });
      router.push('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Verify your email</h1>
      <p className="mb-4 text-sm text-gray-600">
        Enter the 6-digit code sent to your email address.
      </p>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
        className="form-input w-full tracking-widest text-center text-lg"
        placeholder="000000"
        aria-label="OTP code"
      />
      {error && (
        <p className="form-message" role="alert" aria-live="assertive">
          *{error}
        </p>
      )}
      <Button
        type="button"
        variant="primary"
        className="mt-4 w-full"
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </Button>
    </div>
  );
}
