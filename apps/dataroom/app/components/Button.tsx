'use client';

import { forwardRef } from 'react';
import {
  Button as PrimitiveButton,
  ButtonProps as PrimitiveButtonProps,
  useStyles,
} from '@multi-tenancy/design-system';

type ButtonProps = PrimitiveButtonProps & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <PrimitiveButton
        ref={ref}
        className={styles.getButtonStyles({ variant, size, className })}
        {...props}
      />
    );
  },
);
