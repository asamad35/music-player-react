import React,{useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlay, faAngleLeft, faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons"

function Player( {songs,setSongs,libraryStatus, audioRef,currentSong,setCurrentSong,isPlaying,setIsPlaying} ){

 
    // Event Handlers
    function playSongHandler(){
        if(isPlaying){
        audioRef.current.pause()
        setIsPlaying(!isPlaying)
        }
        else{
        audioRef.current.play()
        setIsPlaying(!isPlaying)

        }

    }

    function activeLibraryHandler(){
        const newSongs = songs.map(s=>{
            if (s.id ===currentSong.id) return {...s,active:true}
            else return {...s,active:false}
         })
         setSongs(newSongs)
    }
    
    function timeUpdateHandler(e){
        
        const currentTime = e.target.currentTime
        const duration = e.target.duration

        // Calculate Percentage
        const roundedCurrentTime = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round((roundedCurrentTime/roundedDuration)*100)
        

        setSongInfo({currentTime,duration,animationPercentage})
    }

    function dragHandler(e){
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    async function skipTrackHandler(direction){
        
        let currentIndex = songs.findIndex(song=>song.id == currentSong.id)

        if(direction === 'skip-forward'){
            currentIndex = ++currentIndex % songs.length;
            await  setCurrentSong({...(songs[currentIndex]),active:true})
            activeLibraryHandler();

        }
        if(direction === 'skip-back'){
            if(currentIndex === 0) currentIndex = songs.length
            currentIndex = --currentIndex 
            await setCurrentSong({...(songs[currentIndex]),active:true})
            activeLibraryHandler();

        }
    //   playAudio(isPlaying,audioRef)
        if(isPlaying) audioRef.current.play();



    }

    function getTime(time){
        return(
            Math.floor(time / 60) + ":" +  Math.floor(time % 60).toString().padStart(2,'0')
        )
    }

 // state
 const [songInfo,setSongInfo]= useState({currentTime:0,duration: 0,animationPercentage: 0})

        // Adding styles
        const trackAnimation = {
            transform : `translateX(${songInfo.animationPercentage}%)`
        }
        const trackColor = {
            background: `linear-gradient(to right, ${currentSong.color[0]},  ${currentSong.color[1]})`
        }
        

    return (
        <div className={`player`}>
 
            <div className="time-control">
                <p>{getTime( songInfo.currentTime)}</p>

                <div style={trackColor} className="track">
                <input  onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                <div style={trackAnimation} className="animate-track"></div>
                </div>


                <p>{songInfo.duration ? getTime( songInfo.duration) : '0:00'  }</p>
            </div>

            <div className="player-control">
            <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className='skip-back' size= '2x' icon={faAngleLeft}  />
            <FontAwesomeIcon onClick={playSongHandler}  className='play' size= '2x' icon={isPlaying ? faPause : faPlay}  />
            <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} className='skip-forward' size= '2x' icon={faAngleRight}  />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={()=>skipTrackHandler('skip-forward')} ></audio>
        </div>
    );
}

export default Player