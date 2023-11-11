import React from "react";

import { Link } from "react-router-dom";

import logoSpotify from "../assest/image/Spotify_Logo_CMYK_Green.png";

export default function NavDashboard({ currentUser }) {
  return (
    <div>
      <header className="w-[100%] h-[84px] flex justify-center items-center border-b-2">
        <Link to='/home'>
          <img className="h-[64px] " src={logoSpotify}></img>
        </Link>
      </header>
    </div>
  );
}
