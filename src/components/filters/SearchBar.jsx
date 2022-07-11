import React, { useContext } from 'react';
import MyContext from '../../contexts/MyContext';

function SearchBar() {
  const { setFilterByName } = useContext(MyContext);

  const handleChange = ({ target }) => {
    setFilterByName(target.value);
  };

  return (
    <input type="text" onChange={ handleChange } data-testid="name-filter" />
  );
}

export default SearchBar;
