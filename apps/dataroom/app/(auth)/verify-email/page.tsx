import { Suspense } from 'react';
import { Loading } from '../../components/Loading';
import { VerifyEmailForm } from './VerifyEmailForm';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyEmailForm />
    </Suspense>
  );
}
