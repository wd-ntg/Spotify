import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SongCardPlaylist() {
  const [timeOfDay, setTimeOfDay] = useState("");

  const getTimeOfDay = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "buổi sáng";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "buổi chiều";
    } else {
      return "buổi tối";
    }
  };

  useEffect(() => {
    const currentTimeOfDay = getTimeOfDay();
    setTimeOfDay(currentTimeOfDay);
  }, []);
  return (
    <div className="px-12 py-8 mt-2">
      <div className="text-left text-white text-2xl">Chào {timeOfDay}</div>
      <div className="py-4 flex justify-between">
        <Link to="/playlists/64aa41a330600c172fc341f3">
          <div className="h-20 w-[332px] flex items-center rounded-md overflow-hidden bg_fill hover:shadow-md hover:shadow-green-300/40">
            <img
              className="w-20 h-20 rounded-l-md overflow-hidden"
              src="https://images.pexels.com/photos/4946723/pexels-photo-4946723.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="text-black text-xl px-4 text-left  ">
              Thiên hạ nghe gì
            </div>
          </div>
        </Link>
        <Link to="/playlists/64a98415d730d7eefdf89b60">
          <div className="h-20 w-[332px] flex items-center rounded-md overflow-hidden bg_fill hover:shadow-md hover:shadow-indigo-500/40">
            <img
              className="w-20 h-20 rounded-l-md overflow-hidden"
              src="https://images.pexels.com/photos/6858604/pexels-photo-6858604.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="text-black text-xl px-4 text-left">
              Peaceful Piano
            </div>
          </div>
        </Link>
        <Link to="/playlists/64a98415d730d7eefdf89b60">
          <div className="h-20 w-[332px] flex items-center rounded-md overflow-hidden bg_fill hover:shadow-md hover:shadow-sky-500/40">
            <img
              className="w-20 h-20 rounded-l-md overflow-hidden"
              src="https://images.pexels.com/photos/6194940/pexels-photo-6194940.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="text-black text-xl px-4 text-left">
              My recommendation playlist
            </div>
          </div>
        </Link>
      </div>
      <div>
        <Link to="/playlists/64aa164255eb5f06b70dab76">
          <div className="h-20 w-[332px] flex items-center rounded-md overflow-hidden bg_fill hover:shadow-md hover:shadow-rose-300/40">
            <img
              className="w-20 h-20 rounded-l-md overflow-hidden"
              src="https://images.pexels.com/photos/6775273/pexels-photo-6775273.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="text-black text-xl px-4 text-left">
              My recommendation playlist
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
