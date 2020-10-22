import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

export default (props) => {
    const userName = props.userName;
    console.log(userName);

    const logout = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                console.log(`res from NavBar logout: ${res.data.msg}`);
                navigate('/')
            })
            .catch(console.log)
    };

    return(
        <div className="d-flex justify-content-around">
            <Link to="/home" className="btn btn-outline-primary btn-lg mr-4 my-4">Home</Link>
            <h2 className="dark-font mr-auto mt-4"> Hey, {userName}! </h2>
            <Link to="/main" className="btn btn-outline-success btn-lg m-4">New List</Link>
            <button onClick={logout} className="btn btn-outline-danger btn-lg m-4">Logout</button>
        </div>
    );
};