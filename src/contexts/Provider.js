import React from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetch from '../hooks/useFetch';

export default function Provider({ children }) {
  const { isLoading, data } = useFetch();

  const contextValue = {
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
