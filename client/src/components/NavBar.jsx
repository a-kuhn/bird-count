import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

export default () => {
    return(
        <div className="container">
            <Link to="/logout" className="btn btn-outline-danger btn-lg m-4">Logout</Link>
            <Link to="/home" className="btn btn-outline-primary btn-lg m-4">Home</Link>
        </div>
    );
};