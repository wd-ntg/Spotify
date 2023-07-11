import "../App.css";
import Songs from "../Context";
import DataSongs from "../data/songs.json";
import { useContext, useState, useEffect } from "react";
import React from "react";
import TextInput from "../components/TextInput";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { makeUnauthenticatedPOSTRequest2 } from "../utils/serverHelpers";
import { Link, useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer"

export default function UploadSong() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [genreSong, setgenreSong] = useState("")
  const [uploadSongFileName, setUploadSongFileName] = useState("");
  const [change, setChange] = useState(true);

  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    setChange(true);
  }, [uploadSongFileName]);

  const genreArraySong = genreSong.split(",").map(item => item.trim());

  const navigate = useNavigate();
  const sumbitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl, genreArraySong };
    const response = await makeUnauthenticatedPOSTRequest2(
      "/song/create",
      data
    );
    if (response.err) {
      alert("Could not create Song");
      return;
    }
    alert("Success");
    navigate("/myMusic");
  };
  return (
    <LoggedInContainer prevUploadSong={true} currentActiveScreen="myMusic">
      <div className="w-full mt-12 text-white py-8 bg-neutral-950 px-12">
          <div className="text-xl text-left font-semibold mb-4">Tải nhạc của bạn lên Cloud Spotify</div>
          <div>
            <div className="w-1/3 flex items-center">
              <div className="mr-4">
                <TextInput
                  label="Tên bài nhạc"
                  placeholder="Nhập tên bài nhạc"
                  value={name}
                  setValue={setName}
                />
              </div>
              <div>
                <TextInput
                  label="Ảnh đại diện"
                  placeholder="Nhập (url) ảnh đại diện"
                  value={thumbnail}
                  setValue={setThumbnail}
                />
              </div>
              <div className="mx-4 w-40">
                <TextInput
                  label="Thể loại nhạc"
                  placeholder="Nhập thể loại nhạc"
                  value={genreSong}
                  setValue={setgenreSong}
                />
              </div>
            </div>
          </div>
          <div className="text-left mt-6" onClick={handleChange}>
            {uploadSongFileName ? (
              <div className="bg-black text-white rounded-md p-2 w-[662px]">
                {uploadSongFileName}...
              </div>
            ) : (
              <CloudinaryUpload
                setUrl={setPlaylistUrl}
                setName={setUploadSongFileName}
              />
            )}
          </div>
          {
            uploadSongFileName ? (<div className="text-left">
            <button
              className="text-white bg-black px-4 py-1 mt-6 rounded-2xl"
              onClick={sumbitSong}
            >
              Sumbit Song
            </button>
          </div>) : ""
          }
        </div>
    </LoggedInContainer>
  );
}
