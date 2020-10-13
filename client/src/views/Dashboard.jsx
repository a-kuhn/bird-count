import React from 'react';
import {Link, Router} from '@reach/router';


export default () => {

    return(
        <div className="container">
            <div className="d-inline-flex">
                <Link to="/logout" className="btn btn-outline-danger btn-lg m-4">Logout</Link>
            </div>

            <div>
                <p>placeholder for list of logged-in user's saved checklists</p>
            </div>
        </div>
    );
}