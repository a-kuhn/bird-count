import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import LoginReg from './views/LoginReg';
import Main from './views/Main';
import Logout from './views/Logout';
import DisplayResults from './components/DisplayResults';
import SearchForm from './components/SearchForm';

function App() {

  return (
    <div className="App">
      <Router>
        <LoginReg path="/" />
        <Main path="main">
          <SearchForm path=""/>
          <DisplayResults path="results/:locale/:season"/>
        </Main>
        <Logout path="logout"/>
      </Router>
    </div>
  );
}

export default App;
