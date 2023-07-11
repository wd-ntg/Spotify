import React, { useState } from "react";
import TextInput from "../components/TextInput";
import {makeUnauthenticatedPOSTRequest2} from "../utils/serverHelpers"
import {useNavigate} from 'react-router-dom'

export default function CreatePlaylistModal({ closeModal }) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeUnauthenticatedPOSTRequest2("/playlists/create", {
      name: playlistName, thumbnail: playlistThumbnail, songs: []
    })
    if (playlistName) {
      closeModal(false)
    }
  }

  const navigate = useNavigate()

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 bg-gradient-to-r from-neutral-800 to-neutral-600 opacity-95 "
      onClick={closeModal}
    >
      <div
        className="p-8 rounded-md bg-white font-semibold z-20"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="font-semibold text-xl">Tạo danh sách phát</div>
        <TextInput
          label="Tên danh sách phát"
          placeholder="Nhập tên danh sách phát"
          value={playlistName}
          setValue={setPlaylistName}
        />
        <TextInput
          label="Ảnh đại diện"
          placeholder="Nhập (url) ảnh đại diện"
          value={playlistThumbnail}
          setValue={setPlaylistThumbnail}
        />
        <button className="border-solid border-[1px] border-slate-400  text-slate-700 px-2 rounded-xl font-semibold mt-4 bg-white hover:bg-green-400 hover:text-white hover:border-violet-100" onClick={() => {createPlaylist()}}>
          Hoàn thành
        </button>
      </div>
    </div>
  );
}
