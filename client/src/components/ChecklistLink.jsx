import React from 'react';

export default ({checklist}) => {
    const formatted_date = checklist.updatedAt.slice(0,10);

    return(
        <div className="card mb-3 mr-3 thick-border col-9 d-inline-flex" >
            <div className="card-body justify-content-between d-flex">
                <a 
                    href={`/checklists/${checklist._id}`}
                    className="h2 py-3 stretched-link d-inline-flex col-5"
                >{checklist.title}
                </a>
                <div className="col-5">
                    <p 
                        className="font-bold d-inline-flex align-self-center" 
                        style={{fontSize: 22 + 'px'}}
                    >location:  {checklist.location}
                    </p>
                    <p 
                        className="h6 dark-font d-inline-flex align-self-center mr-4" 
                        style={{fontSize: 14 + 'px'}}
                    >last updated: {formatted_date}
                    </p>
                </div>
            </div>
        </div>
    );
}
