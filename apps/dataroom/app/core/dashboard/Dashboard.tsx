'use client';

import { Suspense } from 'react';
import { ActionButtons } from '../../components/ActionButtons';
import { FileDropzone } from '../../components/FileDropzone';
import { Search } from '../../components/Search';
import { Loading } from '../../components/Loading';
import { useAuth } from '../auth/AuthContext';

export const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  return (
    <Suspense fallback={<Loading />}>
      <section className="relative flex h-full flex-col gap-4 overflow-auto p-4 xl:p-8">
        <div className="mt-1 flex justify-center">
          <Search />
        </div>

        <div className="h-full gap-4 overflow-auto p-4 xl:p-8">
          {isLoading /*&& isDataLoading*/ && <Loading />}
          {isAuthenticated && user && (
            <div className="flex flex-col gap-4">
              <ActionButtons
                accountId={user?.accountId}
                className="sm:hidden"
              />
              <FileDropzone accountId={user?.accountId} />
            </div>
          )}
          Hello world!
        </div>
      </section>
    </Suspense>
  );
};
