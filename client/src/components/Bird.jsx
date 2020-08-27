import React from 'react'

export default ({bird}) => {
    let formatted_date = bird.observed_on;

    return(
        <>
        <div className="card mb-3 mr-3 thick-border" style={{width: 15 + 'em'}}>
            <img 
                src={bird.taxon.default_photo.square_url} 
                alt={`${bird.taxon.preferred_common_name}`}
                className="card-img-top rounded-corners align-self-center mt-2"
                style={{width: 80 + 'px'}}
                >
            </img>
            <div className="card-body text-center">
                <a 
                    href={`${bird.taxon.wikipedia_url}`}
                    className="h5 py-3"
                >{bird.taxon.preferred_common_name}
                </a>
                <p className="font-italic">{bird.taxon.name}</p>
                <a href={`${bird.uri}`}><span className="h6 dark-font" style={{fontSize: 14 + 'px'}}>last seen on: </span>{formatted_date}</a>
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