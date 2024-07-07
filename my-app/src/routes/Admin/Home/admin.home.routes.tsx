import { Box, Container, Pagination, useTheme } from "@mui/material";
import MovieFilter from "../../../components/movieFilter/movieFilter.component";
import Movies from "../../../components/movies/movies.component";
import { useStyles } from "./admin.home.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { useEffect, useState } from "react";
import MoviesService from "../../../services/MoviesService";
import { setMovies } from "../../../state/moviesSlice/moviesSlice";
import { useSearchParams } from "react-router-dom";
import { MovieFilterType } from "../../../types/MovieFilter.type";
import useLoggedOut from "../../../hooks/useLoggedOut";
import axios from "axios";

const AdminHome = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [paging, setPaging] = useState({ pageIndex: 0, pageCount: 0 });
  const dispatch = useDispatch<AppDispatch>();
  const movieFilter = useSelector((state: RootState) => state.movieFilter);
  const movies = useSelector((state: RootState) => state.movies.movies);
  // const [searchParams, setSearchParams] = useSearchParams();

  // const newMovieFilter: MovieFilterType = {
  //   Title: searchParams.get("Title") || "",
  //   year: searchParams.get("year") as any,
  //   imdBstar: searchParams.get("imdBstar") as any,
  //   sortBy: searchParams.get("sortBy") as any,
  //   sortAsc: searchParams.get("sortAsc") === "true",
  //   genre: searchParams.get("genre") as any,
  //   userRating: searchParams.get("userRating") as any,
  // };
  useLoggedOut();
  useEffect(() => {
    // axios
    //   .get("https://localhost:7209/api/admin")
    //   .then(() => console.log("oldu"));
    MoviesService.getMovies(movieFilter, paging.pageIndex)
      .then((response) => {
        console.log(response.data);
        dispatch(setMovies(response.data.movies));
        setPaging({
          pageIndex: response.data.pageIndex,
          pageCount: response.data.pageCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (pageIndex: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    MoviesService.getMovies(movieFilter, 0)
      .then((response) => {
        console.log(response.data);
        dispatch(setMovies(response.data.movies));
        setPaging({
          pageIndex: response.data.pageIndex,
          pageCount: response.data.pageCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearch = () => {
    // const searchParams = new URLSearchParams();
    // Object.entries(movieFilter).forEach(([key, value]) => {
    //   if (value !== undefined && value !== null && value !== "") {
    //     searchParams.set(key, value.toString());
    //   }
    // });
    // setSearchParams(searchParams);
    MoviesService.getMovies(movieFilter, paging.pageIndex)
      .then((response) => {
        console.log(response.data);
        dispatch(setMovies(response.data.movies));
        setPaging({
          pageIndex: response.data.pageIndex,
          pageCount: response.data.pageCount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Box sx={classes.container}>
        <Container maxWidth="sm">
          <MovieFilter onSearch={onSearch} />
        </Container>
      </Box>
      <Movies movies={movies} />
      <Pagination
        count={paging.pageCount}
        page={paging.pageIndex + 1}
        onChange={(event, page) => handlePageChange(page)}
        size="large"
        sx={{ mt: 5, justifyContent: "center", display: "flex" }}
      />
    </>
  );
};

export default AdminHome;
