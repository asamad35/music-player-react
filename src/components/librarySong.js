import React from 'react'

function LibrarySong({songs,setSongs,isPlaying,audioRef, song,setCurrentSong}){

   async function songSelectHandler(){
        await setCurrentSong(song)

        if(isPlaying) audioRef.current.play()

        const newSongs = songs.map(s=>{
           if (s.id ===song.id) return {...s,active:true}
           else return {...s,active:false}
        })
        setSongs(newSongs)
        
    }

    return (
        <div  onClick={songSelectHandler} className={`library-song ${song.active?"selected": ""} `}>
        <img src={song.cover} alt={song.name}></img>
        <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
        </div>
        </div>
    );
}

export default LibrarySong