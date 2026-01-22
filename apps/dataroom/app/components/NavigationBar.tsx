'use client';

import {
  NavigationBar as PrimitiveNavigationBar,
  NavigationBarProps as PrimitiveNavigationBarProps,
  useStyles,
} from '@multi-tenancy/design-system';

type NavigationBarProps = PrimitiveNavigationBarProps;

export const NavigationBar = ({ className, ...props }: NavigationBarProps) => {
  const styles = useStyles();
  return (
    <PrimitiveNavigationBar
      className={styles.getNavigationBarStyles({ className })}
      {...props}
    />
  );
};
