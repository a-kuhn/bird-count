import React from 'react';

export default () => {
    // gif to display while loading data
      const birdStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        // frameborder: "0"
      };
      const divStyle = {
          width: "100px",
          height: "0",
          position: "relative",
          paddingBottom:"76%"
      }
    return(
        <>
            <div style={divStyle}>
                <iframe 
                    src="https://giphy.com/embed/gSRkSblDEjUuk" 
                    style={birdStyle} 
                    frameBorder="0" 
                    className="giphy-embed" 
                    allowFullScreen></iframe>
            </div>
            <p><a href="https://giphy.com/gifs/cheezburger-bird-popcorn-funny-gSRkSblDEjUuk">via GIPHY</a></p>
        </>
    );
}


// style={{fontSize: 14 + 'px'}}
// style={{width:100+'%'}}

//   const birdStyle = {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     frameborder: "0"
//   };