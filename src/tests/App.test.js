import React from 'react';
import { act, cleanup, getByTestId, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { testData } from './mockData';
import userEvent from '@testing-library/user-event';

describe('END 2 END test', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });

    act(() => {
      render(<App />)
    });
  });

  afterEach(() => {
    cleanup();
  })

  it('Testing application', () => {
    waitFor(() => screen.getAllByTestId('planet-name'));

    const planetList = screen.getAllByTestId('planet-name');
    const searchInput = screen.getByTestId('name-filter');

    expect(planetList).toHaveLength(10);
    expect(planetList[0]).toHaveTextContent('Alderaan');
    expect(planetList[9]).toHaveTextContent(/yavin/i);

    expect(searchInput).toHaveProperty('type', 'text');
    expect(searchInput).toHaveValue('');

    userEvent.type(searchInput, 'alderaan');
    expect(searchInput).toHaveValue('alderaan');

    expect(screen.getAllByTestId('planet-name')).toHaveLength(1);

    const columnSelect = screen.getByTestId('column-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const addFilterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnSelect, 'population');

    expect(screen.getAllByRole('option', {name: 'population'})[0].selected).toBe(true);
    expect(screen.getAllByRole('option', {name: 'orbital_period'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'diameter'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'rotation_period'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'surface_water'})[0].selected).toBe(false);

    userEvent.selectOptions(columnSelect, 'diameter');

    expect(screen.getAllByRole('option', {name: 'population'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'orbital_period'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'diameter'})[0].selected).toBe(true);
    expect(screen.getAllByRole('option', {name: 'rotation_period'})[0].selected).toBe(false);
    expect(screen.getAllByRole('option', {name: 'surface_water'})[0].selected).toBe(false);

    userEvent.type(valueFilter, '118000');
    userEvent.selectOptions(comparisonFilter, 'igual a');

    userEvent.click(addFilterButton);

    waitFor(() => screen.getAllByTestId('planet-name'));

    expect(screen.getAllByTestId('planet-name')).toHaveLength(1);

    expect(screen.getByTestId('filter').querySelectorAll('button')).toHaveLength(1);

    userEvent.click(screen.getByTestId('filter').querySelectorAll('button')[0]);

    userEvent.click(addFilterButton);
    userEvent.click(addFilterButton);
    userEvent.click(addFilterButton);
    userEvent.click(addFilterButton);
    userEvent.click(addFilterButton);

    expect(addFilterButton).toBeDisabled();

    expect(screen.getAllByTestId('filter')).toHaveLength(5);

    userEvent.click(screen.getByTestId('button-remove-filters'));

    expect(screen.queryAllByTestId('filter')).toHaveLength(0);

    const columnSort = screen.getByTestId('column-sort');
    const columnSortInputAsc = screen.getByTestId('column-sort-input-asc');
    const columnSortInputDesc = screen.getByTestId('column-sort-input-desc');
    const sortButton = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(columnSortInputAsc);
    userEvent.click(sortButton);

    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Endor');
    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Bespin');

    userEvent.click(columnSortInputDesc);
    userEvent.click(sortButton);

    expect(screen.getAllByTestId('planet-name')[9]).toHaveTextContent('Endor');
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Bespin');

    userEvent.type(valueFilter, '0');
    userEvent.selectOptions(comparisonFilter, 'maior que');

    userEvent.click(addFilterButton);

    waitFor(() => screen.getAllByTestId('planet-name'));

    expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    
    userEvent.type(valueFilter, '1000000000000');
    userEvent.selectOptions(comparisonFilter, 'menor que');

    userEvent.click(addFilterButton);

    waitFor(() => screen.getAllByTestId('planet-name'));

    expect(screen.getAllByTestId('planet-name')).toHaveLength(6);
  });
});
