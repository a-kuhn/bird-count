import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Bird from '../components/Bird';
import BirdBinoculars from './BirdBinoculars';


export default ({checklistId}) => {
    var _ = require('agile');
    const [isLoaded, setIsLoaded] = useState(false);
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
    // GET CHECKLIST
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [birds, setBirds] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/checklists/${checklistId}`, {withCredentials: true})
            .then(res => {
                console.log(`response from getOne checklist: ${res.data.birds[0].commonName}`);
                setTitle(res.data.title);
                setLocation(res.data.location);
                setNotes(res.data.notes);
                setBirds(_.orderBy(res.data.birds, ['hasBeenSeen', 'commonName']));
                setIsLoaded(true);
            })
            .catch(err => console.log(err));
    },[]);

    const saveEditsHandler = (e) => {
        e.preventDefault();
        console.log(`save edits handler triggered...`);
        //create object to send to db:
        const editedChecklist = {title, location, notes, birds};
        // send object to db to update record
        axios.put(`http://localhost:8000/api/checklists/${checklistId}`, editedChecklist, {withCredentials: true})
             .then(res => res.json({msg:`successfully updated checklist!`}))
             .catch(err => console.log(err));
        navigate('/home')
    };

    const hasBeenSeenHandler = (idx) => {
        console.log(`hasBeenSeenHandler triggered...`);
        let birdList = [...birds];
        birdList[idx].hasBeenSeen = !birdList[idx].hasBeenSeen;
        birdList = _.orderBy(birdList, ['hasBeenSeen', 'commonName']);
        setBirds(birdList);
    };

    return(
        <div className="container">
            <NavBar userName={loggedInUser.firstName}/>
            {/* while data is loading, display gif: */}
            {!isLoaded &&
            <BirdBinoculars />
            }
            <div>
                {/* create form & map over checklist like in DisplayResults */}
                {/* add Title, Location, Notes fields */}
                {isLoaded && 
                <form onSubmit={saveEditsHandler}>
                    
                    <br></br>
                    <div className="form-row m-2">
                        <div className="col-8"></div>
                        <div className="form-row col-6">
                            <label className="h4 dark-font">Title:</label>
                            <input
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text"
                                className="form-control"
                                placeholder={title}
                            ></input>
                        </div>
                        <div className="form-row ml-2 col-6">
                            <label className="h4 dark-font">Location:</label>
                            <input
                                name="location"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                                type="text"
                                className="form-control"
                                placeholder={location}
                            ></input>
                        </div>
                    </div>
                    <div className="form-row m-2">
                        <label className="h4 dark-font">Notes:</label>
                        <input
                            name="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            type="text-area"
                            className="form-control"
                            placeholder={notes}
                        ></input>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mb-4 btn-lg">Save Changes</button>
                    </div>
                    {birds.map((bird, idx)=> {
                        return(
                            // <label className="hidden-checkbox" >
                            <label  >
                                <input 
                                    type="checkbox" 
                                    value={bird} 
                                    key={idx} 
                                    checked={bird.hasBeenSeen}
                                    onChange={() => hasBeenSeenHandler(idx)}
                                />
                                <Bird bird={bird} />
                            </label>
                        )
                    }
                    )}
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-primary btn-lg mr-4">Save Changes</button>
                    </div>
                </form>}
            </div>
        </div>
    );
}