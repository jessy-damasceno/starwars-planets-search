import React from 'react';
import FilterByValues from './filters/FilterByValues';
import SearchBar from './filters/SearchBar';

const Filters = () => (
  <div className="filters">
    <SearchBar />
    <FilterByValues />
  </div>
);

export default Filters;
