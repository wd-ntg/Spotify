import React from "react";
import { useState, useEffect } from "react";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";

export default function AddToPlaylistModal({ closeModal, addSongToPlaylist }) {
  const [myPlaylists, setMyPlaylists] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/playlists/get/me"
      );
      setMyPlaylists(response.data);
    };
    getData();
  }, []);
  return (
    <div>
      {" "}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 bg-gradient-to-r from-neutral-700 to-neutral-500 opacity-95 "
        onClick={closeModal}
      >
        <div
          className="p-8 rounded-md bg-black z-20 text-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className=" mb-5 font-semibold text-lg text-white">
            Chọn danh sách phát
          </div>
          <div className="space-y-4 flex flex-col justify-center items-center">
            {myPlaylists.map((item) => {
              return (
                <PlaylistListComponent
                  info={item}
                  addSongToPlaylist={addSongToPlaylist}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
  return (
    <div
      className=" w-full flex items-center space-x-4 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-3"
      onClick={() => {
        addSongToPlaylist(info._id);
      }}
    >
      <div>
        <img
          src={info.thumbnail}
          className="w-16 h-16 rounded"
          alt="thumbnail"
        />
      </div>
      <div className=" font-semibold text-lg">{info.name}</div>
    </div>
  );
};
