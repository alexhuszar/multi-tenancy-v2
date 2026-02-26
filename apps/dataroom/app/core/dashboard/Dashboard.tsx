'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../auth/AuthContext';
import { Search } from '../../components/Search';
import { Loading } from '../../components/Loading';
import { UploadButton } from '../../components/UploadButton';
import { FolderButton } from '../../components/FolderButton';

export const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <Loading />;
  if (!isAuthenticated) return <Loading />;

  return (
    <section className="flex h-full flex-col gap-4 overflow-auto p-4 xl:p-8">
      <Search className="mt-1 flex w-full justify-center" />

      <div className="h-full gap-4 overflow-auto p-4 xl:p-8">
        {isAuthenticated && user && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-auto gap-2">
              <UploadButton
                accountId={user?.accountId}
                className="sm:hidden"
              />
              <FolderButton
                accountId={user?.accountId}
                className="sm:hidden"
              />
            </div>
          </div>
        )}
        Hello world!
      </div>
    </section>
  );
};
