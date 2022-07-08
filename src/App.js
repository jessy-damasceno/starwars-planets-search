import React from 'react';
import Provider from './contexts/Provider';
import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <Provider>
      <PlanetsTable />
    </Provider>
  );
}

export default App;
