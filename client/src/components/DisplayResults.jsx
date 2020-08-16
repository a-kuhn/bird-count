import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({localeString, queryStringPartial, seasonFilter}) => {
    // create variables for props passed down from Main.jsx 
    const locale = localeString;
    let queryString;
    const season = seasonFilter;
    // create state for results of API calls:
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [birdList, setBirdList] = useState([]);
    const [geocodeError, setGeocodeError] = useState('');
    const [birdListError, setBirdListError] = useState('');

    // make calls to Geocoder then iNaturalist
    useEffect(()=>{
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locale}&key=AIzaSyAOE1uOMORKE316bMjyhS3ZK0kP6HQpU5Q`)
            .then(res => console.log(res.data.results[0].geometry.location.lat))
            .then(res=>setLat((res.data.results[0].geometry.location.lat)))
            .then(res=>setLng((res.data.results[0].geometry.location.lng)))
            .then(console.log(`lat: ${lat}\nlng: ${lng}`))
            .then(queryString = (`${queryStringPartial}&lat=${lat}&lng=${lng}`))
            .then(console.log(`queryStringFinal: ${queryString}`))
            // .then(
            //     axios.get(`https://${queryString}`)
            //         .then(res=>setBirdList(res.data))
            //         .then(filterBirdList(birdList))
            //         .catch(err => setBirdListError(`an error occurred while trying to build your checklist`))
            // )
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

        </div>
    );
}