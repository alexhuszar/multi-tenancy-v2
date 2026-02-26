import { cn } from '@multi-tenancy/design-system';
import { Loader2 } from 'lucide-react';

const getLoadingWrapStyles = ({ className }: { className?: string }) =>
  cn('col-start-1 row-start-1 z-10 grid place-items-center', className);

export const Loading = ({
  className,
  label = 'Loading',
}: {
  className?: string;
  label?: string;
}) => (
  <div
    className={getLoadingWrapStyles({ className })}
    role="status"
    aria-live="polite"
    aria-label={label}
  >
    <div className="flex flex-col items-center gap-4 p-8">
      <Loader2
        className="size-12 animate-spin text-primary-500"
        aria-hidden="true"
      />
      <p className="animate-pulse text-primary-500" aria-hidden="true">
        Loading...
      </p>
    </div>
  </div>
);
