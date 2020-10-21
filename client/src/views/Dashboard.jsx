import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ChecklistLink from '../components/ChecklistLink';
import LoadingUpdates from './LoadingUpdates';

export default () => {
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

    // GET ALL USER'S CHECKLISTS:
    const [checklists, setChecklists] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/checklists", {withCredentials: true})
            .then(res => {
                console.log(`successfully loaded checklists!\n${res.data.checklists[0].title}`);
                let lists = res.data.checklists;
                lists = _.orderBy(lists, '-updatedAt');
                setChecklists(lists);
                setIsLoaded(true);
            })
            .catch(err => {console.log(err)}); 
    }, []);

    const handleDelete = (deleteId) => {
        setIsLoaded(false);
        axios.delete(`http://localhost:8000/api/checklists/${deleteId}`, {withCredentials: true})
            .then(res => {
                console.log(`deleting checklist: ${deleteId}`);
                const filteredLists = checklists.filter(list => {
                    return list._id != deleteId;
                });
                console.log(`filtered lists: ${filteredLists}`);
                setChecklists(filteredLists);
                setIsLoaded(true);
            })
            .catch(err => console.log(err));
    };

    return(
        <div className="container">
            <NavBar/>

            <div>
                <h2 className="text-left">Here's all your saved lists:</h2>
            </div>
            {!isLoaded && <LoadingUpdates />}
            {isLoaded && checklists.map((checklist, idx)=> {
                    return(
                        <div className="d-flex ">
                            <ChecklistLink checklist={checklist} key={idx}/>
                            <div className="thick-border col-2 d-inline-flex p-3 mb-3 card align-self-stretch ">
                                <button 
                                    onClick={e => handleDelete(checklist._id)} 
                                    className="stretched-link text-center btn btn-danger align-self-center">
                                    {/* <img src={redTrashCan} className=""/> */}
                                    delete                                
                                </button>
                            </div>
                        </div>
                    )
                }
                )}


        </div>
    );
}