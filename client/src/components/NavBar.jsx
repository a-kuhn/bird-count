import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

export default () => {
    const logout = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/logout')
            .then(res => {
                console.log(`res from NavBar logout: ${res}`);
                navigate('/logout')
            })
    };

    return(
        <div className="container">
            <button onClick={logout} className="btn btn-outline-danger btn-lg m-4">Logout</button>
            <Link to="/home" className="btn btn-outline-primary btn-lg m-4">Home</Link>
        </div>
    );
};