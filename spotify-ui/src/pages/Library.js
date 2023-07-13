import React, { useEffect, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";
import { Navigate, useAsyncValue, useNavigate } from "react-router-dom";

export default function Library() {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const navigate = useNavigate()
  useEffect( () => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/playlists/get/me"
      );
      setMyPlaylists(response.data);
    };
    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen="library">
      <div className="text-white text-2xl text-left font-semibold m-6">Tất cả danh sách phát của bạn</div>
      <div className="grid gap-5 grid-cols-5 py-5 px-8">
        {myPlaylists.map((item) => {
          return (
            <Card
              title={item.name}
              description={item.description}
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
}

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate()
  return (
    <div className="px-4 py-1 rounded-md bg-neutral-900 hover:bg-black cursor-pointer w-[90%] " onClick={() => {navigate("/playlists/" + playlistId)}}>
      <div className="py-4">
        <img className="w-full rounded flex object-conver  backdrop-contrast-200  bg-white/30 h-[172px]" alt="label" src={imgUrl} />
      </div>
      <div className="text-white text-sm font-semibold text-left mb-2 mt-2">
        {title}
      </div>
      <div className="text-gray-500 text-xs text-left font-semibold  mb-2 truncate">
        {description}
      </div>
    </div>
  );
};
