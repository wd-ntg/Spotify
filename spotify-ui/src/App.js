import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useCookies } from "react-cookie";
import HomePage from "./pages/HomePage";
import LoggedInHome from "./pages/LoggedInHome";
import UploadSong from "./pages/UploadSong";
import MyMsic from "./pages/MyMusic";
import songContext from "./contexts/songContext";
import { useState, useContext } from "react";
import SearchPage from "./pages/SearchPage";
import Library from "./pages/Library";
import SinglePlaylistView from './pages/SinglePlaylistView'
import ServerUploadSong from "./pages/ServerUploadSong";
import LikedSongPage from "./pages/LikedSongPage";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [songProgress, setSongProgress] = useState(null)
  const [timeSongSeek, setTimeSongSeek] = useState(null)
  // const [likedSong, setLikedSong] = useState(null);
  const [likedPlaylist, setLikedPlaylist] = useState(false)
  const [volumnChange, setVolumnChange] = useState(100)


  return (
    <BrowserRouter>
      <div className="App">
        {cookie.token ? (
          // Login in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
              songProgress,
              setSongProgress,
              timeSongSeek,
              setTimeSongSeek,
              // likedSong,
              // setLikedSong,
              likedPlaylist,
              setLikedPlaylist,
              volumnChange,
              setVolumnChange
            }}
          >
            <Routes>
              <Route path="*" element={<Navigate to="/home" />}></Route>
              <Route path="/home" element={<LoggedInHome />}></Route>
              <Route path="/uploadSong" element={<UploadSong />}></Route>
              <Route path="/myMusic" element={<MyMsic />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              <Route path="/library" element={<Library />}></Route>
              <Route path="/likedSongs" element={<LikedSongPage />}></Route>
              <Route path="/playlists/:playlistId" element={<SinglePlaylistView />}></Route>
            </Routes>
          </songContext.Provider>
        ) : (
          // Login out routes
          <Routes>
            {/* <Route path="/spotify" element={<Spotify />}></Route> */}
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/homepage" element={<HomePage />}></Route>
            <Route path="/serverUploadSong" element={<ServerUploadSong />}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>

          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
