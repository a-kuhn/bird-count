import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Bird from './Bird';
import orderBy from 'agile';

export default (props) => {
    console.log(`loading results...\nprops: locale=${props.locale}, season=${props.season}`);
    // create variables for props passed down from Main.jsx 
    const locality = props.locale;
    const season = decodeURIComponent(props.season);

    // create state for results of API calls:
    const [birdList, setBirdList] = useState([]);
    const [geocodeError, setGeocodeError] = useState('');
    const [birdListError, setBirdListError] = useState('');

    // filter results for unique taxa, then order by common name
    const filterBirds = (birds) => {
        let fullList = [...birds];
        // console.log(`birds: ${fullList}`);
        let filteredList = [];
        let uniqueBirds = [];
        fullList.forEach(b => {
            if (!uniqueBirds.includes(b.taxon.preferred_common_name)){
                filteredList.push(b);
                uniqueBirds.push(b.taxon.preferred_common_name);
                // console.log(`adding ${b.taxon.preferred_common_name} to filteredList and uniqueBirds...`);
            }
        });
        console.log(`starting to filter...`);
        let orderedList = orderBy(filteredList, 'taxon.preferred_common_name');
        return orderedList;
    }
    
    // make calls to Geocoder then iNaturalist
    useEffect(()=>{
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                address: locality,
                key: process.env.REACT_APP_GEOCODER_KEY
            }
        })
            .then(res=>{
                // use response to build request to iNaturalist:
                let currDate = new Date();
                axios.get(`https://api.inaturalist.org/v1/observations`, {
                    params: {
                        per_page: 200,
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
                    .then(r=>{
                        let birds = filterBirds(r.data.results); 
                        console.log(birds);
                        setBirdList(birds);
                    })
                    .catch(err => setBirdListError(`an error occurred while trying to build your checklist:\n${err}`))
            })
            .catch(err=>setGeocodeError(`something's wrong with the location you're using:\n${err}`))
    },[locality, season]);

    // display filtered list of results
    return(
        <div>
            {geocodeError.length>0 && <p className="err-msg">{geocodeError}</p>}
            {birdListError.length>0 && <p className="err-msg">{birdListError}</p>}

            <h4>Here's what we found:</h4>
            <ul>
                { birdList.map((bird, idx)=>
                <Bird bird={bird} key={idx}/>
                )}
            </ul>

        </div>
    );
}