import { configureStore } from "@reduxjs/toolkit";
import movieFilterReducer from "./movieFilterSlice/movieFilterSlice";
import moviesReducer from "./moviesSlice/moviesSlice";
import authReducer from "./authSlice/authSlice";
import adminAddMoviesReducer from "./adminAddMoviesSlice/adminAddMoviesSlice";
import alertReducer from "./alertSlice/alertSlice";

export const store = configureStore({
  reducer: {
    movieFilter: movieFilterReducer,
    movies: moviesReducer,
    auth: authReducer,
    adminAddMovies: adminAddMoviesReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
