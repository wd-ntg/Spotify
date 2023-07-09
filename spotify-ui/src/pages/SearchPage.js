import React, { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import SingleSongCard from "../components/SingleSongCard";
import { makeUnauthenticatedGetMySongRequest } from "../utils/serverHelpers";

export default function SearchPage() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);

  const searchSong = async () => {
    const response = await makeUnauthenticatedGetMySongRequest(
      `/song/get/songname/${searchText}`
    );
    setSongData(response.data);
    // setSearchText("");
  };


  return (
    <div>
      <LoggedInContainer currentActiveScreen="searchpage">
        <div
          className={`w-1/5 translate-y-[-50px] translate-x-[102px] border-solid border-2 rounded-2xl py-1   bg-slate-600 ml-4 ${
            isInputFocused ? "border-white" : "border-slate-600"
          }`}
        >
          <i class="fa-solid fa-magnifying-glass text-white "></i>
          <input
            placeholder="Bạn muốn nghe gì?"
            type="text"
            className="outline-none border-none bg-slate-600 ml-2 focus:text-white"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong();
              }
            }}
          ></input>
        </div>

        {searchText === "" ? (
          <div className="text-white text-left font-semibold m-4">
            Chưa thực hiện tìm kiếm
          </div>
        ) : (
          <div>
            {songData.length > 0 ? (
              <div>
                <div className="text-white text-left font-semibold m-4">
                  Kết quả tìm kiếm cho từ khóa{" "}
                  <span className="underline text-xl">{searchText}</span>:
                </div>
                {songData.map((item) => {
                  console.log(item);
                  return (
                    <SingleSongCard
                      info={item}
                      key={JSON.stringify(item)}
                      playSound={() => {}}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-white text-left font-semibold m-4">
                Không tìm thấy bất kì kết quả nào.
              </div>
            )}
          </div>
        )}
      </LoggedInContainer>
      <div className="text-white">hello</div>
    </div>
  );
}
