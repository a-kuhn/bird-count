import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

export default () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    //create newUser object from state
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    };

    //send post request to add newUser to db
    axios
        .post('http://localhost:8080/api/users/new', newUser, {withCredentials: true})
        .then(res => {
            console.log(res);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            //TODO: switch this redirect to login newUser
            navigate('/main')
        })
        .catch(err => {
            console.error(err);
            setErrors(err.response.data.errors);
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
                        {errors?.firstName && (
                            <span className="error-message">{errors.firstName?.properties?.message}</span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                            className="form-control"
                            placeholder="last name"
                        ></input>
                        {errors?.lastName && (
                            <span className="error-message">{errors.lastName?.properties?.message}</span>
                        )}
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
                    {errors?.email && (
                        <span className="error-message">{errors.email?.properties?.message}</span>
                    )}
                </div>
                <div className="form-row m-1">
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="text"
                            className="form-control"
                            placeholder="password"
                        ></input>
                        {errors?.password && (
                            <span className="error-message">{errors.password?.properties?.message}</span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            type="text"
                            className="form-control"
                            placeholder="confirm password"
                        ></input>
                        {errors?.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword?.properties?.message}</span>
                        )}
                    </div>
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