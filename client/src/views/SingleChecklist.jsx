import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ChecklistBird from '../components/ChecklistBird';
import BirdBinoculars from './BirdBinoculars';


export default ({checklistId}) => {
    var _ = require('agile');
    const [isLoaded, setIsLoaded] = useState(false);
    // GET LOGGED IN USER:
    const [loggedInUser, setLoggedInUser] = useState({});
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
            .then(user => {
                console.log(`logged in user: ${user.data.email}`)
                setLoggedInUser(user.data);
            })
            .catch(err => {console.log(err)}); 
    }, []);
    // GET CHECKLIST
    const [lastUpdated, setLastUpdated] = useState();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [birds, setBirds] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/checklists/${checklistId}`, {withCredentials: true})
            .then(res => {
                setLastUpdated(res.data.updatedAt.slice(0,10));
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
        const editedChecklist = {title, location, notes, birds};
        axios.put(`http://localhost:8000/api/checklists/${checklistId}`, editedChecklist, {withCredentials: true})
             .then(res => res.json({msg:`successfully updated checklist!`}))
             .catch(err => console.log(err));
        navigate('/home')
    };

    const hasBeenSeenHandler = (idx) => {
        console.log(`hasBeenSeenHandler triggered...`);
        let birdList = [...birds];
        birdList[idx].hasBeenSeen = !birdList[idx].hasBeenSeen;
        if (birdList[idx].hasBeenSeen) {
            let currDate = new Date();
            let formattedDate = `${currDate.getFullYear()}-${currDate.getMonth()+1}-${currDate.getDate()}`;
            birdList[idx].observedOn = formattedDate;
        } 
        else {birdList[idx].observedOn = ''};
        birdList = _.orderBy(birdList, ['hasBeenSeen', 'commonName']);
        setBirds(birdList);
    };

    return(
        <div className="container">
            <NavBar userName={loggedInUser.firstName}/>
            {!isLoaded && <BirdBinoculars />}
            <div>
                {isLoaded && 
                <>
                <h1 className="dark-font text-left">{title}</h1>
                <h4 className="dark-font text-left">Last updated: <span className="dark-font h2">{lastUpdated}</span></h4>
                <h6 className="helper-msg-color text-left">Check off the birds as you spot them. Make any other changes you'd like and click save when you're ready!</h6>
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
                        <textarea
                            name="notes"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            type="text-area"
                            className="form-control"
                            placeholder={notes}
                            rows={5}
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary mb-4 mr-2 btn-lg">Save Changes</button>
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
                                <ChecklistBird bird={bird} />
                            </label>
                        )
                    }
                    )}
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-primary btn-lg mr-4">Save Changes</button>
                    </div>
                </form>
                </>}
            </div>
        </div>
    );
}