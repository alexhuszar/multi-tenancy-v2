'use client';

import { Loader2Icon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@multi-tenancy/design-system';
import { Button } from '../../components/Button';
import { DigitCode } from '../../components/DigitCode';
import {
  verifyEmailSchema,
  VerifyEmailValues,
} from '../../core/auth/auth.schemas';

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useSession();
  const userId = searchParams.get('userId') ?? '';

  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otp: '' },
  });

  if (!userId) {
    return (
      <div className="form-container">
        <p className="form-message">Invalid verification link.</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<VerifyEmailValues> = async ({ otp }) => {
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, secret: otp }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        form.setError('root', {
          message:
            (data as { error?: string }).error ??
            'Verification failed. Please try again.',
        });
        return;
      }

      await update({ emailVerified: true });
      router.push('/');
    } catch {
      form.setError('root', {
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="form-container"
      >
        <h1 className="form-title">Verify your email</h1>
        <p className="mb-4 text-sm text-center sm:text-start">
          Enter the 6-digit code sent to your email address.
        </p>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DigitCode
                  value={field.value}
                  onValueChange={field.onChange}
                  length={6}
                  autoFocus
                  invalid={!!form.formState.errors.otp}
                  disabled={form.formState.isSubmitting}
                  variant='secondary'
                />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="form-message" role="alert" aria-live="assertive">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          className="mt-4 w-full"
          isLoading={form.formState.isSubmitting}
          loadingIcon={<Loader2Icon />}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Verifying...' : 'Verify Email'}
        </Button>
      </form>
    </Form>
  );
}
