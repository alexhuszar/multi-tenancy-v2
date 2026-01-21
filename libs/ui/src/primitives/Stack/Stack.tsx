import React, { forwardRef, HTMLAttributes, ElementType } from 'react';

type StackSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: StackSpacing;
  children?: React.ReactNode;
}

/**
 * Stack is a vertical layout primitive using CSS variables for spacing
 */
export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    { as: Component = 'div', spacing = '4', children, className, style, ...rest },
    ref
  ) => {
    const stackStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: `var(--spacing-${spacing})`,
      ...style,
    };

    return (
      <Component ref={ref} className={className} style={stackStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';
