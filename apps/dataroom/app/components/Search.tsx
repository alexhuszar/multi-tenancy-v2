'use client';

import React from 'react';
import { cn, Input } from '@multi-tenancy/design-system';
import { Search as SearchIcon } from 'lucide-react';

const getSearchInputContainerStyles = ({ className }: { className?: string }) =>
  cn('mt-1 grid items-center w-full md:max-w-[400px]', className);

const getSearchInputFieldStyles = ({ className }: { className?: string }) =>
  cn(
    'col-start-1 row-start-1 h-[48px] w-full pr-10 w-full rounded-md focus:outline-primary-500 border border-border bg-muted pl-4 pr-16 py-2 text-sm leading-normal text-foreground',

    className,
  );

const getSearchInputAdornmentStyles = ({ className }: { className?: string }) =>
  cn(
    'col-start-1 row-start-1 justify-self-end pr-3 pointer-events-none',
    className,
  );

export const Search = ({
  containerClassName,
  endAdornmentClassName,
  inputFieldClassName,
  className,
}: {
  containerClassName?: string;
  endAdornmentClassName?: string;
  inputFieldClassName?: string;
  className?: string;
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement search logic here, e.g., update query state or trigger search
  };

  return (
    <Input
      value=""
      placeholder="Search..."
      onChange={handleSearchChange}
      label="Search"
      containerClassName={getSearchInputContainerStyles({
        className: containerClassName,
      })}
      inputFieldClassName={getSearchInputFieldStyles({
        className: inputFieldClassName,
      })}
      endAdornmentClassName={getSearchInputAdornmentStyles({
        className: endAdornmentClassName,
      })}
      className={className}
      labelClassName="hidden"
      endAdornment={<SearchIcon />}
    />
  );
};
