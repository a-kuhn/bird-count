import React from 'react'

export default ({bird}) => {
    return(
        <>
        <div className="card mb-3 mr-3 thick-border" style={{width: 20 + 'em'}} >
            <img 
                src={bird.photoUrl} 
                alt={`${bird.commonName}`}
                className="card-img-top rounded-corners align-self-center mt-2"
                style={{width: 80 + 'px'}}
                >
            </img>
            <div className="card-body text-center">
                <a 
                    href={`${bird.wikipediaUrl}`}
                    target="_blank"
                    className="h5 py-3"
                >{bird.commonName}
                </a>
                <p className="font-italic">{bird.latinName}</p>
                <p className="h6 dark-font" style={{fontSize: 14 + 'px'}}>spotted on: {bird.observedOn}</p>
            </div>
        </div>
        </>
    );
}