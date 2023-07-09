import React, { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/SingleSongCard";
import { useEffect } from "react";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";

export default function LikedSongPage() {

  const [likedSongsData, setLikedSongsData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/song/get/likedSongs/fromUser"
      );
      setLikedSongsData(response.data.likedSongs)
    };

    getData();
  }, [likedSongsData]);

  return (
    <LoggedInContainer currentActiveScreen="likedSongs">
      <div className="p-8">
        <div className="text-left text-white text-xl mb-4">Những bài hát đã Liked</div>
        <div>
            {likedSongsData.map((item, index) => {
              return (
                <SingleSongCard
                  index={index+1}
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                  playlistId={item._id}
                  songTrack={item.track}
                />
              );
            })}
          </div>
      </div>
    </LoggedInContainer>
  );
}
