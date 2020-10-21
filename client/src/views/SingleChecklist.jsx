import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import Bird from '../components/Bird';
import BirdBinoculars from './BirdBinoculars';


export default ({checklistId}) => {
    var _ = require('agile');
    // isLoaded to prevent map of birds to run on undefined
    const [isLoaded, setIsLoaded] = useState(false);
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
            <NavBar/>
            {/* while data is loading, display gif: */}
            {!isLoaded &&
            <BirdBinoculars />
            }
            <div>
                {/* create form & map over checklist like in DisplayResults */}
                {/* add Title, Location, Notes fields */}
                {isLoaded && 
                <form onSubmit={saveEditsHandler}>
                    <div className="d-inline-flex">
                        <button className="btn btn-primary mb-4 ml-4">Save Changes</button>
                    </div>
                    <br></br>
                    <div className="form-row m-2">
                        <div className="form-row col-6">
                            <label className="text-left">Title:</label>
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
                            <label>Location:</label>
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
                        <label>Notes:</label>
                        <input
                            name="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            type="text-area"
                            className="form-control"
                            placeholder={notes}
                        ></input>
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
                    <button className="btn btn-primary">Save Changes</button>
                </form>}
            </div>
        </div>
    );
}