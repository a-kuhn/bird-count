import React, {useState, useEffect} from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ChecklistLink from '../components/ChecklistLink';
import LoadingUpdates from './LoadingUpdates';
import NoLists from '../components/NoLists';

export default () => {
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

    // GET ALL USER'S CHECKLISTS:
    const [checklists, setChecklists] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/checklists", {withCredentials: true})
            .then(res => {
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
                const filteredLists = checklists.filter(list => {return list._id != deleteId;});
                setChecklists(filteredLists);
                setIsLoaded(true);
            })
            .catch(err => console.log(err));
    };

    return(
        <div className="container">
            <NavBar userName={loggedInUser.firstName}/>

            {!isLoaded && <LoadingUpdates />}
            {(isLoaded && checklists.length > 0) ? 
            <div>
                <h2 className="text-left dark-font">Here's all your saved checklists:</h2>
                <h6 className="helper-msg-color text-left ml-1">Click on a list to view/update it.</h6>
            </div> : null}
            {(isLoaded && checklists.length === 0) ? <NoLists/> : null}
            {(isLoaded && checklists.length > 0) ? 
            checklists.map((checklist, idx)=> {
                    return(
                        <div className="d-flex ">
                            <ChecklistLink checklist={checklist} key={idx}/>
                                <button 
                                    onClick={e => handleDelete(checklist._id)} 
                                    className="text-center btn btn-danger d-inline-flex align-self-center">
                                    delete                                
                                </button>
                        </div>
                    )
                }
                ) : null}
        </div>
    );
}