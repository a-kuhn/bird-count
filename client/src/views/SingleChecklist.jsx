import React from 'react';
import {Link, Router} from '@reach/router';


export default () => {

    return(
        <div className="container">
            <div className="d-inline-flex">
                <Link to="/logout" className="btn btn-outline-danger btn-lg m-4">Logout</Link>
                <Link to="/home" className="btn btn-outline-primary btn-lg m-4">Home</Link>
            </div>

            <div>
                <p>placeholder to display single checklist as form to be updated by user clicking bird card to toggle hasBeenSeen property</p>
            </div>
        </div>
    );
}