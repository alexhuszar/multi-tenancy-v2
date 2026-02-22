'use client';

import React from 'react';
import { Input } from '@multi-tenancy/design-system';
import { Search as SearchIcon } from 'lucide-react';

export const Search = () => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement search logic here, e.g., update query state or trigger search
  };

  return (
    <Input
      value=""
      placeholder="Search..."
      className="search-input"
      onChange={handleSearchChange}
      label="Search"
      labelClassName="hidden"
      endAdornment={<SearchIcon />}
    />
  );
};
