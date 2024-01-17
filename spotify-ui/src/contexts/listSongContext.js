import { createContext } from "react";

const listSongContext = createContext({
  listSong: null,
  setListSong: (listSong) => {},
});

export default listSongContext;
