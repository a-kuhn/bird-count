import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import LoginReg from './views/LoginReg';
import Main from './views/Main';
import Logout from './views/Logout';

function App() {

  return (
    <div className="App">
      <Router>
        <LoginReg path="/" />
        <Main path="/main" />
        <Logout path="/logout"/>
      </Router>
    </div>
  );
}

export default App;
