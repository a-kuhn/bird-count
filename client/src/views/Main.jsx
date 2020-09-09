import React from 'react';
import {Link, Router} from '@reach/router';

import SearchForm from '../components/SearchForm';
import DisplayResults from '../components/DisplayResults';

export default () => {

    return(
        <div className="container">
            <div className="d-inline-flex">
                <Link to="/logout" className="btn btn-outline-danger btn-lg m-4">Logout</Link>
            </div>
            
            <SearchForm />

            <Router >
                <DisplayResults path="results/:locale/:season"/>
            </Router>
        </div>
    );
}