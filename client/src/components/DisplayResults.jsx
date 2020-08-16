import React, {useState, useEffect} from 'react';

export default () => {
    // create state for props passed down from Main.jsx & results of API calls:
    const [locale, setLocale] = useState('');
    const [queryString, setQueryString] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [birdList, setBirdList] = useState([]);

    // make calls to Geocoder then iNaturalist

    // filter results for season & unique taxa

    // display filtered list of results
    return(
        <div>
            <h1>placeholder for bird call results</h1>
        </div>
    );
}