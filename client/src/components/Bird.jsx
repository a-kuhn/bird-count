import React from 'react'
import {Link} from '@reach/router';

export default ({bird}) => {
    return(
        <div className="d-flex">
            <img 
                src={bird.taxon.default_photo.square_url} 
                alt={`${bird.taxon.preferred_common_name}`}>
            </img>
            <a 
                href={`${bird.taxon.wikipedia_url}`}
                className="d-inline-flex"
            >{bird.taxon.preferred_common_name} 
                <span className="font-italic">{bird.taxon.name}</span>
            </a>
        </div>
    );
}

{/*

each bird object contains a TON of info
list of potentially useful bits and their paths:

bird.name: "Phalacrocorax brasilianus"
bird.preferred_common_name: "Neotropic Cormorant"
bird.taxon.default_photo.square_url: "https://static.inaturalist...." ==> JPG FILETYPE
bird.taxon.wikipedia_url: "http://wikipedia.org/wiki/Neotropic_cormorant" ==> link to wiki page
bird.uri: "https://www.inaturalist.org/observations/516594645" ==> link to iNaturalist observation

*/}