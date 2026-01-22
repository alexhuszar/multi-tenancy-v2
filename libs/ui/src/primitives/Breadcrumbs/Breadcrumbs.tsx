import React, { forwardRef, ReactNode } from 'react';

interface BreadcrumbSeparatorProps {
  separator: string | ReactNode;
}

export type BreadcrumbsProps = {
  className?: string;
  children: ReactNode;
  separator?: BreadcrumbSeparatorProps['separator'];
};

const BreadcrumbSeparator = ({ separator }: BreadcrumbSeparatorProps) => (
  <li aria-hidden="true" data-element="separator" data-testid="separator">
    {separator}
  </li>
);

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ children, separator = '/', className }, rootRef) => {
    const items = React.Children.toArray(children).filter(React.isValidElement);

    const renderedItems = items.map((child, index) => {
      const isLast = index === items.length - 1;

      return (
        <React.Fragment key={`crumb-${index}`}>
          <li>{isLast ? <span aria-current="page">{child}</span> : child}</li>

          {!isLast && <BreadcrumbSeparator separator={separator} />}
        </React.Fragment>
      );
    });

    return (
      <nav ref={rootRef} className={className} aria-label="breadcrumb">
        <ol>{renderedItems}</ol>
      </nav>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
