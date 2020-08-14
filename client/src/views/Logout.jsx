import React from 'react';
import {Link} from '@reach/router';

export default () => {

    return(
        <div className="container my-5">
            <h1 className="my-4">You have successfully logged out!</h1>
            <Link to="/" className="btn login-reg-btn">Login / Register</Link>
        </div>
    );
}