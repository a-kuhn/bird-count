import React, {useState} from 'react';
import {navigate} from '@reach/router';


export default () => {
  //to keep track of what is being typed into search form
  const [searchLocation, setSearchLocation] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCounty, setSearchCounty] = useState("");
  const [searchMunicipality, setSearchMunicipality] = useState("");
  const [searchSeason, setSearchSeason] = useState("");
  const [searchRadius, setSearchRadius] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // create month array for season
    let season ='';
    let currMonth = new Date().getMonth();
    if(searchSeason === 'thisSeason'){season=[currMonth-1, currMonth, currMonth+1]}
    if(searchSeason === 'springSeason'){season=[2,3,4]}
    if(searchSeason === 'summerSeason'){season=[5,6,7]}
    if(searchSeason === 'fallSeason'){season=[8,9,10]}
    if(searchSeason === 'winterSeason'){season=[11,0,1]}
    season = encodeURIComponent(season);

    // create locale string for Geocoder
    let locale = ``;
    if (searchLocation.length>0){locale += `${searchLocation}+`};
    if (searchMunicipality.length>0){locale += `${searchMunicipality}+`};
    if (searchCounty.length>0){locale += `${searchCounty}+County+`};
    if (searchState.length>0){locale += `${searchState}`};
    locale = encodeURIComponent(locale);

    // send locale and season to DisplayResults for API requests
    navigate(`/main/results/${locale}/${season}`);
  }

  return (
    <>
    {/* main container for form */}
    <form className="container dark-font" onSubmit={handleSubmit}>
        {/* top row for location and season columns */}
        <div className="form-row justify-content-around">
            {/* left column for location */}
            <fieldset className="thick-border form-group col-md-5">
            <legend className="w-auto mx-3 px-1">location</legend>
                {/* top row for location */}
                <div className="form-row m-2 m-2">
                    <input
                        onChange={(e) => setSearchLocation(e.target.value)}
                        value={searchLocation}
                        type="text"
                        className="form-control"
                        placeholder="birding location (park, campus, lake, etc.)"
                    ></input>
                </div>
                {/* second row for municipality */}
                <div className="form-row m-2">
                    <input
                        onChange={(e) => setSearchMunicipality(e.target.value)}
                        value={searchMunicipality}
                        type="text"
                        className="form-control"
                        placeholder="municipality"
                    ></input>
                </div>
                {/* third row for county & state */}
                <div className="form-row m-1">
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setSearchCounty(e.target.value)}
                            value={searchCounty}
                            type="text"
                            className="form-control"
                            placeholder="county"
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setSearchState(e.target.value)}
                            value={searchState}
                            type="text"
                            className="form-control"
                            placeholder="state"
                        ></input>
                    </div>
                </div>
                {/* bottom row for search radius */}
                <div className="form-row m-2">
                    <input
                        onChange={(e) => setSearchRadius(e.target.value)}
                        value={searchRadius}
                        type="text"
                        className="form-control"
                        placeholder="search radius (km)"
                    ></input>
                </div>
            </fieldset> {/* end column for location */}
            {/* right column for season, stretched to match height of location */}
            <fieldset className="thick-border form-group col-md-5">
            <legend className="w-auto mx-3 px-1">season</legend>
                {/* top row for current season */}
                <div className="form-row justify-content-around">
                    <div className="p-1 my-2 lt-gray-border">
                        <div className="form-check text-center">
                            <input
                            onChange={(e) => setSearchSeason(e.target.value)}
                            className="form-check-input"
                            type="radio"
                            name="searchSeason"
                            id="thisSeason"
                            value="thisSeason"
                            ></input>
                            <label className="form-check-label" htmlFor="thisSeason">
                            this season (&#177; 1 month from today)
                            </label>
                        </div>
                    </div>
                </div>
                {/* second row for spring/summer */}
                <div className="form-row justify-content-around">
                    <div className="col-md-4 my-2 lt-gray-border">
                        <div className="form-check text-center">
                            <input
                            onChange={(e) => setSearchSeason(e.target.value)}
                            className="form-check-input mt-3"
                            type="radio"
                            name="searchSeason"
                            id="springSeason"
                            value="springSeason"
                            ></input>
                            <label className="form-check-label" htmlFor="springSeason">
                                spring<br/>(March - May)
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4 my-2 lt-gray-border">
                        <div className="form-check text-center">
                            <input
                            onChange={(e) => setSearchSeason(e.target.value)}
                            className="form-check-input mt-3"
                            type="radio"
                            name="searchSeason"
                            id="summerSeason"
                            value="summerSeason"
                            ></input>
                            <label className="form-check-label" htmlFor="summerSeason">
                                summer<br/>(June - Aug)
                            </label>
                        </div>
                    </div>
                </div>
                {/* third row for winter/fall */}
                <div className="form-row justify-content-around">
                    <div className="col-md-4 my-2 lt-gray-border">
                        <div className="form-check text-center">
                            <input
                            onChange={(e) => setSearchSeason(e.target.value)}
                            className="form-check-input mt-3"
                            type="radio"
                            name="searchSeason"
                            id="fallSeason"
                            value="fallSeason"
                            ></input>
                            <label className="form-check-label mx-2" htmlFor="fallSeason">
                                fall<br/>(Sept - Nov)
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4 my-2 lt-gray-border">
                        <div className="form-check text-center">
                            <input
                            onChange={(e) => setSearchSeason(e.target.value)}
                            className="form-check-input mt-3"
                            type="radio"
                            name="searchSeason"
                            id="winterSeason"
                            value="winterSeason"
                            ></input>
                            <label className="form-check-label mx-2" htmlFor="winterSeason">
                                winter<br/>(Dec - Feb)
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>{/* end column for season */}
        </div>
        {/* bottom row for submit button */}
        <div className="row justify-content-around">
            {/* submit button, centered */}
            <button className="btn btn-success font-weight-bold m-2">
                Build a Checklist
            </button>
        </div>    
    </form>
    </>
  );
};
