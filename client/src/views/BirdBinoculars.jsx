import React from 'react';

export default () => {
    // gif to display while loading data

    return(
        <>
                <h2>Rustling up some birds...</h2>
            <div className="container">
                <iframe 
                    src="https://giphy.com/embed/gSRkSblDEjUuk" 
                    frameBorder="0" 
                    className="" 
                    allowFullScreen
                    style={{height:400}}
                >
                </iframe>
            </div>
            <p><a href="https://giphy.com/gifs/cheezburger-bird-popcorn-funny-gSRkSblDEjUuk">via GIPHY</a></p>
        </>
    );
}
