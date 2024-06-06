import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "./movieFilterSlice/movieFilterSlice";
import moviesReducer from "./moviesSlice/moviesSlice";
import authReducer from "./authSlice/authSlice";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterReducer,
    movies: moviesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
