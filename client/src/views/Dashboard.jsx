import React, {useState, useEffect} from 'react';
import {Link, Router} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';

export default () => {
    //TODO: axios -> get all checklists; display all checklists as links that navigate to /checklists/:id
    const [checklists, setChecklists] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/checklists", {withCredentials: true})
            .then(res => {
                console.log(`successfully loaded checklists!\n${res.data.checklists[0]._id}`);
                setChecklists(res.data.checklists);
            })
    }, []);

    return(
        <div className="container">
            <NavBar/>

            <div>
                <h2>Here's all your saved lists!</h2>
            </div>
            {/* <div>checklists.checklists: {checklists.checklists}</div> */}

        </div>
    );
}