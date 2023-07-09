import { createContext } from "react";

const songContext = createContext({
    currentSong: null, 
    setCurrentSong: (currentSong) => {},
    soundPlayed: null,
    setSoundPlayed: (soundPlayed) => {},
    isPaused: null,
    setIsPaused:(isPaused) => {},
    songProgress: null,
    setSongProgress: (songProgress) => {},
    timeSongSeek: null,
    setTimeSongSeek: (timeSongSeek) => {},
    // likedSong: null,
    // setLikedSong: (likedSong) => {}
})

export default songContext