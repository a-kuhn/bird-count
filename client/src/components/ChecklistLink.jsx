import React from 'react'

export default ({checklist}) => {
    const formatted_date = checklist.updatedAt;

    return(
        <>
        <div className="card mb-3 mr-3 thick-border d-flex" style={{width: 20 + 'em'}} >
            <div className="card-body text-center">
                <a 
                    href={`http://localhost:8000/checklists/${checklist._id}`}
                    className="h5 py-3 stretched-link"
                >{checklist.title}
                </a>
                <p className="font-italic">{checklist.location}</p>
                <p><span className="h6 dark-font" style={{fontSize: 14 + 'px'}}>last updated: </span>{formatted_date}</p>
            </div>
        </div>
        </>
    );
}
