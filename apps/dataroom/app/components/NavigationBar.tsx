'use client';

import {
  NavigationBar as PrimitiveNavigationBar,
  useStyles,
} from '@multi-tenancy/design-system';
import { forwardRef, ComponentProps } from 'react';

type NavigationBarProps = ComponentProps<typeof PrimitiveNavigationBar> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const NavigationBar = forwardRef<HTMLButtonElement, NavigationBarProps>(
  ({ className, ...props }, ref) => {
    const styles = useStyles();
    return (
      <PrimitiveNavigationBar
        className={styles.getNavigationBarStyles({ className })}
        {...props}
      />
    );
  },
);
