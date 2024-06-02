import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MovieFilterType } from "../../types/MovieFilter.type";
import { Year } from "../../enums/Year.enum";
import { Genre } from "../../enums/Genre.enum";

const initialState: MovieFilterType = {
  sortBy: "imdbStar",
  // sortAsc: false,
  // title: "",
  year: Year.None,
  genre: Genre.None,
};

const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,
  reducers: {
    setMovieFilter: (state, action: PayloadAction<MovieFilterType>) => {
      state.imdBstar = action.payload.imdBstar;
      state.sortAsc = action.payload.sortAsc;
      state.sortBy = action.payload.sortBy;
      state.Title = action.payload.Title;
      state.year = action.payload.year;
      state.genre = action.payload.genre;
    },
  },
});

export default movieFilterSlice.reducer;
export const { setMovieFilter } = movieFilterSlice.actions;
