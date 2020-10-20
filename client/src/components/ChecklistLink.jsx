import React from 'react';
import redTrashCan from '../img/redTrashCan.png';

export default ({checklist}) => {
    const formatted_date = checklist.updatedAt.slice(0,10);

    return(
        <div className="">
            <div className="card mb-3 mr-3 thick-border col-9 d-inline-flex" >
                <div className="card-body justify-content-between d-flex">
                    <a 
                        href={`http://localhost:8000/checklists/${checklist._id}`}
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
            <div className="thick-border col-2 d-inline-flex ">
                <a href={`#`}>
                    {/* <img src={redTrashCan} className=""/> */}
                    future delete button
                </a>
            </div>
        </div>
    );
}
//style={{width: 20 + 'em'}} 