import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetch from '../hooks/useFetch';

export default function Provider({ children }) {
  const { isLoading, data } = useFetch();

  const [filteredList, setFilteredList] = useState(data);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const sortListByColumn = (column, order) => {
    const newList = [...filteredList];

    const callBack1 = (a, b, arg1) => {
      if (a[arg1] === 'unknown') {
        return 1;
      }

      return Number(a[arg1]) - Number(b[arg1]);
    };

    const callBack2 = (a, b, arg2) => {
      if (a[arg2] === 'unknown') {
        return 1;
      }

      return Number(b[arg2]) - Number(a[arg2]);
    };

    setFilteredList(() => {
      if (order === 'ASC') {
        const xablau = [...newList.sort((a, b) => callBack1(a, b, column))];
        console.log(xablau);
        return xablau;
      }
      const xablau = [...newList.sort((a, b) => callBack2(a, b, column))];
      console.log(xablau);
      return xablau;
    });
  };

  // useEffect(() => {
  //   const setList = () => setFilteredList(data
  //     .sort((a, b) => a.name.localeCompare(b.name)));
  //   setList();
  // }, [data]);

  useEffect(() => {
    const setList = () => setFilteredList(data
      .filter((e) => e.name.toLowerCase().includes(filterByName.toLowerCase())));
    setList();
  }, [data, filterByName]);

  useEffect(() => {
    const setList = () => {
      setFilteredList(data);
      filterByNumericValues.forEach(({ column, comparison, value }) => {
        setFilteredList((oldList) => oldList
          .filter((e) => {
            if (comparison === 'maior que') {
              return e[column] > Number(value);
            }

            if (comparison === 'menor que') {
              return e[column] < Number(value);
            }

            return e[column] === value;
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

  const removeNumericFilter = (column) => {
    setFilterByNumericValues((oldList) => oldList.filter((e) => e.column !== column));
  };

  const contextValue = {
    // states
    data,
    filteredList,
    isLoading,
    filterByNumericValues,
    // funcs
    addNumericFilter,
    removeNumericFilter,
    setFilterByName,
    setFilterByNumericValues,
    sortListByColumn,
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
