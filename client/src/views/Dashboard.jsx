import React, {useState, useEffect} from 'react';
import {Link, Router} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ChecklistLink from '../components/ChecklistLink';

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

    // GET ALL USER'S CHECKLISTS:
    const [checklists, setChecklists] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/checklists", {withCredentials: true})
            .then(res => {
                console.log(`successfully loaded checklists!\n${res.data.checklists[0].title}`);
                setChecklists(res.data.checklists);
            })
    }, []);

    return(
        <div className="container">
            <NavBar/>

            <div>
                <h2 className="text-left">Here's all your saved lists:</h2>
            </div>


            { checklists.map((checklist, idx)=> {
                    return(
                        <ChecklistLink checklist={checklist} key={idx} className=""/>
                    )
                }
                )}


        </div>
    );
}