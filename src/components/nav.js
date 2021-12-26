import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({libraryStatus,setLibraryStatus}){

    function toggleLibrary(){
        setLibraryStatus(!libraryStatus);

    }

    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={toggleLibrary}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav;