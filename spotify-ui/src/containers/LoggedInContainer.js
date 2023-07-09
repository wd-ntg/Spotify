import "../App.css";
import {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import songContext from "../contexts/songContext";
import IconText from "../components/IconText";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeUnauthenticatedPOSTRequest2 } from "../utils/serverHelpers";
import { Navigate } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import playingcustom from "../assest/playingcustom.css";

export default function LoggedInContainer({
  children,
  currentActiveScreen,
  prevlibrary,
  prevUploadSong,
}) {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const [timeSongPlay, setTimeSongPlay] = useState(null);


  const navigate = useNavigate();

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    songProgress,
    setSongProgress,
    timeSongSeek,
    setTimeSongSeek,
  } = useContext(songContext);

  const [timeChangeSeekSong, setTimeChangeSeekSong] = useState(timeSongSeek)


  const firstUpdate = useRef(true);

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
      onload: () => {
        setInterval(() => {
          if (soundPlayed) {
            const time = (sound.seek() / sound.duration()) * 100;
            setSongProgress(time);
          }
        }, 500);
      },
    });
    if (soundPlayed) {
      if (timeChangeSeekSong !== null) {
        if (soundPlayed) {
          const time = (sound.seek() / sound.duration()) * 100;
          setSongProgress(time);
        }
      }
    }
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    if (soundPlayed) {
      const timeSong = formatTime(Math.floor(soundPlayed.duration()));
      setTimeSongPlay(timeSong);
      const time = (soundPlayed.seek() / soundPlayed.duration()) * 100;
      setSongProgress(time);
      setTimeSongSeek(formatTime(Math.floor(soundPlayed.seek())));
    }
  }, [songProgress]);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  if (currentSong) {
    var currentSoundPlayed = new Howl({
      src: [currentSong.track],
    });
  } else {
    var currentSoundPlayed = new Howl({
      src: [""],
    });
  }

  useEffect(() => {
    if (soundPlayed) {
      const seekTime = (soundPlayed.duration() / 100) * timeChangeSeekSong;
        soundPlayed.seek(seekTime);
    }
  }, [timeChangeSeekSong]);

  useEffect(() => {
    if (soundPlayed) {
      const time = (soundPlayed.seek() / soundPlayed.duration()) * 100;
      setTimeout(() => {
        setSongProgress(time);
      }, 200)
    }
  }, [timeChangeSeekSong]);
  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;
    const payload = { playlistId, songId };
    const response = await makeUnauthenticatedPOSTRequest2(
      "/playlists/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };

  // Thanh âm thanh

  return (
    <div
      className={`${
        currentSong ? "h-9/10" : "h-full"
      }w-full bg-black h-full p-2`}
    >
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}
      <div className="flex w-full h-[90%] relative">
        <div className="w-[20%]">
          <div className="w-[20%] pr-2 text-white fixed top-2">
            <div className="header bg-neutral-900 mb-2 p-2 rounded-[8px]">
              <IconText
                classicon="fa-solid fa-house"
                title="Trang chủ"
                targetLink="/home"
                active={true}
                currentActiveScreen={currentActiveScreen === "home"}
              />

              <IconText
                classicon="fa-solid fa-magnifying-glass"
                title="Tìm kiếm"
                targetLink="/search"
                active={true}
                currentActiveScreen={currentActiveScreen === "searchpage"}
              />
            </div>
            <main className="bg-neutral-900 mb-2 text-left leading-6 px-4 py-8 rounded-[8px]">
              <header className=" flex">
                <i class="fa-solid fa-book leading-6"></i>
                <span className="ml-2 font-semibold">Thư viện</span>
                <aside className="translate-x-[96px] h-8 leading-8 flex justify-center items-center ">
                  <i class="fa-light fa-plus leading-6 mr-6 text-3xl flex h-[100%]"></i>
                  <i class="fa-solid fa-arrow-right leading-6 text-xl flex h-[100%]"></i>
                </aside>
              </header>

              <div>
                <div className="m-3">
                  <IconText
                    classicon="fa-solid fa-headphones"
                    title="Nhạc của bạn"
                    targetLink="/myMusic"
                    active={true}
                    currentActiveScreen={currentActiveScreen === "myMusic"}
                  />
                </div>
                <div className="m-3">
                  <IconText
                    classicon="fa-sharp fa-solid fa-heart"
                    title="Bộ sưu tập"
                    targetLink="/likedSongs"
                    active={true}
                    currentActiveScreen={currentActiveScreen === "likedSongs"}
                  />
                </div>

                <div className="m-3">
                  <IconText
                    classicon="fa-solid fa-rectangle-history-circle-user"
                    title="Danh sách phát của bạn"
                    targetLink="/library"
                    active={true}
                    currentActiveScreen={currentActiveScreen === "library"}
                    iconPlaylist={true}
                  />
                </div>

                <div className="m-3">
                  <IconText
                    classicon="fa-solid fa-square-plus"
                    title="Tạo danh sách phát"
                    active={true}
                    currentActiveScreen={
                      currentActiveScreen === "createplaylist"
                    }
                    onClick={() => {
                      setCreatePlaylistModalOpen(true);
                    }}
                  />
                </div>
              </div>
              <div className="bg-neutral-600 mt-6 p-4  rounded-[8px]">
                <span>Hãy cùng theo dõi một số</span>
                <br />
                <span>Podcast</span>
                <br />
                <span className="text-sm">
                  Chúng tôi sẽ cập nhật thông tin cho bạn về các tập mới
                </span>
                <br />
                <button className="border-solid border-2 rounded-[12px] mt-4 px-3">
                  Duyệt xem podcast
                </button>
              </div>
              <footer className="mt-6 ml-2">
                <span className="text-sm">Cookie</span>
                <br />
                <button className="mt-8 border-solid border-slate-100 border-[1px] rounded-xl px-2">
                  <i class="fa-solid fa-globe mr-1"></i>
                  Tiếng Việt
                </button>
              </footer>
            </main>
          </div>
        </div>
        {prevlibrary ? (
          <div className="w-[80%]">{children}</div>
        ) : (
          <div className="w-[80%]">
            <div
              id="navbar"
              className={` w-full  ${
                prevlibrary
                  ? "bg-gradient-to-b from-violet-400 relative "
                  : "bg_bg"
              } overflow-y-scroll max-h-[88vh] pb-[112px] min-h-[88vh] rounded`}
            >
              {prevlibrary ? (
                ""
              ) : (
                <div className="flex w-full bg_bg  items-center py-3 px-6 mb-1 sticky top-0">
                  <div className="nav_left">
                    {prevlibrary || prevUploadSong ? (
                      <i
                        class="fa-solid fa-chevron-left text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-pointer hover:text-white hover:bg-slate-500 mr-4"
                        onClick={() => {
                          navigate(-1);
                        }}
                      ></i>
                    ) : (
                      <i class="fa-solid fa-chevron-left text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-not-allowed mr-4"></i>
                    )}
                    <i class="fa-solid fa-chevron-right text-xl text-slate-200 w-8 h-8 leading-8 rounded-[50%] color_bg_icon cursor-not-allowed"></i>
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
                    <div className="border-2 rounded-[50%] text-center ml-4 w-8 h-8 flex justify-center items-center cursor-pointer">
                      <i class="fa-solid fa-user text-teal-50"></i>
                    </div>
                  </div>
                </div>
              )}
              <main className="w-ful">{children}</main>
            </div>
          </div>
        )}
      </div>
      {currentSong ? (
        <div className="h-[10%] bg-black fixed bottom-0 right-0 left-0 flex  text-white justify-center items-center">
          <div className="w-1/4 flex items-center ml-4">
            <img
              src={currentSong.thumbnail}
              alt="artist"
              className="h-14 w-14 rounded"
            />
            <div className="text-white text-left ml-4">
              <div className="text-sm font-semibold mb-1">
                {currentSong.name}
              </div>
              <div className="text-sm text-slate-500">
                {currentSong.artist.userName}
              </div>
            </div>
            <div className="text-white ml-8 flex justify-center items-center">
              <i class="fa-regular fa-heart mr-4"></i>
              <i class="fa-regular fa-clone"></i>
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
              <div className="mx-4">
                <i class="fa-solid fa-shuffle hover:text-white text-gray-400 cursor-pointer"></i>
              </div>
              <div className="mx-4">
                <i class="fa-solid fa-backward-step text-xl hover:text-white text-gray-400 cursor-pointer"></i>
              </div>
              <div className="mx-4 w-8 h-8 border-solid border-2 border-teal-50 flex justify-center items-center rounded-full">
                <i
                  class={
                    isPaused
                      ? `fa-solid fa-play text-center hover:text-white text-gray-400 cursor-pointer`
                      : `fa-solid fa-pause text-center hover:text-white text-gray-400 cursor-pointer`
                  }
                  onClick={togglePlayPause}
                ></i>
              </div>
              <div className="mx-4">
                <i class="fa-solid fa-forward-step text-xl hover:text-white text-gray-400 cursor-pointer"></i>
              </div>
              <div>
                <i class="fa-solid fa-repeat hover:text-white text-gray-400 cursor-pointer"></i>
              </div>
            </div>

            <div className={`w-[80%] flex translate-x-4`}>
              <div className="w-[10%]">{timeSongSeek}</div>
              <div className="w-[80%]">
                <input
                  id="progress"
                  class="progress"
                  type="range"
                  value={
                    songProgress ? `${songProgress}` : `0`
                  }
                  step="0.5"
                  min="0"
                  max="100"
                  onChange={(e) => setTimeChangeSeekSong(e.target.value)}
                />
              </div>
              <div className="w-[10%]">{timeSongPlay}</div>
            </div>
          </div>
          <div className="w-1/4">
            <div
              className="cursor-pointer"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            >
              {/* <i
                class="fa-regular fa-clone cursor-pointer"
                onClick={() => {
                  setAddToPlaylistModalOpen(true);
                }}
              ></i> */}
              <iconify-icon
                icon="ic:round-playlist-add"
                width="28px"
              ></iconify-icon>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[10%] bg-gradient-to-r from-green-500 to-cyan-400  fixed bottom-0 right-0 left-0 flex  text-white justify-center items-center">
          <div className="">
            <div className="flex text-center justify-center items-center">
              <div className="mr-1">Xem trước </div>
              <div className="underline font-semibold cursor-pointer">
                SPOTIFY
              </div>
            </div>
            <div className="flex">
              <div>
                Đăng ký để có thể tạo danh sách nhạc riêng của bạn cùng Spotify
              </div>
              <div className="font-semibold  px-2 underline cursor-pointer hover:text-violet-600">
                Đăng ký Spotify
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}