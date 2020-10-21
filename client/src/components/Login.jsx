import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/login",{ email, password },{withCredentials: true,})
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.msg);
      });
  } 

    return(
        <>
    {/* main container for form */}
    <form className="col-5 dark-font " onSubmit={login}>
        <div className="form-row justify-content-around">
            <fieldset className="thick-border form-group">
            <legend className="w-auto mx-3 px-1">login</legend>
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="text"
                        className="form-control"
                        placeholder="password"
                    ></input>
                </div>
                <p className="error-message">{errorMessage ? errorMessage : ""}</p>
                <div className="row justify-content-around">
                    <button className="btn btn-outline-success thick-border dark-font font-weight-bold m-2">
                        login
                    </button>
                </div>    
            </fieldset> 
        </div>
    </form>
    </>
    );
}