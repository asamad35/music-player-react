import React from "react";
import  LibrarySong from './librarySong'

function Library({libraryStatus,isPlaying,audioRef,songs,setSongs,setCurrentSong}){
    return (
        <div className={`library ${libraryStatus?"library-open":"" }`}>
            <h2>Library</h2>
            <div className="library-songs">
           {songs.map(song => <LibrarySong songs={songs} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} song = {song} setCurrentSong ={setCurrentSong}  key ={song.id}/> )} 
            </div>
        </div>
    )
}

export default Library