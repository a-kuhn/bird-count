import React from 'react';
import {Link} from '@reach/router';

export default () => {

    return(
        <div>
            <h1>You have successfully logged out!</h1>
            <Link to="/" className="btn btn-lg btn-outline-warning">Login / Register</Link>
        </div>
    );
}