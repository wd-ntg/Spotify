import "../App.css";
import SingleSongCard from "../components/SingleSongCard";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";
import { useContext, useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";


export default function MyMusic() {
  const navigate = useNavigate()
  const [songDatas, setSongDatas] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/song/get/mysongs"
      );
      setSongDatas(response.data);
    };
    getDatas();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen="myMusic">
      <main className="h-screen">
        <div className="flex items-center justify-between px-6">
          <div className="text-white text-left font-semibold m-4 text-xl">
            Nhạc của bạn đã tải lên Spotify
          </div>
          <div className="text-slate-300 font-semibold text-xl mr-8 cursor-pointer hover:text-white hover:scale-105" onClick={() => {navigate("/uploadSong")}}>Tải nhạc lên Cloud Spotify</div>
        </div>
        {songDatas.map((itemSong) => {
          return <SingleSongCard info={itemSong} playSound={() => {}} />;
        })}
      </main>
    </LoggedInContainer>
  );
}
