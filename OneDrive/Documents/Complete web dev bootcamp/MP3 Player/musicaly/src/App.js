import React from 'react';
import './App.css';
import Player from './Player';

function App() {
  return (
    <div className="App">
      <div className="background-slideshow"></div>
      <div className="content">
        <h1>Welcome to the Musicaly</h1>
        <Player />
      </div>
    </div>
  );
}

export default App;
