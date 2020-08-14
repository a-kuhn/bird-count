import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import LoginReg from './views/LoginReg';

function App() {
  return (
    <div className="App">
      <Router>
        <LoginReg path="/" />
        
      </Router>
    </div>
  );
}

export default App;
