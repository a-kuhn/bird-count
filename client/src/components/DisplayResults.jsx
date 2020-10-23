import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Bird from './Bird';
import { navigate } from '@reach/router';
import BirdBinoculars from '../views/BirdBinoculars';


export default (props) => {
    console.log(`loading results...\nprops: locale=${props.locale}, season=${props.season}`);
    const [isLoaded, setIsLoaded] = useState(false);
    // to use orderBy in filterBirds():
    var _ = require('agile');

    const [loggedInUser, setLoggedInUser] = useState({});
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/loggedin", {withCredentials: true})
            .then(user => {
                console.log(`user: ${user.data.email}`)
                setLoggedInUser(user.data);
            })
            .catch(err => {console.log(err)}); 
    }, [])

    
    // create variables for props passed down through Router 
    const locality = props.locale;
    const season = decodeURIComponent(props.season);
    let localeString = decodeURIComponent(locality).replace("+", ", ");

    // create state for results of API calls:
    const [birdList, setBirdList] = useState([]);
    const [geocodeError, setGeocodeError] = useState('');
    const [birdListError, setBirdListError] = useState('');
    // create state for other checklist inputs:
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState(localeString);
    const [notes, setNotes] = useState("");

    // filter results for unique taxa, then order by common name
    const filterBirds = (birds) => {
        let fullList = [...birds];
        let filteredList = [];
        let uniqueBirds = [];
        fullList.forEach(b => {
            if (!uniqueBirds.includes(b.taxon.preferred_common_name)){                
                filteredList.push({
                    photoUrl: b.taxon.default_photo.square_url,
                    commonName: b.taxon.preferred_common_name,
                    latinName: b.taxon.name,
                    wikipediaUrl: b.taxon.wikipedia_url,
                    iNatOccUrl: b.uri,
                    observedOn: b.observed_on,
                    hasBeenSeen: false,
                    notes: "",
                    shouldSave: true
                });
                
                uniqueBirds.push(b.taxon.preferred_common_name);
            }
        });
        console.log(`starting to filter...`);
        let orderedList = _.orderBy(filteredList, 'commonName');
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
                        setIsLoaded(true);
                    })
                    .catch(err => setBirdListError(`An error occurred while trying to build your checklist. Please try again.`))
            })
            .catch(err=>setGeocodeError(`Something's wrong with the location you're using. Try broadening your search.`))
    },[]);

    // toggle bird.shouldSave
    const keepBirdHandler = (idx) => {
        birdList[idx].shouldSave = !birdList[idx].shouldSave;
        setBirdList([...birdList]);
    }

    //build post request to save checklist to user's account
    const saveChecklistHandler = (e) => {
        e.preventDefault();
        //filter through birdList, keep only birds with shouldSave == true, don't save that attribute
        let birdsToSave = [...birdList];
        birdsToSave = birdsToSave.filter(b => b.shouldSave ===true);
        birdsToSave = birdsToSave.map( b => {
            let bird = {
                commonName: b.commonName,
                hasBeenSeen: b.hasBeenSeen,
                iNatOccUrl: b.iNatOccUrl,
                latinName: b.latinName,
                notes: b.notes,
                observedOn: b.observedOn,
                photoUrl: b.photoUrl,
                wikipediaUrl: b.wikipediaUrl
            };
            return bird;
        });
        
        //create checklist object && send to db, then update user's .checklists 
        let newChecklist = {
            birds: birdsToSave, 
            creator: loggedInUser._id, 
            location: location, 
            notes: notes, 
            title: title.length > 0 ? title : "[No Title]"};
        axios.post("http://localhost:8000/api/checklists/new", newChecklist, {withCredentials: true})
            .then( res => {
                const listId = res.data.newList._id;
                const editedUser = {checklists: loggedInUser.checklists.concat(listId)};
                // console.log(`res from /api/checklists/new ${res.data.newList._id}`);
                axios.put("http://localhost:8000/api/users/edit", editedUser, {withCredentials: true})
                    .then(res => {
                        res.json({msg: `checklist._id successfully added to user's acct!`});
                    })
                    .catch(err => console.log(`error adding checklist to user's acct: ${err}`));
                return listId;
            })
            .then(newListId => {
                navigate(`/checklists/${newListId}`);})
            .catch(err => console.log(`error with making new checklist: ${err}`))
    }

    // display filtered list of results as a form to create new checklist
    return(
        <div>
            {geocodeError.length>0 && <p className="error-message">{geocodeError}</p>}
            {birdListError.length>0 && <p className="error-message">{birdListError}</p>}
            {!isLoaded && <BirdBinoculars/>}
            <hr className="thick-border"/>
            {isLoaded && 
            <form onSubmit={saveChecklistHandler}>
                <div className="d-flex justify-content-between">
                    <h2 className="ml-2 dark-font">Here's what we found:</h2>
                    <button className="btn btn-primary btn-lg mr-4">Save Checklist</button>
                </div>
                <h6 className="helper-msg-color text-left ml-2">To save this list, decide which birds to keep (&#x2611;) or not (&#x2610;), add a title if you want, then hit the save button.</h6>
                <br></br>
                <div className="form-row m-2">
                    <div className="form-row col-6">
                        <label className="text-left">Title:</label>
                        <input
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            className="form-control"
                            placeholder="Do you want to name this list?"
                        ></input>
                    </div>
                    <div className="form-row ml-2 col-6">
                        <label>Location:</label>
                        <input
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            type="text"
                            className="form-control"
                            placeholder="Do you want to specify a location?"
                        ></input>
                    </div>
                </div>
                { birdList.map((bird, idx)=> {
                    return(
                        // <label className="hidden-checkbox" >
                        <label  >
                            <input 
                                type="checkbox" 
                                value={bird} 
                                key={idx} 
                                checked={bird.shouldSave}
                                onChange={() => keepBirdHandler(idx)}
                            />
                            <Bird bird={bird} />
                        </label>
                    )
                }
                )}
                <div className="d-flex justify-content-center mb-4">
                    <button className="btn btn-primary btn-lg mr-4">Save Checklist</button>
                </div>
            </form>}
        </div>
    );
}