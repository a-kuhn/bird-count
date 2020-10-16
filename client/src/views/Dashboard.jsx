import React from 'react';
import {Link, Router} from '@reach/router';

import NavBar from '../components/NavBar';

export default () => {

    return(
        <div className="container">
            <NavBar/>

            <div>
                <p>placeholder for list of logged-in user's saved checklists</p>
            </div>
        </div>
    );
}