'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as z from 'zod';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { Input } from '@multi-tenancy/design-system';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  PasswordField,
} from '@multi-tenancy/design-system';
import { useAuth } from './AuthContext';
import { Button } from '../../components/Button';
import { signInSchema, signUpSchema } from './auth.schemas';
import googleIcon from '../../../public/assets/images/google-24px.svg';

type FormType = 'sign-in' | 'sign-up';

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

export const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const schema = type === 'sign-up' ? signUpSchema : signInSchema;

  const form = useForm<SignUpValues>({
    resolver: zodResolver(schema) as unknown as Resolver<SignUpValues>,
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpValues> = async (values) => {
    setLoading(true);
    setError('');

    try {
      if (type === 'sign-up') {
        const data = values as SignUpValues;
        const result = await signUp(data.fullName, data.email, data.password);

        if (result?.error) setError(result.error);
        else router.push('/');
      } else {
        const data = values as SignInValues;
        const result = await signIn(data.email, data.password);

        if (result?.error) setError(result.error);
        else router.push('/');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await nextAuthSignIn('google', { callbackUrl: '/' });
    } catch {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-container">
        <h1 className="form-title">
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </h1>
        {type === 'sign-up' && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="form-input">
                <FormControl>
                  <Input {...field} label="Full Name" />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-input">
              <FormControl>
                <Input {...field} type="email" label="Email" />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="form-input-password">
              <FormControl>
                <PasswordField {...field} label="Password" />
              </FormControl>
              <FormMessage className="form-message" />
            </FormItem>
          )}
        />

        {type === 'sign-up' && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="form-input-password">
                <FormControl>
                  <PasswordField {...field} label="Confirm Password" />
                </FormControl>
                <FormMessage className="form-message" />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="mt-4 w-full"
        >
          {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
        </Button>
        {error && <p className="form-message">*{error}</p>}
        <Button
          type="button"
          variant="outline"
          className="mt-4 rounded-md"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <span className="flex items-center justify-center">
            <Image src={googleIcon} alt="Google" width={18} height={18} />
            <span className="ml-2">Continue with Google</span>
          </span>
        </Button>
        <p className="mt-4 text-center">
          {type === 'sign-in'
            ? "Don't have an account?"
            : 'Already have an account?'}
          <Link
            href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
            className="text-primary ml-1 font-medium"
          >
            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </form>
    </Form>
  );
};
