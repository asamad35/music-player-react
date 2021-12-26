import React,{useState,useRef} from 'react'

// Import styles
import './styles/app.scss'

// Adding Components
import Player from './components/player'
import Song from './components/song'
import Library from './components/library'
import Nav from './components/nav'

//Import Data
import data from './data'


function App() {
  // Ref
   const audioRef = useRef(null)

  //State
  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong]= useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus,setLibraryStatus] = useState(false)

  return (
    <div className={`app ${libraryStatus?"library-open":""}`}>
      <Nav libraryStatus ={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song  libraryStatus ={libraryStatus} currentSong = {currentSong} />
      <Player songs={songs} setSongs={setSongs} libraryStatus ={libraryStatus} audioRef={audioRef} setIsPlaying={setIsPlaying}  isPlaying={isPlaying}  currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <Library libraryStatus ={libraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} />
    </div>
  );
}

export default App;
