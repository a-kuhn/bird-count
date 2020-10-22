import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

export default (props) => {
    const [user, setUser] = useState(props.userName);
    console.log();

    const logout = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then(res => {
                console.log(`res from NavBar logout: ${res.data.msg}`);
                navigate('/logout')
            })
            .catch(console.log)
    };

    return(
        <div className="d-flex">
            <Link to="/home" className="btn btn-outline-primary btn-lg m-4">Home</Link>
    <h2 className="dark-font mr-auto mt-4"> Hey, {user}**insert user name**! </h2>
            <Link to="/main" className="btn btn-outline-success btn-lg m-4">New List</Link>
            <button onClick={logout} className="btn btn-outline-danger btn-lg m-4">Logout</button>
        </div>
    );
};