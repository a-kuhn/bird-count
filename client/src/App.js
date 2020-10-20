import React from 'react';
import {Router} from '@reach/router';
import './App.css';
import LoginReg from './views/LoginReg';
import Dashboard from './views/Dashboard';
import Main from './views/Main';
import Logout from './views/Logout';
import DisplayResults from './components/DisplayResults';
import SearchForm from './components/SearchForm';
import SingleChecklist from './views/SingleChecklist';

function App() {

  return (
    <div className="App">
      <Router path="/">
        <LoginReg path="/"/>
        <Dashboard path="/home"/>
        <Main path="main">
          <SearchForm path=""/>
          <DisplayResults path="results/:locale/:season"/>
        </Main>
        <SingleChecklist path="checklists/:id"/>
        <Logout path="logout"/>
      </Router>
    </div>
  );
}

export default App;
