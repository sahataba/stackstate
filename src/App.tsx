import React from 'react';
import './App.css';
import Columbo from './Columbo';

const App: React.FC = () => {
  new Columbo().solve()
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
