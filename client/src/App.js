import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import LoginReg from './views/LoginReg';
import Main from './views/Main';
import Logout from './views/Logout';
import DisplayResults from './components/DisplayResults';
import Search from './components/Search';

function App() {

  return (
    <div className="App">
      <Router path="/">
        <LoginReg path="/"/>
        <Main path="main">
          <Search path=""/>
          <DisplayResults path="results/:locale/:season"/>
        </Main>
        <Logout path="logout"/>
      </Router>
    </div>
  );
}

export default App;
