import { Container, Box, useTheme, Pagination } from "@mui/material";
import Movies from "../../components/movies/movies.component";
import { useStyles } from "./Home.styles";
import MovieFilter from "../../components/movieFilter/movieFilter.component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import MoviesService from "../../services/MoviesService";
import { setMovies } from "../../state/moviesSlice/moviesSlice";
import { useSearchParams } from "react-router-dom";
import { MovieFilterType } from "../../types/MovieFilter.type";
import { setMovieFilter } from "../../state/movieFilterSlice/movieFilterSlice";
import useLoggedOut from "../../hooks/useLoggedOut";

// type MovieFilterType = {
//   Title?: string;
//   year?: Year;
//   imdBstar?: number;
//   sortBy: "imdbStar" | "year";
//   sortAsc?: boolean;
//   genre?: Genre;
//   userRating?: number;
// };

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const [searchParams, setSearchParams] = useSearchParams();

  const [paging, setPaging] = useState({ pageIndex: 0, pageCount: 0 });
  const dispatch = useDispatch<AppDispatch>();
  const movieFilter = useSelector((state: RootState) => state.movieFilter);
  const movies = useSelector((state: RootState) => state.movies.movies);

  // const newMovieFilter: MovieFilterType = {
  //   Title: searchParams.get("Title") || undefined,
  //   year: searchParams.get("year") as any,
  //   imdBstar: searchParams.get("imdBstar") as any,
  //   sortBy: searchParams.get("sortBy") as any,
  //   sortAsc: searchParams.get("sortAsc") === "true",
  //   genre: searchParams.get("genre") as any,
  //   userRating: searchParams.get("userRating") as any,
  // };

  useEffect(() => {
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
    MoviesService.getMovies(movieFilter, pageIndex - 1)
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
    console.log(movieFilter);
    // const searchParams = new URLSearchParams();
    // Object.entries(movieFilter).forEach(([key, value]) => {
    //   if (value !== undefined && value !== null && value !== "") {
    //     searchParams.set(key, value.toString());
    //   }
    // });
    // setSearchParams(searchParams);
    // console.log("search params", searchParams);
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

export default Home;
