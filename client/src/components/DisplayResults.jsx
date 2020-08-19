import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({localeString, seasonFilter}) => {
    console.log(`loading results...\nprops: localeString=${localeString}, seasonFilter=${seasonFilter}`);
    // create variables for props passed down from Main.jsx 
    const locale = localeString;
    let currMonth = new Date().getMonth();
    let season = seasonFilter;
    if(season === 'thisSeason'){season=[currMonth-1, currMonth, currMonth+1]}
    if(season === 'springSeason'){season=[2,3,4]}
    if(season === 'summerSeason'){season=[5,6,7]}
    if(season === 'fallSeason'){season=[8,9,10]}
    if(season === 'winterSeason'){season=[11,0,1]}
    console.log(`season: ${season}`);
    // create state for results of API calls:
    const [birdList, setBirdList] = useState([]);
    const [geocodeError, setGeocodeError] = useState('');
    const [birdListError, setBirdListError] = useState('');
    
    // make calls to Geocoder then iNaturalist
    useEffect(()=>{
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: locale,
                key: process.env.REACT_APP_GEOCODER_KEY
            }
        })
            .then(res=>{
                // use response to build request to iNaturalist:
                let currDate = new Date();
                axios.get(`https://api.inaturalist.org/v1/observations`, {
                    params: {
                        iconic_taxa: `Aves`,
                        order: `desc`,
                        order_by: `observed_on`,
                        quality_grade: `research`,
                        geoprivacy: `open`,
                        month: `${season}`,
                        // d1 = must be observed on or after this date
                        d1: `${currDate.getFullYear()-50}-${currDate.getMonth()+1}-${currDate.getDate()}`,
                        // d2 = must be observed on or before this date
                        d2: `${currDate.getFullYear()}-${currDate.getMonth()+1}-${currDate.getDate()}`,
                        // using geocoder response to fill lat & long
                        lat: `${res.data.results[0].geometry.location.lat}`,
                        lng: `${res.data.results[0].geometry.location.lng}`
                    }
                })
                    .then(r=>{setBirdList(r.data.results); console.log(r.data.results);})
                    // .then(filterBirdList(birdList))
                    .catch(err => setBirdListError(`an error occurred while trying to build your checklist:\n${err}`))
            })
            .catch(err=>setGeocodeError(`something's wrong with the location you're using:\n${err}`))
    },[locale, season]);

    // filter results for season & unique taxa
    const filterBirdList = (bigList) => {
        let filteredList = bigList;
    }

    // display filtered list of results
    return(
        <div>
            {geocodeError.length>0 && <p className="err-msg">{geocodeError}</p>}
            {birdListError.length>0 && <p className="err-msg">{birdListError}</p>}
            <h1>placeholder for bird call results</h1>
            <h4>locale: {locale}</h4>
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