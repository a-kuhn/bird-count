import React from 'react'

export default ({checklist}) => {

    return(
        <>
        <div className="card mb-3 mr-3 thick-border" style={{width: 20 + 'em'}} >
            <div className="card-body text-center">
                <a 
                    href={`http://localhost:8000/checklists/${checklist._id}`}
                    className="h5 py-3"
                    stretched-link
                >{checklist.title}
                </a>
                <p className="font-italic">{checklist.location}</p>
                <a href={`${bird.iNatOccUrl}`}><span className="h6 dark-font" style={{fontSize: 14 + 'px'}}>last seen here on: </span>{formatted_date}</a>
            </div>
        </div>
        </>
    );
}
