import React, {useState} from 'react';

export default () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: build post request for db to create new user
  } 

    return(
        <>
    {/* main container for form */}
    <form className="col-5 dark-font outline" onSubmit={handleSubmit}>
        <div className="form-row justify-content-around">
            <fieldset className="thick-border form-group">
            <legend className="w-auto mx-3 px-1">register</legend>
                <div className="form-row m-2 m-2">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className="form-control"
                        placeholder="email"
                    ></input>
                </div>
                <div className="form-row m-2 m-2">
                    <input
                        onChange={(e) => setPw(e.target.value)}
                        value={pw}
                        type="text"
                        className="form-control"
                        placeholder="password"
                    ></input>
                </div>
                <div className="row justify-content-around">
                    <button className="btn btn-outline-success thick-border dark-font font-weight-bold m-2">
                        register
                    </button>
                </div>    
            </fieldset> 
        </div>
    </form>
    </>
    );
}