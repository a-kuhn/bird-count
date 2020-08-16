import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({localeString, queryStringPartial, seasonFilter}) => {
    // create variables for props passed down from Main.jsx 
    const locale = localeString;
    const season = seasonFilter;
    let queryString;
    // create state for results of API calls:
    const [birdList, setBirdList] = useState([]);
    const [geocodeError, setGeocodeError] = useState('');
    const [birdListError, setBirdListError] = useState('');
    
    // make calls to Geocoder then iNaturalist
    useEffect(()=>{

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locale}&key=${process.env.REACT_APP_GEOCODER_KEY}`)
            .then(res=>{
                // use response to build request to iNaturalist:
                // queryString = `${queryStringPartial}&lat=${res.data.results[0].geometry.location.lat}&lng=${res.data.results[0].geometry.location.lng}`;

                axios.get(`https://api.inaturalist.org/v1/observations${queryStringPartial}&lat=${res.data.results[0].geometry.location.lat}&lng=${res.data.results[0].geometry.location.lng}`)
                    .then(res=>{setBirdList(res.data.results); console.log(res.data.results);})
                    // .then(filterBirdList(birdList))
                    .catch(err => setBirdListError(`an error occurred while trying to build your checklist:\n${err}`))
            })
            .catch(err=>setGeocodeError(`something's wrong with the location you're using:\n${err}`))
    },[locale]);

    // filter results for season & unique taxa
    const filterBirdList = (bigList) => {
        let filteredList = bigList;
    }

    // display filtered list of results
    return(
        <div>
            {geocodeError.length>0 && <p>{geocodeError}</p>}
            <h1>placeholder for bird call results</h1>
            <h4>locale: {locale}</h4>
            <h4>queryString: {queryString}</h4>
            <h4>season: {season}</h4>

            <h4>unfiltered list:</h4>
            <ul>
                { birdList.map((bird, idx)=>
                <li key={idx}>{bird.species_guess}</li>
                )}
            </ul>

        </div>
    );
}