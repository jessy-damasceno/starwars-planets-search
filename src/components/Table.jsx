import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

const Table = () => {
  const { isLoading, data } = useContext(MyContext);
  console.log(isLoading, data);

  return data.length && (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((planet, index) => (
          <tr key={ index }>
            {Object.values(planet).map((e, i) => <td key={ i }>{e}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
