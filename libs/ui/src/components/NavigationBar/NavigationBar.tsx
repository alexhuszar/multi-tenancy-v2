'use client';

import { ReactElement, ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

export type NavigationBarProps = {
  className?: string;
  titleClassName?: string;
  title?: string | ReactNode;
  isTitleCentered?: boolean;
  NavigationLeftSlot?: ReactElement;
  NavigationRightSlot?: ReactElement;
};

export const NavigationBar = ({
  className = '',
  titleClassName = '',
  title,
  isTitleCentered = true,
  NavigationLeftSlot,
  NavigationRightSlot,
}: NavigationBarProps) => {
  return (
    <NavigationMenu.Root aria-label="Main navigation" className=''>
      <NavigationMenu.List
        className={`flex items-center justify-between ${className}`}
      >
        <NavigationMenu.Item role="presentation">
          {NavigationLeftSlot}
        </NavigationMenu.Item>

        {title && (
          <div
            className={`flex-1 text-center ${titleClassName}`}
            role="heading"
            data-visual={isTitleCentered ? 'centered' : ''}
            aria-level={1}
          >
            {title}
          </div>
        )}

        <NavigationMenu.Item
          role="presentation"
          data-element="navigation-right-slot"
        >
          {NavigationRightSlot}
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
