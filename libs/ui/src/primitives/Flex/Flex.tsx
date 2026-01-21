import React, { forwardRef, HTMLAttributes, ElementType } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type FlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexSpacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  gap?: FlexSpacing;
  children?: React.ReactNode;
}

const alignMap: Record<FlexAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<FlexJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/**
 * Flex is a flexible box layout primitive using CSS variables for spacing
 */
export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      gap,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const flexStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      alignItems: alignMap[align],
      justifyContent: justifyMap[justify],
      flexWrap: wrap,
      gap: gap ? `var(--spacing-${gap})` : undefined,
      ...style,
    };

    return (
      <Component ref={ref} className={className} style={flexStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';
