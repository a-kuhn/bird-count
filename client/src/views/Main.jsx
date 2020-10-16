import React from 'react';
import {Link, Router} from '@reach/router';

import NavBar from '../components/NavBar';
import SearchForm from '../components/SearchForm';
import DisplayResults from '../components/DisplayResults';

export default () => {

    return(
        <div className="container">
            <NavBar />
            
            <SearchForm />

            <Router >
                <DisplayResults path="results/:locale/:season"/>
            </Router>
        </div>
    );
}