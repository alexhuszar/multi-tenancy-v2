import { cn } from '@multi-tenancy/design-system';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

function getLoadingWrapStyles({ className }: { className?: string }) {
  return twMerge(
    cn('col-start-1 row-start-1 z-10 grid place-items-center', className),
  );
}

export const Loading = ({ className }: { className?: string }) => (
  <div className={getLoadingWrapStyles({ className })}>
    <div className="flex flex-col items-center gap-4 p-8">
      <Loader2 className="size-12 animate-spin text-primary-500" />
      <p className="animate-pulse text-primary-500">Loading...</p>
    </div>
  </div>
);
