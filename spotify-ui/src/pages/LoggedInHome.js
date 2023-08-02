import { useEffect, useState } from "react";
import "../App.css";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedGetAllPlaylists } from "../utils/serverHelpers";
import WindowCard from "../components/WindowCard";
import SongCardPlaylist from "../components/SongCardPlaylist";

export default function LoggedInHome() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [playlistsAdm, setPlaylistsAdm] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      const response = await makeUnauthenticatedGetAllPlaylists(
        "/playlists/get/genrePlaylist"
      );
      setPlaylists(response.data);
    };
    getDatas();
    const getData = async () => {
      const response = await makeUnauthenticatedGetAllPlaylists(
        "/playlists/get/genrePlaylistAdm"
      );
      setPlaylistsAdm(response.data);
    };
    getData();
  }, []);
  const render = [];
  render.push(playlists);
  return (
    <LoggedInContainer currentActiveScreen="home">
      <WindowCard/>
      <SongCardPlaylist/>
      <PlaylistView
        titleText="Nhạc Pop"
        cardDatas = {playlists}
      />
      <PlaylistView titleText="Nhạc của bạn" cardDatas={playlistsAdm} />
    </LoggedInContainer>
  );
}

const PlaylistView = ({ titleText, cardDatas }) => {
  
  return (
    <div className="text-white mt-8 px-4 text-left">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
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
        {/* {Array.isArray(render) ? (
          render[0].map((item) => (
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
        )} */}
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
