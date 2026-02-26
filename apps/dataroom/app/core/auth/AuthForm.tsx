'use client';

import { useState, useRef, useEffect } from 'react';
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

type FormMode = 'sign-in' | 'sign-up';

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

const authConfig = {
  'sign-in': {
    title: 'Sign In',
    schema: signInSchema,
    submitLabel: 'Sign In',
    linkHref: '/sign-up',
    linkLabel: 'Sign Up',
    linkPrompt: "Don't have an account?",
    showNameField: false,
  },
  'sign-up': {
    title: 'Create Account',
    schema: signUpSchema,
    submitLabel: 'Create Account',
    linkHref: '/sign-in',
    linkLabel: 'Sign In',
    linkPrompt: 'Already have an account?',
    showNameField: true,
  },
} as const;

export const AuthForm = ({ mode }: { mode: FormMode }) => {
  const router = useRouter();
  const { signUp, signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  const config = authConfig[mode];

  const form = useForm<SignUpValues>({
    resolver: zodResolver(config.schema) as unknown as Resolver<SignUpValues>,
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
      if (mode === 'sign-up') {
        const data = values as SignUpValues;
        const result = await signUp(data.fullName, data.email, data.password);

        if (result?.error) {
          setError(result.error);
        }
      } else {
        const data = values as SignInValues;
        const result = await signIn(data.email, data.password);

        if (result?.error) {
          setError(result.error);
        } else {
          router.push('/');
        }
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
        <h1 className="form-title">{config.title}</h1>
        {config.showNameField && (
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
        {config.showNameField && (
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
          {config.submitLabel}
        </Button>
        {error && (
          <p
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="form-message"
          >
            *{error}
          </p>
        )}
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
          {config.linkPrompt}
          <Link href={config.linkHref} className="ml-1 font-medium text-primary">
            {config.linkLabel}
          </Link>
        </p>
      </form>
    </Form>
  );
};
