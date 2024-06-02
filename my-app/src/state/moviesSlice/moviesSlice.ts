import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieType } from "../../types/Movie.type";

interface MoviesState {
  movies: MovieType[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieType[]>) => {
      state.movies = action.payload;
    },
  },
});

export default moviesSlice.reducer;
export const { setMovies } = moviesSlice.actions;
