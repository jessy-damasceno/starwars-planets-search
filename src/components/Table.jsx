import React, { useContext } from 'react';
import MyContext from '../contexts/MyContext';

const Table = () => {
  const { isLoading, data, filteredList } = useContext(MyContext);

  return isLoading ? <h1>Wait, please...</h1> : filteredList.length && (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredList.map((planet, index) => (
          <tr key={ index }>
            {Object.values(planet).map((e, i) => (
              <td
                data-testid={ e === planet.name ? 'planet-name' : null }
                key={ i }
              >
                {e}
              </td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
