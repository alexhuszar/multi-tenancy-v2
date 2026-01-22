import { ReactNode } from 'react';
import { Description, Title, Action, Root, Close } from '@radix-ui/react-toast';

export interface ToastProps {
  className?: string;
  contentClassName?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  duration?: number;
  closeIcon?: ReactNode;
  action?: { component: ReactNode; altText: string };
}

export const Toast = ({
  className,
  contentClassName,
  onOpenChange,
  open,
  title,
  subtitle,
  action,
  duration = 5000,
  closeIcon,
}: ToastProps) => {
  return (
    <Root
      className={className}
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      role="status"
      aria-live="polite"
    >
      <div className={contentClassName}>
        {title && (
          <Title role="heading" aria-level={2}>
            {title}
          </Title>
        )}

        {closeIcon && (
          <Close aria-label="Close">
            <span aria-hidden>{closeIcon}</span>
          </Close>
        )}
      </div>

      {subtitle && <Description>{subtitle}</Description>}

      {action && (
        <Action asChild aria-label={action.altText} altText={action.altText}>
          {action.component}
        </Action>
      )}
    </Root>
  );
};
