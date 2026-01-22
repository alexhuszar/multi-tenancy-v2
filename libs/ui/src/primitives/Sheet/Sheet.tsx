'use client';

import { ReactNode } from 'react';
import {
  Overlay,
  Content,
  Portal,
  Root,
  Title,
  Trigger,
  Close,
} from '@radix-ui/react-dialog';

export type SheetPosition = 'top' | 'bottom' | 'left' | 'right';

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: SheetPosition;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

export const SheetTrigger = Trigger;

export const SheetClose = Close;

export const Sheet = ({
  open,
  onOpenChange,
  overlayClassName,
  contentClassName,
  titleClassName,
  className,
  position = 'bottom',
  children,
}: SheetProps) => {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay
          className={overlayClassName || className}
          role="presentation"
          data-element="sheet-overlay"
        />

        <Content
          className={contentClassName || className}
          data-element={`sheet-content-${position}`}
          data-position={position}
          aria-describedby={undefined}
        >
          <Title role="heading" aria-hidden className={titleClassName}>
            Sheet
          </Title>

          {children}
        </Content>
      </Portal>
    </Root>
  );
};
