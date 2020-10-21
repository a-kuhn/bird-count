import React, {useState, useEffect} from 'react';
import {Link, Router} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';


export default ({checklistId}) => {
    // GET CHECKLIST
    const [checklist, setChecklist] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/checklists/${checklistId}`, {withCredentials: true})
            .then(res => {
                console.log(`response from getOne checklist: ${res.data.title}`);
                setChecklist(res.data);
            })
            .catch(err => console.log(err));
    },[]);

    return(
        <div className="container">
            <NavBar/>

            <div>
                <p>placeholder to display single checklist as form to be updated by user clicking bird card to toggle hasBeenSeen property</p>
                {/* create form & map over checklist like in DisplayResults */}
                {/* add Title, Location, Notes fields */}
                
            </div>
        </div>
    );
}