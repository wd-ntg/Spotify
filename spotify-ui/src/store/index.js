import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMBD_BASE_URL } from "../utils/constants";
import axios from 'axios'

const initialState = {
  songs: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("spotify/genres", async () => {
  const { data } = await axios.get(
    `${TMBD_BASE_URL}/genre/song/list?api_key=${API_KEY}`
  );
  console.log(data)
});

const SpotifySlice = createSlice({
  name: "Spotify",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true
    })
  },
});

export const store = configureStore({
  reducer: {
    spotify: SpotifySlice.reducer,
  },
});
