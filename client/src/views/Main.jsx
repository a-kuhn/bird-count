import React from 'react';
import {Link} from '@reach/router';

export default () => {

    return(
        <div className="container">
            <div className="d-inline-flex">
                <Link to="/logout" className="logout-btn m-4">Logout</Link>
            </div>
            <p>Main Page!! this will hold the SearchForm, CreateChecklist, MyChecklists, and SingleChecklist components and views</p>
        </div>
    );
}