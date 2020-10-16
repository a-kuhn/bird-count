import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

export default () => {
    const logout = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                console.log(`res from NavBar logout: ${res}`);
                navigate('/logout')
            })
            .catch(console.log)
    };

    return(
        <div className="container">
            <Link to="/home" className="btn btn-outline-primary btn-lg m-4">Home</Link>
            <Link to="/main" className="btn btn-outline-success btn-lg m-4">New List</Link>
            <button onClick={logout} className="btn btn-outline-danger btn-lg m-4">Logout</button>
        </div>
    );
};