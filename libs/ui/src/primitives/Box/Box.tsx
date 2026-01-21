import React, { forwardRef, HTMLAttributes, ElementType } from 'react';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children?: React.ReactNode;
}

/**
 * Box is a primitive layout component that uses CSS variables for theming.
 * It accepts all HTML attributes and can render as any HTML element.
 */
export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', children, className, style, ...rest }, ref) => {
    return (
      <Component ref={ref} className={className} style={style} {...rest}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
