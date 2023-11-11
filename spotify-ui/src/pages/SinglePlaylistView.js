import React, { useContext, useEffect, useRef, useState } from "react";
import { useFetcher, useNavigate, useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import {
  makeUnauthenticatedGetMySongRequest,
  makeUnauthenticatedPOSTRequest2,
} from "../utils/serverHelpers";
import SingleSongCard from "../components/SingleSongCard";
import { Link } from "react-router-dom";
import songContext from "../contexts/songContext";
import { Howl } from "howler";

export default function SinglePlaylistView() {
  const { currentSong, playSound, isPaused, likedPlaylist, setLikedPlaylist } =
    useContext(songContext);

  const navigate = useNavigate();
  const loginNavigate = useNavigate();

  const [playlistDetails, setPlaylistDetails] = useState({});
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [closeModalInfo, setCloseModalInfo] = useState(false);

  const [timeAllSongs, setTimeAllSongs] = useState(null);

  const [quantitySong, setQuantitySong] = useState(null);

  const { playlistId } = useParams();
  // const [likedPlaylist, setLikedPlaylist] = useState(false);

  const handleDeleteLikedSong = async (likedPlaylistId) => {
    const deleteLikedSong = await makeUnauthenticatedPOSTRequest2(
      "/playlists/delete/likedPlaylist",
      { likedPlaylistId: likedPlaylistId }
    );
  };

  const handleLikedPlaylist = async (playlistId) => {
    const request = await makeUnauthenticatedPOSTRequest2(
      "/playlists/update/likedPlaylist",
      {
        playlistId: playlistId,
      }
    );
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/playlists/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await makeUnauthenticatedGetMySongRequest(
        "/song/get/user"
      );
      const likedSongIds = response.data.likedPlaylists.map((item) => item);
      setLikedPlaylist(likedSongIds.includes(playlistId));
    };
    getData();
  }, [playlistDetails]);

  // Effect Scroll
  const [isSticky, setIsSticky] = useState(false);

  const scrollRef = useRef(null);

  const handleScrollSticky = () => {
    if (Math.ceil(scrollRef.current.scrollTop) >= 360) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const getTimeSongs = async () => {
      if (playlistDetails && playlistDetails.songs) {
        const songDetails = await playlistDetails.songs.map((item) => item);

        const totalDuration = songDetails.reduce((total, song) => {
          const timeSong = new Howl({
            src: song.track,
          });
          return total + timeSong.duration();
        }, 0);

        setTimeAllSongs(totalDuration);

        setQuantitySong(playlistDetails.songs.length);
      }
    };

    getTimeSongs();
  }, [playlistDetails, playSound]);

  const hours = Math.floor(timeAllSongs / 3600);
  const minutes = Math.floor((timeAllSongs % 3600) / 60);
  const seconds = Math.floor(timeAllSongs % 60);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  return (
    <LoggedInContainer
      currentActiveScreen="library"
      prevlibrary={true}
      playlistId={playlistId}
    >
      <div
        ref={scrollRef} // Sử dụng useRef để tham chiếu đến phần tử cuộn
        onScroll={handleScrollSticky}
        className={` w-full  ${"bg-gradient-to-b from-violet-400 relative "} overflow-y-scroll h-[100vh] pb-[112px] min-h-[88vh] rounded`}
      >
        <div
          className={`flex w-full  px-3 items-center py-3 mb-1 sticky top-0 z-10 ${
            isSticky ? "bg-gradient-to-b from-violet-600 to-violet-400" : ""
          }`}
        >
          <div className=" px-3 flex items-center">
            <i
              class="fa-solid fa-chevron-left text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-pointer hover:text-white hover:bg-slate-500 mr-4"
              onClick={() => {
                navigate(-1);
              }}
            ></i>

            <i class="fa-solid fa-chevron-right text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-not-allowed"></i>
            {isSticky ? (
              <div className="flex items-center mx-1">
                <div className="text-green-500 w-[60px] hover:text-green-400">
                  <iconify-icon
                    icon="octicon:play-16"
                    width="40px"
                  ></iconify-icon>
                </div>
                <div className="text-2xl font-semibold text-white">
                  {playlistDetails.name}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="nav_right float-right absolute right-0 mr-8 justify-center items-center flex">
            <button className="font-semibold text-sm bg-white rounded-2xl px-4 py-1 hover:scale-105 mr-4">
              Nâng cấp
            </button>
            <Link to="/uploadSong">
              <button className="font-semibold  text-sm bg-black text-white rounded-2xl px-4 py-1 hover:scale-105">
                <i class="fa-solid fa-download mr-2"></i>
                Cài đặt ứng dụng
              </button>
            </Link>
            <div
              className="border-2 rounded-[50%] text-center ml-4 w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setCloseModalInfo(true);
              }}
            >
              <i class="fa-solid fa-user text-teal-50"></i>
            </div>
          </div>
        </div>
        <div className="bg-violet-400 p-4 w-full relative">
          <div className="flex text-left p-4 bg-violet-400 ">
            <div>
              <img
                className="w-[232px] h-[232px] rounded-lg"
                src={playlistDetails.thumbnail}
              />
            </div>
            <div className="p-12 text-white">
              <div className="text-sm font-semibold">Playlist</div>
              <div className="text-8xl font-extrabold">
                {playlistDetails.name}
              </div>
              <div className="mt-4 mb-2 text-sm text-slate-300 font-medium">
                Peaceful piano to help you slow down, breathe, and relax.
              </div>
              <div className="flex items-center">
                <div className="font-semibold">
                  <i class="fa-brands fa-spotify text-green-400"></i> Spotify
                </div>
                <div className="w-2 h-2 bg-white rounded-[50%] mx-2"></div>
                <div>... Liked</div>
                <div className="w-2 h-2 bg-white rounded-[50%] mx-2"></div>

                <div className="mr-1">{quantitySong}</div>
                <div>
                  Bài hát<t></t>,{" "}
                </div>
                <div className="mx-1">{hours}</div>
                <div className="mr-1">giờ</div>
                <div className="mr-1">{minutes} </div>
                <div className="mr-1">phút</div>
                <div className="mr-1"> {seconds} </div>
                <div className="mr-1">giây</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center text-left p-6 ml-4 ${
            isSticky ? "hidden" : ""
          } `}
        >
          <div className="text-green-500 w-[60px] flex justify-center items-center hover:text-green-400 text-xl rounded-[50%] border-none outline-none">
            {isPaused ? (
              <iconify-icon
                icon="zondicons:play-outline"
                width="60px"
              ></iconify-icon>
            ) : (
              <iconify-icon
                icon="zondicons:pause-solid"
                width="60px"
              ></iconify-icon>
            )}
          </div>
          <div
            className={`${
              likedPlaylist ? "text-green-400" : "text-slate-300"
            } mx-8 hover:text-white cursor-pointer`}
            onClick={() => {
              handleLikedPlaylist(playlistId);
              setLikedPlaylist(true);
            }}
          >
            <iconify-icon icon="mdi:heart-outline" width="46px"></iconify-icon>
          </div>
          <div
            className="cursor-pointer flex relative"
            onClick={() => {
              setOpenDetailModal(true);
            }}
          >
            <div className="w-1 h-1 bg-white rounded-[50%]"></div>
            <div className="w-1 h-1 bg-white rounded-[50%] mx-1"></div>
            <div className="w-1 h-1 bg-white rounded-[50%]"></div>
          </div>
          {openDetailModal ? (
            <div
              className="absolute top-0 left-0 right-0 bottom-0"
              onClick={() => {
                setOpenDetailModal(false);
              }}
            >
              <div className="text-white bg-neutral-800 px-5 py-2 rounded-md absolute top-[40%] left-[19%]">
                <div className="cursor-pointer hover:text-green-400 my-2">
                  Báo cáo
                </div>
                <div className="cursor-pointer hover:text-green-400  my-2">
                  Thêm vào thư viện
                </div>
                <div className="cursor-pointer hover:text-green-400  my-2">
                  Chia sẻ
                </div>
                <div
                  className="cursor-pointer hover:text-green-400  my-2"
                  onClick={() => {
                    handleDeleteLikedSong(playlistId);
                    setLikedPlaylist(false);
                  }}
                >
                  Xóa playlist yêu thích hiện có
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          className={`flex px-8 py-3 w-full text-white ${
            isSticky ? "sticky top-16 bg-black" : ""
          }`}
        >
          <div className="w-[2%] mr-1">#</div>
          <div className="w-[35%] text-left">Tiêu đề</div>
          <div className="w-[30%] text-left">Album</div>
          <div className="w-[25%]">Ngày thêm</div>
          <div className="w-[8%] flex justify-center items-center translate-x-1">
            <i class="fa-regular fa-clock"></i>
          </div>
        </div>
        {playlistDetails._id && (
          <div>
            {playlistDetails.songs.map((item, index) => {
              return (
                <SingleSongCard
                  index={index + 1}
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                  playlistId={item._id}
                  songTrack={item.track}
                />
              );
            })}
          </div>
        )}
      </div>
      {closeModalInfo ? (
        <div
          className=" top-6 left-0 right-0 bottom-0 absolute z-50"
          onClick={() => {
            setCloseModalInfo(false);
          }}
        >
          <div className="text-white flex flex-col absolute top-10 right-[56px] w-36 bg-neutral-800 py-1 text-left rounded-md">
            <Link to="/dashboard">
              <div className="my-1 flex items-center justify-between px-4 cursor-pointer hover:bg-neutral-600 rounded-sm">
                <div>Xem hồ sơ</div>
                <div className="">
                  <iconify-icon icon="clarity:pop-out-line"></iconify-icon>
                </div>
              </div>
            </Link>
            <div className="my-1  px-4 cursor-pointer hover:bg-neutral-600 rounded-sm">
              Hỗ trợ
            </div>
            <div className="my-1 flex items-center justify-between  px-4 cursor-pointer hover:bg-neutral-600 rounded-sm">
              <div>Cài đặt</div>
              <div className="">
                <iconify-icon icon="clarity:pop-out-line"></iconify-icon>
              </div>
            </div>
            <div className="border-t-[1px]  px-2  mx-2 mt-2"></div>
            <div
              className="my-1 px-4 cursor-pointer hover:bg-neutral-600 rounded-sm"
              onClick={() => {
                handleLogout();
                loginNavigate("/login");
              }}
            >
              Đăng xuất
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </LoggedInContainer>
  );
}
