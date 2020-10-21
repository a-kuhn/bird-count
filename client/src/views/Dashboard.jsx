import React, {useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import axios from 'axios';

import NavBar from '../components/NavBar';
import ChecklistLink from '../components/ChecklistLink';

export default () => {
    var _ = require('agile');
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
            })
            .catch(err => {console.log(err)}); 
    }, []);

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/checklists/${deleteId}`, {withCredentials: true})
            .then(res => {
                console.log(`deleting checklist: ${deleteId}`);
                const filteredLists = checklists.filter(list => {
                    return list._id != deleteId;
                });
                console.log(`filtered lists: ${filteredLists}`);
                setChecklists(filteredLists);
            })
            .catch(err => console.log(err));
    };

    return(
        <div className="container">
            <NavBar/>

            <div>
                <h2 className="text-left">Here's all your saved lists:</h2>
            </div>


            { checklists.map((checklist, idx)=> {
                    return(
                        <>
                            <ChecklistLink checklist={checklist} key={idx} className=""/>
                            <div className="thick-border col-2 d-inline-flex mb-3 card">
                                <button onClick={e => handleDelete(checklist._id)} className="stretched-link text-center btn btn-danger ">
                                    {/* <img src={redTrashCan} className=""/> */}
                                    delete button                                
                                </button>
                            </div>
                        </>
                    )
                }
                )}


        </div>
    );
}