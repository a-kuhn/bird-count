import React from 'react';
import {Link, navigate} from '@reach/router';
import axios from 'axios';

import Register from '../components/Register';
import Login from '../components/Login';

export default () => {

    const guestLogin = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8000/api/login",{ email: "guest@birder.com", password: "asdfasdf" },{withCredentials: true,})
          .then((res) => {
            console.log(res);
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      } 

    return(
        <>
        <h1 className="mt-4">Welcome to Bird Count!</h1>
        <h3>Just having a look around? </h3>
        {/* login as guest@bird.com  */}
        <form onSubmit={guestLogin}>
            <button className="btn btn-outline-success btn-lg mb-4">continue as a guest</button>
        </form>

        <div className="container">
            <div className="row justify-content-center">
                <Register />
                <Login />
            </div>
        </div>
        </>
    );
}