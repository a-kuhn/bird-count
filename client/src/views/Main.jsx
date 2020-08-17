import React, {useState} from 'react';
import {Link} from '@reach/router';

import SearchForm from '../components/SearchForm';
import DisplayResults from '../components/DisplayResults';

export default () => {
    // create state that will be shared between SearchForm and DisplayResults
    const [locale, setLocale] = useState('');
    const [queryString, setQueryString] = useState('');
    const [season, setSeason] = useState('');
    const [radius, setRadius] = useState('');

    // create setter functions to pass down to SearchForm
    const formSetLocale = (locale) => setLocale(locale);
    const formSetQueryString = (queryString) => setQueryString(queryString);
    const formSetSeason = (season) => setSeason(season);
    const formSetRadius = (radius) => setRadius(radius);

    return(
        <div className="container">
            <div className="d-inline-flex">
                <Link to="/logout" className="logout-btn m-4">Logout</Link>
            </div>
            
            {/* SearchForm needs setter functions passed down */}
            <SearchForm 
                onNewLocale={formSetLocale}
                onNewQueryString={formSetQueryString}
                onNewSeason={formSetSeason}
                onNewRadius={formSetRadius}
            />

            {/* DisplayResults needs state passed down */}
            <DisplayResults 
                localeString={locale}
                queryStringPartial={queryString}
                seasonFilter={season}
                radiusFilter={radius}
            />
        </div>
    );
}