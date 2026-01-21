import React, { forwardRef, HTMLAttributes, ElementType } from 'react';

type TextVariant = 'body' | 'heading' | 'label' | 'caption';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  size?: TextSize;
  children?: React.ReactNode;
}

/**
 * Text primitive that uses CSS variables for typography tokens
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  (
    { as, variant = 'body', size, children, className, style, ...rest },
    ref
  ) => {
    // Default element based on variant
    const defaultElement: ElementType =
      variant === 'heading' ? 'h2' : variant === 'label' ? 'label' : 'p';
    const Component = as ?? defaultElement;

    // Build CSS variable-based styles
    const textStyle: React.CSSProperties = {
      fontSize: size ? `var(--typography-fontSize-${size})` : undefined,
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={className}
        style={textStyle}
        data-variant={variant}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
