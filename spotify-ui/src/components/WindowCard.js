import React, { useState, useEffect } from "react";

const WindowCard = () => {
  const [hoverState, setHoverState] = useState(Array(4).fill(false));

  const handleHover = (index) => {
    const updatedHoverState = hoverState.map((state, i) => i === index);
    setHoverState(updatedHoverState);
  };

  const [displayCard, setDisplayCard] = useState([true, false, false, false]);

  const handleDisplayCard = (index) => {
    const updateDisplayCard = displayCard.map((state, i) => i === index);
    setDisplayCard(updateDisplayCard);
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center relative">
        <div className="relative w-[45%] translate-x-[-10%]">
          <div
            className={` ${
              displayCard[0] ? "card_animation" : "hidden"
            } shadow-lg overflow-hidden shadow-slate-50/40`}
          >
            <img
              className="w-full object-cover object-top h-[296px] rounded-md"
              src="https://danviet.mediacdn.vn/296231569849192448/2022/5/24/blackpinkcoverlisa1800px-1653411458174584704508.jpg"
            />
            <div className="absolute top-[65%] left-0 text-white ">
              <div className="py-8 mx-6 overflow-hidden">
                <div className="mb-2 text-slate-600">Spotify - Albumn</div>
                <div className="text-left flex  w-[124px] overflow-hidden">
                  <div className="song_trans flex">
                  <div className="w-6 h-6 text-2xl text-black disc flex justify-center items-center ">
                    <iconify-icon icon="jam:disc"></iconify-icon>
                  </div>
                  <div className="ml-2 text-pink-400">Pink Venom</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              displayCard[1] ? "card_animation" : "hidden"
            } shadow-lg overflow-hidden shadow-amber-300/40`}
          >
            <img
              className="w-full object-cover object-center h-[296px] rounded-md"
              src="https://i.pinimg.com/originals/49/61/06/496106814a6f8bab3a0436b15bb54f72.jpg"
            />
            <div className="absolute top-[65%] left-0 text-white ">
              <div className="py-8 mx-6 overflow-hidden">
                <div className="mb-2 text-skin">Spotify - Albumn</div>
                <div className="text-left flex  w-[124px] overflow-hidden">
                  <div className="song_trans flex">
                  <div className="w-6 h-6 text-2xl text-white disc flex justify-center items-center ">
                    <iconify-icon icon="jam:disc"></iconify-icon>
                  </div>
                  <div className="ml-2 text-black">Solo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              displayCard[2] ? "card_animation" : "hidden"
            } shadow-lg overflow-hidden shadow-red-500/40`}
          >
            <img
              className="w-full object-cover object-center h-[296px] rounded-md"
              src="https://vtv1.mediacdn.vn/thumb_w/640/2023/3/20/200323-jisoo-blackpink-1679279584526559694193.jpg  "
            />
            <div className="absolute top-[65%] left-0 text-white ">
              <div className="py-8 mx-6 overflow-hidden">
                <div className="mb-2 text-yellow-400">Spotify - Albumn</div>
                <div className="text-left flex  w-[124px] overflow-hidden">
                  <div className="song_trans flex">
                  <div className="w-6 h-6 text-2xl text-black disc flex justify-center items-center ">
                    <iconify-icon icon="jam:disc"></iconify-icon>
                  </div>
                  <div className="ml-2 text-skin">Flower</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              displayCard[3] ? "card_animation" : "hidden"
            } shadow-lg overflow-hidden shadow-fuchsia-300/40`}
          >
            <img
              className="w-full object-cover object-top h-[296px] rounded-md"
              src="https://down-tw.img.susercontent.com/file/d3408337998e0257fac2b11fba80b38b"
            />
            <div className="absolute top-[65%] left-0 text-white ">
              <div className="py-8 mx-6 overflow-hidden">
                <div className="mb-2 text-pink_light">Spotify - Albumn</div>
                <div className="text-left flex  w-[156px] overflow-hidden">
                  <div className="song_trans flex">
                  <div className="w-6 h-6 text-2xl text-white disc flex justify-center items-center ">
                    <iconify-icon icon="jam:disc"></iconify-icon>
                  </div>
                  <div className="ml-2 text-black">On The Ground</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-[-18%] w-[16%] hover_card `}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(0);
            }}
          >
            {hoverState[0] ? (
              <img
                className="w-full object-cover object-top h-[296px] rounded-md"
                src="https://danviet.mediacdn.vn/296231569849192448/2022/5/24/blackpinkcoverlisa1800px-1653411458174584704508.jpg"
              />
            ) : (
              <div className="w-8 text-pink-400 h-[296px] rounded-md text-left bg-blue-50 flex flex-col justify-center bg-gradient-to-r from-black to-black">
                <div className="text-xl w-6 flex justify-center items-center">
                  L
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  A
                </div>
              </div>
            )}
            <div
              className={`absolute top-0 left-0 flex items-center text-white  ${
                hoverState[0] ? "" : "hidden"
              }`}
            >
              <div className="w-8 text-pink-400 h-[296px] translate-y-[-32px] rounded-l-md items-center text-left bg-blue-50 flex flex-col justify-center bg-gradient-to-r from-black to-black">
                <div className="text-xl w-6 flex justify-center items-center">
                  L
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  A
                </div>
              </div>
              <div className="flex flex-col justify-center h-[360px] mx-4">
                <div className="text-4xl text-pink_light">Black Pink</div>
                <div className="text-left text-3xl mt-4 text-black">Lisa</div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-[-18%] w-[12%] hover_card`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(1);
            }}
          >
            {hoverState[1] ? (
              <img
                className="w-full object-cover object-center h-[296px] rounded-md"
                src="https://i.pinimg.com/originals/49/61/06/496106814a6f8bab3a0436b15bb54f72.jpg"
              />
            ) : (
              <div className="w-8  h-[296px] rounded-md text-left text-pink-400 flex flex-col justify-center bg-black  ">
                <div className="text-xl w-6 flex justify-center items-center">
                  J
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  N
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  N
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
              </div>
            )}
            <div
              className={`absolute top-0 left-0 flex items-center text-white ${
                hoverState[1] ? "" : "hidden"
              }`}
            >
              <div className="w-8  h-[296px] translate-y-[-32px] rounded-l-md items-center text-left text-pink-400 flex flex-col justify-center bg-black  ">
                <div className="text-xl w-6 flex justify-center items-center">
                  J
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  N
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  N
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
              </div>
              <div className="flex flex-col justify-center h-[360px] mx-4">
                <div className="text-4xl text-pink_light">Black Pink</div>
                <div className="text-left text-3xl mt-4 text-black">Jennie</div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-[-18%] w-[8%] hover_card`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(2);
            }}
          >
            {hoverState[2] ? (
              <img
                className="w-full object-cover object-center h-[296px] rounded-md"
                src="https://vtv1.mediacdn.vn/thumb_w/640/2023/3/20/200323-jisoo-blackpink-1679279584526559694193.jpg  "
              />
            ) : (
              <div className="w-8  h-[296px] text-left flex flex-col justify-center bg-pink-500">
                <div className="text-xl w-6 flex justify-center items-center">
                  J
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
              </div>
            )}
            <div
              className={`absolute top-0 left-0 flex items-center text-white ${
                hoverState[2] ? "" : "hidden"
              }`}
            >
              <div className="w-8  h-[296px] translate-y-[-32px] rounded-l-md items-center text-left flex flex-col justify-center bg-pink-500">
                <div className="text-xl w-6 flex justify-center items-center">
                  J
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  I
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
              </div>
              <div className="flex flex-col justify-center h-[360px] mx-4">
                <div className="text-4xl text-black">Black Pink</div>
                <div className="text-left text-3xl mt-4 text-pink_light">Jisoo</div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-[-18%] w-[4%] hover_card`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(3);
            }}
          >
            {hoverState[3] ? (
              <img
                className="w-full object-cover object-top h-[296px] rounded-md"
                src="https://down-tw.img.susercontent.com/file/d3408337998e0257fac2b11fba80b38b"
              />
            ) : (
              <div className="w-8  h-[296px] rounded-md text-left bg-pink-500 flex flex-col justify-center">
                <div className="text-xl w-6 flex justify-center items-center">
                  R
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
              </div>
            )}
            <div
              className={`absolute top-0 left-0 flex items-center text-white ${
                hoverState[3] ? "" : "hidden"
              }`}
            >
              <div className="w-8  h-[296px] translate-y-[-32px] rounded-l-md items-center text-left bg-pink-500 flex flex-col justify-center">
                <div className="text-xl w-6 flex justify-center items-center">
                  R
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  O
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  S
                </div>
                <div className="text-xl w-6 flex justify-center items-center">
                  E
                </div>
              </div>
              <div className="flex flex-col justify-center h-[360px] mx-4">
                <div className="text-4xl text-black">Black Pink</div>
                <div className="text-left text-3xl mt-4 text-pink_light">Rose</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowCard;
