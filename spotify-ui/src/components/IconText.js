import React from "react";
import { Link } from "react-router-dom";

export default function IconText({
  classicon,
  title,
  targetLink,
  active,
  currentActiveScreen,
  onClick,
  iconPlaylist,
}) {
  return (
    <Link to={targetLink} className="block w-37">
      <div
        className={`flex p-1 rounded-6 items-center${
          active ? "hover:text-violet-300" : ""
        } ${currentActiveScreen ? "text-violet-300" : ""}`}
        onClick={onClick}
      >
        <div className="flex items-center">
          {iconPlaylist ? (
            <div className="text-xl">
              <iconify-icon icon="bi:music-note-list"></iconify-icon>
            </div>
          ) : (
            <div>
              <i className={` ${classicon} flex `}></i>
            </div>
          )}

          <div>
            <span className="font-semibold ml-3">{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
