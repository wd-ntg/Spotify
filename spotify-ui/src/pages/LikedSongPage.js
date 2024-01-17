import React, { useState, useContext } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/SingleSongCard";
import { useEffect } from "react";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";


import Loader from "../components/Loader";

export default function LikedSongPage() {
  const [likedSongsData, setLikedSongsData] = useState([]);
  const [likedPlaylistsData, setLikedPlaylistsData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/song/get/likedSongs/fromUser"
      );
      if (!response) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      setLikedSongsData(response.data.likedSongs);
    };

    getData();
    const getDatas = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/playlists/get/likedPlaylists/fromUser"
      );
      setLikedPlaylistsData(response.data.likedPlaylists);
    };

    getDatas();
  }, [likedSongsData && likedPlaylistsData]);

  return (
    <LoggedInContainer
      currentActiveScreen="likedSongs"
      likedSongsData={likedSongsData}
    >
      <div className="p-8">
        <div className="text-left text-white text-2xl mb-4">
          Những bài hát bạn đã thích
        </div>
        <div>
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            likedSongsData.map((item, index) => {
              return (
                <SingleSongCard
                  index={index + 1}
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                  playlistId={item._id}
                  songTrack={item.track}
                  deleteLikedSong
                />
              );
            })
          )}
        </div>
      </div>
      <div className="p-8">
        <div className="text-left text-white text-2xl mb-4">
          Danh sách phát bạn đã thích
        </div>
        <div>
          <PlaylistView cardDatas={likedPlaylistsData} />
        </div>
      </div>
    </LoggedInContainer>
  );
}

const PlaylistView = ({ titleText, cardDatas }) => {
  return (
    <div className="text-white mt-8 px-4 text-left">
      {/* <div className="text-2xl font-semibold mb-5">{titleText}</div> */}
      <div className="w-full flex space-x-6">
        {Array.isArray(cardDatas) ? (
          cardDatas.map((item) => (
            <Card
              key={item._id}
              title={item.name}
              description={item.description}
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          ))
        ) : (
          <p>Loading playlists...</p>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const handleHoverMove = () => {
    setHovered(true);
  };
  const handleHoverLeave = () => {
    setHovered(false);
  };
  return (
    <div
      className="px-4 py-1 rounded-md card_bg  w-1/6 hover:bg-stone-950 relative"
      onClick={() => {
        navigate("/playlists/" + playlistId);
      }}
      onMouseMove={handleHoverMove}
      onMouseLeave={handleHoverLeave}
    >
      <div className="py-4">
        <img className="w-full rounded  h-[172px]" alt="label" src={imgUrl} />
      </div>
      <div className="text-white text-sm font-semibold text-left mb-2">
        {title}
      </div>
      <div className="text-gray-500 text-xs text-left font-semibold  mb-2 truncate">
        {description}
      </div>
      <div className="">
        {hovered ? (
          <i class="fa-solid fa-play w-12 h-12 bg-green-500 leading-12 text-xl rounded-[50%] absolute top-[55%] right-[20%] icon animate-bounce text-center flex justify-center items-center text-black"></i>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
