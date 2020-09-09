import React from 'react';
import {Link} from '@reach/router';

export default () => {

    return(
        <div className="container my-5">
            <h1 className="my-4">You have successfully logged out!</h1>
            <Link to="/" className="btn btn-outline-success btn-lg mb-4">Login / Register</Link>
        </div>
    );
}