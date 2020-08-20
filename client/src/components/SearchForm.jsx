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

    console.log(`sending searchSeason: '${season}' and locale: '${locale}' up to Main.jsx`);

    // send locale and season to DisplayResults for API requests
    navigate(`/main/results/${locale}/${season}`);
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <div className="">
            <fieldset className="">
              <legend className="">location</legend>
              <input
                onChange={(e) => setSearchLocation(e.target.value)}
                value={searchLocation}
                type="text"
                className=""
                placeholder="birding location (park, campus, lake, etc.)"
              ></input>
              <input
                onChange={(e) => setSearchMunicipality(e.target.value)}
                value={searchMunicipality}
                type="text"
                className=""
                placeholder="municipality"
              ></input>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    onChange={(e) => setSearchCounty(e.target.value)}
                    value={searchCounty}
                    type="text"
                    className=""
                    placeholder="county"
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <input
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchState}
                    type="text"
                    className=""
                    placeholder="state"
                  ></input>
                </div>
              </div>
              <input
                onChange={(e) => setSearchRadius(e.target.value)}
                value={searchRadius}
                type="text"
                className=""
                placeholder="search radius (km)"
              ></input>
            </fieldset>
          </div>
          <div className="">
            <fieldset className="">
              <legend className="">season</legend>
              <div className="">
                <div className="">
                    <input
                    onChange={(e) => setSearchSeason(e.target.value)}
                    className=""
                    type="radio"
                    name="searchSeason"
                    id="thisSeason"
                    value="thisSeason"
                    ></input>
                    <label className="" htmlFor="thisSeason">
                    this season (&#177; 1 month from today)
                    </label>
                </div>
                {/* <div className=" ml-3">
                    <input
                    onChange={(e) => setSearchSeason(e.target.value)}
                    className=""
                    type="radio"
                    name="searchSeason"
                    id="allYear"
                    value="allYear"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="allYear">
                    all year
                    </label>
                </div> */}
              </div>
              <div className="">
                <div className="">
                  <div className="">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className=""
                      type="radio"
                      name="searchSeason"
                      id="springSeason"
                      value="springSeason"
                    ></input>
                    <label className="" htmlFor="springSeason">
                      spring<br/>(March - May)
                    </label>
                  </div>
                  <div className="form-check mt-3 d-flex align-items-center">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className=""
                      type="radio"
                      name="searchSeason"
                      id="summerSeason"
                      value="summerSeason"
                    ></input>
                    <label className="" htmlFor="summerSeason">
                      summer<br/>(June - Aug)
                    </label>
                  </div>
                </div>
                <div className="">
                  <div className="">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className=""
                      type="radio"
                      name="searchSeason"
                      id="winterSeason"
                      value="winterSeason"
                    ></input>
                    <label className="" htmlFor="winterSeason">
                      winter<br/>(Dec - Feb)
                    </label>
                  </div>
                  <div className="">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className=""
                      type="radio"
                      name="searchSeason"
                      id="fallSeason"
                      value="fallSeason"
                    ></input>
                    <label className="" htmlFor="fallSeason">
                      fall<br/>(Sept - Nov)
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="">
          <button className="btn btn-success font-weight-bold m-2">
            Build a Checklist
          </button>
        </div>
      </form>
    </div>
  );
};
