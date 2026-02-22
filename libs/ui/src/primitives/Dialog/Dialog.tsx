import { ReactNode } from 'react';
import {
  Root,
  Portal,
  Title,
  Close,
  Overlay,
  Content,
} from '@radix-ui/react-dialog';

export interface DialogProps {
  id: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  closeIcon?: ReactNode;
  overlayClassName?: string;
  titleClassName?: string;
  contentClassName: string;
}

export const Dialog = ({
  id,
  title,
  open,
  onOpenChange,
  closeIcon,
  children,
  overlayClassName,
  titleClassName,
  contentClassName,
}: DialogProps) => (
  <Root open={open} onOpenChange={onOpenChange} key={id}>
    <Portal>
      <Overlay className={overlayClassName} role="presentation" />

      <Content className={contentClassName} aria-describedby={undefined}>
        <Title
          role="heading"
          aria-level={2}
          className={titleClassName}
          data-element="dialog-title"
        >
          {title}
        </Title>

        {children}

        {closeIcon && (
          <Close aria-label="Close">
            <span aria-hidden>{closeIcon}</span>
          </Close>
        )}
      </Content>
    </Portal>
  </Root>
);
