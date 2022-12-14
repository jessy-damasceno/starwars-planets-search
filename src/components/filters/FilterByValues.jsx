import React, { useState, useContext } from 'react';
import MyContext from '../../contexts/MyContext';

const FilterByValues = () => {
  const {
    addNumericFilter,
    filterByNumericValues,
    removeNumericFilter,
    setFilterByNumericValues,
    sortListByColumn,
  } = useContext(MyContext);

  const INITIAL_OPTIONS = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const [options, setOptions] = useState(INITIAL_OPTIONS);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [sortByColumn, setSortByColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [value, setValue] = useState(0);

  const handleClick = () => {
    const newFilter = {
      column,
      comparison,
      value,
    };

    const newOptions = options.filter((option) => option !== column);

    setOptions(newOptions);
    setColumn(newOptions[0]);
    addNumericFilter(newFilter);
  };

  const removeFilter = ({ target }) => {
    const newOptions = [...options, target.name];

    setOptions(newOptions);
    setColumn(newOptions[0]);
    removeNumericFilter(target.name);
  };

  const resetFilters = () => {
    setFilterByNumericValues([]);
    setOptions(INITIAL_OPTIONS);
    setColumn('population');
  };

  return (
    <>
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
          disabled={ !options.length }
        >
          Add Filter
        </button>

        <div className="sort-table">
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ () => sortListByColumn(sortByColumn, sortOrder) }
          >
            ORDENAR POR
          </button>
          <select
            name="sortByColumn"
            id="sortByColumn"
            data-testid="column-sort"
            value={ sortByColumn }
            onChange={ (e) => setSortByColumn(e.target.value) }
          >
            {INITIAL_OPTIONS.map((e, i) => (
              <option
                value={ e }
                key={ i }
              >
                {e}
              </option>
            ))}
          </select>
          <label htmlFor="ASC">
            <input
              type="radio"
              name="sortOrder"
              id="ASC"
              data-testid="column-sort-input-asc"
              value="ASC"
              onClick={ () => setSortOrder('ASC') }
            />
            ASCENDENTE
          </label>
          <label htmlFor="DESC">
            <input
              type="radio"
              name="sortOrder"
              id="DESC"
              data-testid="column-sort-input-desc"
              value="DESC"
              onClick={ () => setSortOrder('DESC') }
            />
            DESCENDENTE
          </label>
        </div>

        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ resetFilters }
        >
          REMOVE ALL FILTERS
        </button>
      </form>
      <div className="filter-label-container">
        {filterByNumericValues
        && filterByNumericValues.map((e, i) => (
          <div className="filter-item" data-testid="filter" key={ i }>
            <span>{`${e.column} ${e.comparison} ${e.value}`}</span>
            <button name={ e.column } type="button" onClick={ removeFilter }>DEL</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterByValues;
