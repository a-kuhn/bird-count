import React from 'react';
import {Link} from '@reach/router';

export default () => {

    return(
        <div>
            <h1>Welcome to Bird Count!</h1>
            <p>future development will be to add login and registration functionality</p>
            <h3>For now, please, <Link to="/main" className="btn btn-outline-success btn-lg">continue as a guest</Link></h3>
        </div>
    );
}