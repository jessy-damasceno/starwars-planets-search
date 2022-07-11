import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetch from '../hooks/useFetch';

export default function Provider({ children }) {
  const { isLoading, data } = useFetch();

  const [filteredList, setFilteredList] = useState(data);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    const setList = () => setFilteredList(data);
    setList();
  }, [data]);

  useEffect(() => {
    const setList = () => setFilteredList(data
      .filter((e) => e.name.toLowerCase().includes(filterByName.toLowerCase())));
    setList();
  }, [data, filterByName]);

  const filterListWithTextInput = (key, value) => {
    setFilteredList(data.filter((item) => item[key]
      .toLowerCase().includes(value.toLowerCase())));
  };

  const contextValue = {
    filteredList,
    filterListWithTextInput,
    setFilterByName,
    isLoading,
    data,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
