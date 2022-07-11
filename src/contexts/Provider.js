import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetch from '../hooks/useFetch';

export default function Provider({ children }) {
  const { isLoading, data } = useFetch();

  const [filteredList, setFilteredList] = useState(data);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const setList = () => setFilteredList(data);
    setList();
  }, [data]);

  useEffect(() => {
    const setList = () => setFilteredList(data
      .filter((e) => e.name.toLowerCase().includes(filterByName.toLowerCase())));
    setList();
  }, [data, filterByName]);

  useEffect(() => {
    const setList = () => {
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        setFilteredList((oldList) => oldList
          .filter((e) => {
            if (comparison === 'maior que') {
              return e[column] > Number(value);
            }

            if (comparison === 'menor que') {
              return e[column] < Number(value);
            }

            if (comparison === 'igual') {
              return e[column] === value;
            }
            return null;
          }));
      });
    };
    setList();
  }, [data, filterByNumericValues]);

  const addNumericFilter = (newFilter) => {
    setFilterByNumericValues((oldList) => {
      if (oldList.length) {
        return [...oldList, newFilter];
      }
      return [newFilter];
    });
  };

  const contextValue = {
    // states
    data,
    filteredList,
    isLoading,
    // funcs
    addNumericFilter,
    setFilterByName,
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
