import React from 'react'

export default () => {

    return(
        <>
        {/* main container for form */}
        <form className="outline d-flex">
            {/* top row for location and season columns */}
            <div className="outline form-row">
                {/* left column for location */}
                <fieldset className="outline col-md-6">
                <legend className="">location</legend>
                    {/* top row for location */}
                    <div className="outline form-row">

                    </div>
                    {/* second row for municipality */}
                    <div className="outline form-row">

                    </div>
                    {/* third row for county & state */}
                    <div className="outline form-row">
                        <div className="outline col-md-6">
                        </div>
                        <div className="outline col-md-6">
                        </div>
                    </div>
                    {/* bottom row for search radius */}
                    <div className="outline form-row">

                    </div>
                </fieldset> {/* end column for location */}
                {/* right column for season, stretched to match height of location */}
                <fieldset className="outline col-md-6">
                <legend className="">season</legend>
                    {/* top row for current season */}
                    <div className="outline form-row">
                        
                    </div>
                    {/* second row for spring/summer */}
                    <div className="outline form-row">
                        <div className="outline col-md-6">
                        
                        </div>
                        <div className="outline col-md-6">
                        
                        </div>
                    </div>
                    {/* third row for winter/fall */}
                    <div className="outline form-row">
                        <div className="outline col-md-6">
                        
                        </div>
                        <div className="outline col-md-6">
                        
                        </div>
                    </div>
                </fieldset>{/* end column for season */}
            </div>
            {/* bottom row for submit button */}
            <div className="outline form-row">
                {/* submit button, centered */}
            </div>    
        </form>
        </>
    );
}