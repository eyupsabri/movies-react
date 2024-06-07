import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "./movieFilterSlice/movieFilterSlice";
import moviesReducer from "./moviesSlice/moviesSlice";
import authReducer from "./authSlice/authSlice";
import adminAddMoviesReducer from "./adminAddMoviesSlice/adminAddMoviesSlice";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterReducer,
    movies: moviesReducer,
    auth: authReducer,
    adminAddMovies: adminAddMoviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
