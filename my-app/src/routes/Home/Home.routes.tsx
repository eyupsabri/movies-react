import {
  Container,
  Box,
  useTheme,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
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
import { Genre } from "../../enums/Genre.enum";
import { Year } from "../../enums/Year.enum";

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ pageIndex: 0, pageCount: 0 });
  const dispatch = useDispatch<AppDispatch>();
  const movieFilter = useSelector((state: RootState) => state.movieFilter);
  const movies = useSelector((state: RootState) => state.movies.movies);

  useEffect(() => {
    const defaultSearchParams = new URLSearchParams();
    if (!searchParams.toString()) {
      defaultSearchParams.set("sortBy", "imdbStar");
      setSearchParams(defaultSearchParams);
    }
  }, []);

  useEffect(() => {
    // console.log(`New search query: ${searchParams}`);
    const newMovieFilter: MovieFilterType = {
      Title: searchParams.get("Title") || "",
      year: (searchParams.get("year") as Year) || Year.None,
      imdBstar: searchParams.get("imdBstar") || "",
      sortBy: searchParams.get("sortBy") as any,
      sortAsc: searchParams.get("sortAsc") === "true",
      genre: (searchParams.get("genre") as Genre) || Genre.None,
      userRating: searchParams.get("userRating") || "",
    };

    // console.log("new movie Filter", newMovieFilter);
    dispatch(setMovieFilter({ ...newMovieFilter }));
    setLoading(true);

    const PageIndex = searchParams.get("pageIndex");
    if (PageIndex) {
      setPaging({ ...paging, pageIndex: parseInt(PageIndex) });
    }

    MoviesService.getMoviesWithQuery(searchParams.toString())
      .then((response) => {
        // console.log(response.data);
        dispatch(setMovies(response.data.movies));
        setPaging({
          pageIndex: response.data.pageIndex,
          pageCount: response.data.pageCount,
        });
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  const handleRefresh = async () => {
    await MoviesService.getMoviesWithQuery(searchParams.toString())
      .then((response) => {
        // console.log(response.data);
        dispatch(setMovies(response.data.movies));
        setPaging({
          pageIndex: response.data.pageIndex,
          pageCount: response.data.pageCount,
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handlePageChange = (pageIndex: number) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    queryBuilder(pageIndex - 1);
  };

  const queryBuilder = (pageIndex: number, sortBy?: "imdbStar" | "year") => {
    // console.log(movieFilter);
    const newMovieFilter: MovieFilterType = {
      ...movieFilter,
      sortBy: sortBy || movieFilter.sortBy,
    };
    const searchParams = new URLSearchParams();
    Object.entries(newMovieFilter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value.toString());
      }
    });
    searchParams.set("pageIndex", pageIndex.toString());
    setSearchParams(searchParams);
    // console.log("search params", searchParams);
  };

  const onSearch = () => {
    queryBuilder(0);
  };

  const handleSortByChange = (
    event: SelectChangeEvent<"year" | "imdbStar">
  ) => {
    queryBuilder(0, event.target.value as "year" | "imdbStar");
    dispatch(
      setMovieFilter({
        ...movieFilter,
        sortBy: event.target.value as "year" | "imdbStar",
      })
    );
  };

  return (
    <>
      <Box sx={classes.container}>
        <Container maxWidth="sm">
          <MovieFilter onSearch={onSearch} />
        </Container>
      </Box>

      <Container
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          mb: 3,
        }}
        maxWidth="md"
      >
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={movieFilter.sortBy}
            label="Sort By"
            onChange={handleSortByChange}
          >
            <MenuItem value={"imdbStar"}>IMDB Rating</MenuItem>
            <MenuItem value={"year"}>Release Year</MenuItem>
          </Select>
        </FormControl>
      </Container>
      {!loading && (
        <Movies movies={movies} type="default" handleRefresh={handleRefresh} />
      )}

      {loading && (
        <Typography variant="h5" sx={{ mt: 5, textAlign: "center" }}>
          ...Loading
        </Typography>
      )}
      {movies.length === 0 && !loading && (
        <Typography variant="h5" sx={{ mt: 5, textAlign: "center" }}>
          ...No movies found
        </Typography>
      )}
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
