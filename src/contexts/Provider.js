import React from 'react';
import MyContext from './MyContext';

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
  children: PropTypes.func.isRequired,
};
