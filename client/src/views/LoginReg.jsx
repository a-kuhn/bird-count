import React from 'react';
import {Link} from '@reach/router';

import Register from '../components/Register';
import Login from '../components/Login';

export default () => {

    return(
        <>
        <h1 className="mt-4">Welcome to Bird Count!</h1>
        <h3>Just having a look around? </h3>
        <Link to="/main" className="btn btn-outline-success btn-lg mb-4">continue as a guest</Link>
        <div className="container">
            <div className="row justify-content-center">
                <Register />
                <Login />
            </div>
        </div>
        </>
    );
}