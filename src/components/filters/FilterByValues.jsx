import React, { useState, useContext } from 'react';
import MyContext from '../../contexts/MyContext';

const FilterByValues = () => {
  const { addNumericFilter, filterByNumericValues } = useContext(MyContext);

  const COLUMN_OPTIONS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const [options, setOptions] = useState(COLUMN_OPTIONS);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleClick = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };

    console.log(newFilter);

    const newOptions = options.filter((option) => option !== column);

    setOptions(newOptions);
    setColumn(newOptions[0]);
    addNumericFilter(newFilter);
  };

  return (
    <form>
      <select
        data-testid="column-filter"
        name="column-filter"
        id="column-filter"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        {options.map((key, i) => !filterByNumericValues
          ?.some((item) => item.column === key)
          && (
            <option
              value={ key }
              key={ i }
            >
              {key}
            </option>
          ))}
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison-filter"
        id="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        name="value-filter"
        id="value-filter"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Add Filter
      </button>
    </form>);
};

export default FilterByValues;
