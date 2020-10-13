import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

export default () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  //! ***  add pwConfirm back in  ***
//   const [pwConfirm, setPwConfirm] = useState("");

  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    //create newUser object from state
    const newUser = {
        firstName,
        lastName,
        email,
        password: pw,
        //! *** add pwConfirm back in ***
    };

    //send post request to add newUser to db
    axios
        .post('http://localhost:8000/api/users/new', newUser)
        .then(res => {
            console.log(res);
            navigate('/main');
        })
        .catch(err => {
            setErrors(err.response.data.errors);
            console.error(err.response);
        })
  } 

    return(
        <>
    {/* main container for form */}
    <form className="col-5 dark-font " onSubmit={handleSubmit}>
        <div className="form-row justify-content-around">
            <fieldset className="thick-border form-group">
            <legend className="w-auto mx-3 px-1">register</legend>
                <div className="form-row m-1">
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            type="text"
                            className="form-control"
                            placeholder="first name"
                        ></input>
                    </div>
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                            className="form-control"
                            placeholder="last name"
                        ></input>
                    </div>
                </div>
                <div className="form-row m-2 m-2">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        className="form-control"
                        placeholder="email"
                    ></input>
                </div>
                <div className="form-row m-1">
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setPw(e.target.value)}
                            value={pw}
                            type="text"
                            className="form-control"
                            placeholder="password"
                        ></input>
                    </div>
                    //! ***  add pwConfirm back in  ***
                    {/* <div className="col-md-6">
                        <input
                            onChange={(e) => setPwConfirm(e.target.value)}
                            value={pwConfirm}
                            type="text"
                            className="form-control"
                            placeholder="confirm password"
                        ></input>
                    </div> */}
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