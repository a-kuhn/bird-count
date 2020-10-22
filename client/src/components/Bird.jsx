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
                    className="h5 py-3"
                >{bird.commonName}
                </a>
                <p className="font-italic">{bird.latinName}</p>
                <a href={`${bird.iNatOccUrl}`}><span className="h6 dark-font" style={{fontSize: 14 + 'px'}}>last seen here on: </span>{bird.observedOn}</a>
            </div>
        </div>
        </>
    );
}

{/*

each bird object contains a TON of info
list of potentially useful bits and their paths:

bird.name: "Phalacrocorax brasilianus"
bird.taxon.preferred_common_name: "Neotropic Cormorant"
bird.taxon.default_photo.square_url: "https://static.inaturalist...." ==> JPG FILETYPE
bird.taxon.wikipedia_url: "http://wikipedia.org/wiki/Neotropic_cormorant" ==> link to wiki page
bird.uri: "https://www.inaturalist.org/observations/516594645" ==> link to iNaturalist observation

*/}