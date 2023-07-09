import React, { useContext, useEffect, useState } from "react";
import songContext from "../contexts/songContext";
import { Howl, Howler } from "howler";
import {
  makeUnauthenticatedGetMySongRequest,
  makeUnauthenticatedPOSTRequest2,
} from "../utils/serverHelpers";

export default function SingleSongCard({ info, playSound, index }) {
  const { currentSong, setCurrentSong, soundPlayed } = useContext(songContext);
  const [activeCurrentTextSong, setActiveCurrentTextSong] = useState(false);
  const [songs, setSongs] = useState([]);
  const [likedSong, setLikedSong] = useState(null);

  const handleLikedSong = async (songId) => {
    const request = await makeUnauthenticatedPOSTRequest2(
      "/song/update/likedSong",
      {
        songId: songId,
      }
    );
  };
  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/song/get/likedSongs"
      );
      const likedSongIds = response.data.likedSongs.map((item) => item);
      setLikedSong(likedSongIds.includes(info._id));
    };

    getData();
  }, [likedSong]);
  const [heart, setHeart] = useState(false);

  const song = new Howl({
    src: [info.track],
  });
  const date = new Date();

  useEffect(() => {
    if (soundPlayed) {
      setActiveCurrentTextSong(currentSong?.name === info.name);
    } else {
      setActiveCurrentTextSong(false);
    }
  }, [currentSong, soundPlayed]);

  // Lấy ngày, tháng và năm
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div
      className={`flex p-4 hover:bg-slate-400 hover:bg-opacity-20 rounded px-6`}
      onClick={() => {
        setCurrentSong(info);
      }}
      onMouseMove={() => {
        setHeart(true);
      }}
      onMouseLeave={() => {
        setHeart(false);
      }}
    >
      <div className="flex w-[2%] justify-center items-center text-white">
        {index}
      </div>
      <div className="flex w-[35%] justify-center items-center">
        <div
          className=" w-[12%] h-10 bg-cover rounded flex"
          style={{
            backgroundImage: `url("${info.thumbnail}")`,
          }}
        ></div>
        <div className="text-stone-300 text-left ml-4 flex w-full ">
          <div className=" flex justify-center flex-col ">
            <div
              className={`text-lg ${
                activeCurrentTextSong ? "text-green-500" : ""
              }`}
            >
              {info.name}
            </div>
            <div className=" hover:underline cursor-pointer">
              {info.artist.firstName + " " + info.artist.lastName}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[30%]  items-center flex text-stone-300">
        <div className="text-stone-300">{info.name}</div>
      </div>
      <div className="flex w-[25%] justify-center items-center text-stone-300">
        <div className="">{info.createdAt}</div>
        {heart ? (
          <div className={`flex items-center translate-x-16 cursor-pointer`}>
            <i
              class={`fa-regular fa-heart ${likedSong ? "text-green-500" : ""}`}
              onClick={() => {
                handleLikedSong(info._id);
              }}
            ></i>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex w-[8%] items-center justify-center text-stone-300">
        {formatTime(Math.floor(song.duration()))}
      </div>
    </div>
  );
}
