import React, {useState, useEffect} from 'react';

export default ({localeString, queryStringPartial}) => {
    // create variables for props passed down from Main.jsx 
    const locale = localeString;
    const queryString = queryStringPartial;
    // create state for results of API calls:
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [birdList, setBirdList] = useState([]);

    // make calls to Geocoder then iNaturalist

    // filter results for season & unique taxa

    // display filtered list of results
    return(
        <div>
            <h1>placeholder for bird call results</h1>
            <h4>locale: {locale}</h4>
            <h4>queryString: {queryString}</h4>

        </div>
    );
}