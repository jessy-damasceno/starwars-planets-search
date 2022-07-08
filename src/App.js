import React from 'react';
import Provider from './contexts/MyContext';
import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <Provider>
      <PlanetsTable />
    </Provider>
  );
}

export default App;
