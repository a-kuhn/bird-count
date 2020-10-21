import React from 'react';

export default () => {
    // gif to display while loading data

    return(
        <>
                <h2>Updating your list of lists...</h2>
            <div className="container">
                <iframe 
                        src="https://giphy.com/embed/XAWvCOd3oV7q" 
                        frameBorder="0" 
                        className="" 
                        allowFullScreen>
                </iframe>
            </div>
            <p><a href="https://giphy.com/gifs/cheezburger-funny-birds-XAWvCOd3oV7q">via GIPHY</a></p>
        </>
    );
}


{/* <div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/XAWvCOd3oV7q" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cheezburger-funny-birds-XAWvCOd3oV7q">via GIPHY</a></p> */}