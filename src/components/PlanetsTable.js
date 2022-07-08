import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

const PlanetsTable = () => {
  const { isLoading, data } = useContext(MyContext);
  console.log(isLoading, data);

  return (
    <div>PlanetsTable</div>
  );
};

export default PlanetsTable;
