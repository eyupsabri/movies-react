import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "./movieFilterSlice/movieFilterSlice";
import moviesReducer from "./moviesSlice/moviesSlice";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
