import React, { useState } from "react";
import { useContext, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Songs from "../Context";
import playingcustom from "../assest/playingcustom.css";

export default function Playing() {
  const {
    song,
    handleSetSong,
    newBgColor,
    DataSongs,
    Artist,
    ArtistSong,
    handleSetListSong,
  } = useContext(Songs);
  const handleClickNext = () => {
    // handleSetSong(song.id + 1);
    handleSetListSong(ArtistSong.id + 1)
  };
  const handleClickPre = () => {
    // handleSetSong(song.id - 1);
    handleSetListSong(ArtistSong.id - 1)
  };
  return (
    <div className={`custom-audio-player ${newBgColor}`}>
      <Songs.Provider>
        <div className="flex w-[360px] ml-5">
          <div className="w-[56px] h-[56px]">
            <img className="rounded-md" src={song.links.images[0].url}></img>
          </div>
          <div className="text-sm flex flex-col w-[108px] text-left justify-center ml-4 mr-4">
            <span className="font-semibold truncate text-teal-50">
              {song.name}
            </span>
            <span className="text-gray-500 text-xs">{song.author}</span>
          </div>
          <div className="flex justify-center items-center text-teal-50">
            <i class="fa-regular fa-heart mr-4"></i>
            <i class="fa-solid fa-music"></i>
          </div>
        </div>
        <div className="text-white absolute right-[212px] translate-y-[-8px] flex justify-center items-center">
          <i class="fab fa-connectdevelop mr-4"></i>
          <i class="fa-solid fa-headphones"></i>
        </div>
        <div className="text-white text-2xl absolute top-0 translate-x-[374px] translate-y-[20px]">
          <i class="fa-solid fa-shuffle"></i>
        </div>
        <AudioPlayer
          src={song.url}
          layout="stacked-reverse"
          className="flex bg-gray-700 player-music"
          showSkipControls={true}
          showJumpControls={false}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPre}
        />
      </Songs.Provider>
    </div>
  );
}
