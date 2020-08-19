import React, {useState} from 'react';
import {navigate} from '@reach/router';


export default ({onNewLocale, onNewSeason}) => {
  //to keep track of what is being typed into search form
  const [searchLocation, setSearchLocation] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCounty, setSearchCounty] = useState("");
  const [searchMunicipality, setSearchMunicipality] = useState("");
  const [searchSeason, setSearchSeason] = useState("");
  const [searchRadius, setSearchRadius] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // pass season up to Main.jsx
    onNewSeason(searchSeason);

    // create locale string for Geocoder & send up to Main.jsx
    let locale = ``;
    if (searchLocation.length>0){locale += `${searchLocation}+`};
    if (searchMunicipality.length>0){locale += `${searchMunicipality}+`};
    if (searchCounty.length>0){locale += `${searchCounty}+County+`};
    if (searchState.length>0){locale += `${searchState}`};
    locale = encodeURIComponent(locale);
    onNewLocale(locale);

    console.log(`sending searchSeason: ${searchSeason} and locale: ${locale} up to Main.jsx`);

    navigate('/main/results/');
  }

  return (
    <div className="container mt-5 ">
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="col-6 outline">
            <fieldset className="thick-border p-2">
              <legend className="w-auto mx-3 px-1">location</legend>
              <input
                onChange={(e) => setSearchLocation(e.target.value)}
                value={searchLocation}
                type="text"
                className="px-2 mt-2 mx-auto form-control"
                placeholder="birding location (park, campus, lake, etc.)"
              ></input>
              <input
                onChange={(e) => setSearchMunicipality(e.target.value)}
                value={searchMunicipality}
                type="text"
                className="px-2 mt-2 mx-auto form-control"
                placeholder="municipality"
              ></input>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    onChange={(e) => setSearchCounty(e.target.value)}
                    value={searchCounty}
                    type="text"
                    className="px-2 mt-2 mx-auto form-control"
                    placeholder="county"
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <input
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchState}
                    type="text"
                    className="px-2 mt-2 mx-auto form-control"
                    placeholder="state"
                  ></input>
                </div>
              </div>
              <input
                onChange={(e) => setSearchRadius(e.target.value)}
                value={searchRadius}
                type="text"
                className="px-2 mt-2 mx-auto form-control"
                placeholder="search radius (km)"
              ></input>
            </fieldset>
          </div>
          <div className="col-6 outline">
            <fieldset className="thick-border p-2">
              <legend className="w-auto mx-3 px-1">season</legend>
              <div className="form-row px-4 justify-content-around">
                <div className="form-check text-center mb-3">
                    <input
                    onChange={(e) => setSearchSeason(e.target.value)}
                    className="form-check-input"
                    type="radio"
                    name="searchSeason"
                    id="thisSeason"
                    value="thisSeason"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="thisSeason">
                    this season (&#177; 1 month from today)
                    </label>
                </div>
                {/* <div className="form-check text-center mb-3 ml-3">
                    <input
                    onChange={(e) => setSearchSeason(e.target.value)}
                    className="form-check-input"
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
              <div className="form-row px-4">
                <div className="form-group col-md-6">
                  <div className="form-check d-flex align-items-center">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="searchSeason"
                      id="springSeason"
                      value="springSeason"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="springSeason">
                      spring<br/>(March - May)
                    </label>
                  </div>
                  <div className="form-check mt-3 d-flex align-items-center">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="searchSeason"
                      id="summerSeason"
                      value="summerSeason"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="summerSeason">
                      summer<br/>(June - Aug)
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="form-check d-flex align-items-center">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="searchSeason"
                      id="winterSeason"
                      value="winterSeason"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="winterSeason">
                      winter<br/>(Dec - Feb)
                    </label>
                  </div>
                  <div className="form-check mt-3 d-flex align-items-center">
                    <input
                      onChange={(e) => setSearchSeason(e.target.value)}
                      className="form-check-input"
                      type="radio"
                      name="searchSeason"
                      id="fallSeason"
                      value="fallSeason"
                    ></input>
                    <label className="form-check-label ml-2" htmlFor="fallSeason">
                      fall<br/>(Sept - Nov)
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="justify-content-center row">
          <button className="btn btn-success font-weight-bold m-2">
            Build a Checklist
          </button>
        </div>
      </form>
    </div>
  );
};
