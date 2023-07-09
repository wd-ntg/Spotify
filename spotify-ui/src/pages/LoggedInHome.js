import { useEffect, useState } from "react";
import "../App.css";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedGetAllPlaylists } from "../utils/serverHelpers";

// const focusCardsData = [
//   {
//     title: "Peaceful Piano",
//     description: "Relax and indulge with beautiful piano pieces",
//     imgUrl:
//       "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
//   },
//   {
//     title: "Deep Focus",
//     description: "Keep calm and focus with this music",
//     imgUrl:
//       "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
//   },
//   {
//     title: "Instrumental Study",
//     description: "Focus with soft study music in the background.",
//     imgUrl:
//       "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//   },
//   {
//     title: "Focus Flow",
//     description: "Up tempo instrumental hip hop beats",
//     imgUrl:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     title: "Beats to think to",
//     description: "Focus with deep techno and tech house",
//     imgUrl:
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
// ];

// const spotifyPlaylistsCardData = [
//   {
//     title: "This is one",
//     description: "Relax and indulge with beautiful piano pieces",
//     imgUrl:
//       "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
//   },
//   {
//     title: "Deep Focus",
//     description: "Keep calm and focus with this music",
//     imgUrl:
//       "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
//   },
//   {
//     title: "Instrumental Study",
//     description: "Focus with soft study music in the background.",
//     imgUrl:
//       "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
//   },
//   {
//     title: "Focus Flow",
//     description: "Up tempo instrumental hip hop beats",
//     imgUrl:
//       "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     title: "Beats to think to",
//     description: "Focus with deep techno and tech house",
//     imgUrl:
//       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
// ];

export default function LoggedInHome() {
  const navigate = useNavigate();

  return (
    <LoggedInContainer currentActiveScreen="home">
      <PlaylistView
        titleText="Danh sách phát"
        // cardsData={spotifyPlaylistsCardData}
      />
      {/* <PlaylistView titleText="Nhạc của bạn" cardsData={focusCardsData} /> */}
    </LoggedInContainer>
  );
}

const PlaylistView = ({ titleText, cardsData }) => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetAllPlaylists(
        "/playlists/get/genrePlaylist"
      );
      setPlaylists(response.data);
    };
    getData();
  }, []);
  const render = [];
  render.push(playlists);
  return (
    <div className="text-white mt-8 px-4 text-left">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex space-x-6">
        {Array.isArray(playlists) ? (
          playlists.map((item) => (
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
