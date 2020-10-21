import { navigate } from '@reach/router';
import axios from 'axios';
import React from 'react';
import redTrashCan from '../img/redTrashCan.png';

export default ({checklist}) => {
    const formatted_date = checklist.updatedAt.slice(0,10);

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/checklists/${deleteId}`, {withCredentials: true})
            .then(res => {
                navigate('/home');
            })
            .catch(err => console.log(err));
    };

    return(
        <div className="d-flex justify-content-between">
            <div className="card mb-3 mr-3 thick-border col-9 d-inline-flex" >
                <div className="card-body justify-content-between d-flex">
                    <a 
                        href={`/checklists/${checklist._id}`}
                        className="h2 py-3 stretched-link d-inline-flex col-8"
                    >{checklist.title}
                    </a>
                    <div className="col-4">
                        <p 
                            className="font-bold d-inline-flex align-self-center" 
                            style={{fontSize: 22 + 'px'}}
                        >location: 
                            <span>{checklist.location}</span>
                        </p>
                        <p 
                            className="h6 dark-font d-inline-flex align-self-center mr-4" 
                            style={{fontSize: 14 + 'px'}}
                        >last updated: 
                            <span>{formatted_date}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="thick-border col-2 d-inline-flex mb-3 card">
                <button onClick={e => handleDelete(checklist._id)} className="stretched-link text-center btn btn-danger ">
                    {/* <img src={redTrashCan} className=""/> */}
                    delete
                </button>
            </div>
        </div>
    );
}
//style={{width: 20 + 'em'}} 