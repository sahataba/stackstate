import React from 'react';
import './App.css';
import Columbo from './Columbo';
import TerrainEditor from './TerrainEditor';

const App: React.FC = () => {
  new Columbo().solve()
  return (
    <div className="App">
      <TerrainEditor size={7}/>
    </div>
  );
}

export default App;
