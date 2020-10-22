import React, {useState, useEffect} from 'react';
import {Link, Router} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import SearchForm from '../components/SearchForm';
import DisplayResults from '../components/DisplayResults';

export default () => {
    // GET LOGGED IN USER:
    const [loggedInUser, setLoggedInUser] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
            .then(user => {
                console.log(`user: ${user.data.email}`)
                setLoggedInUser(user.data);
            })
            .catch(err => {console.log(err)}); 
    }, []);

    return(
        <div className="container">
            <NavBar userName={loggedInUser.firstName}/>
            
            <SearchForm />

            <Router >
                <DisplayResults path="results/:locale/:season"/>
            </Router>
        </div>
    );
}