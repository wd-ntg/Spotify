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
        <div className="relative w-[80%]">
          <div className={` ${displayCard[0] ? "card_animation" : "hidden"} shadow-lg shadow-indigo-500/40`} >
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/532168/pexels-photo-532168.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="absolute top-0 left-0 text-white ">
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div className={`${displayCard[1] ? "card_animation" : "hidden"} shadow-lg shadow-indigo-500/40` }>
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/6858608/pexels-photo-6858608.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="absolute top-0 left-0 text-white ">
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div className={`${displayCard[2] ? "card_animation" : "hidden"} shadow-lg shadow-indigo-500/40`}>
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/6208084/pexels-photo-6208084.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="absolute top-0 left-0 text-white ">
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div className={`${displayCard[3] ? "card_animation" : "hidden"} shadow-lg shadow-indigo-500/40`}>
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/4671738/pexels-photo-4671738.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div className="absolute top-0 left-0 text-white ">
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-[8%] hover_card `}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(0);
            }}
          >
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/532168/pexels-photo-532168.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div
              className={`absolute top-0 left-0 text-white ${
                hoverState[0] ? "" : "hidden"
              }`}
            >
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-[6%] hover_card`}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(1);
            }}
          >
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/6858608/pexels-photo-6858608.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div
              className={`absolute top-0 left-0 text-white ${
                hoverState[1] ? "" : "hidden"
              }`}
            >
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-[4%] hover_card`}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(2);
            }}
          >
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/6208084/pexels-photo-6208084.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div
              className={`absolute top-0 left-0 text-white ${
                hoverState[2] ? "" : "hidden"
              }`}
            >
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
          <div
            className={`absolute top-0 right-0 w-[2%] hover_card`}
            onMouseEnter={() => handleHover(3)}
            onMouseLeave={() => handleHover(-1)}
            onClick={() => {
              handleDisplayCard(3);
            }}
          >
            <img
              className="w-full object-cover h-[240px] rounded-md"
              src="https://images.pexels.com/photos/4671738/pexels-photo-4671738.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
            <div
              className={`absolute top-0 left-0 text-white ${
                hoverState[3] ? "" : "hidden"
              }`}
            >
              <div className="py-8 px-12">
                Những ca khúc mới nhất luôn có trên Spotify
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowCard;
