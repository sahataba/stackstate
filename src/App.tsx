import React from 'react';
import './App.css';
import TerrainEditor from './TerrainEditor';

const App: React.FC = () => {
  return (
    <div className="App">
      <TerrainEditor size={7}/>
    </div>
  );
}

export default App;
