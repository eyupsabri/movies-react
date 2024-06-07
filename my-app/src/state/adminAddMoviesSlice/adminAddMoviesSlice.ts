import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MoviesAPIFilterResponseType } from "../../types/MoviesAPIFilterResponse.type";
import { AdminMovieFilterType } from "../../types/AdminMovieFilter.type";

interface AdminMoviesState {
  movies: MoviesAPIFilterResponseType[];
  filter: AdminMovieFilterType;
}

const initialState: AdminMoviesState = {
  movies: [],
  filter: { title: "" },
};

const adminAddMoviesSlice = createSlice({
  name: "adminAddMovies",
  initialState,
  reducers: {
    setMovieIDs: (
      state,
      action: PayloadAction<MoviesAPIFilterResponseType[]>
    ) => {
      state.movies = action.payload;
    },
    setFilterTitle: (state, action: PayloadAction<string>) => {
      state.filter.title = action.payload;
    },
  },
});

export default adminAddMoviesSlice.reducer;
export const { setMovieIDs, setFilterTitle } = adminAddMoviesSlice.actions;
