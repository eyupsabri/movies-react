import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useStyles } from "./movieFilter.styles";
import { Genre } from "../../enums/Genre.enum";
import { Year } from "../../enums/Year.enum";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setMovieFilter } from "../../state/movieFilterSlice/movieFilterSlice";
import MoviesService from "../../services/MoviesService";
import { setMovies } from "../../state/moviesSlice/moviesSlice";

const MovieFilter = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const movieFilter = useSelector((state: RootState) => state.movieFilter);
  // const [rating, setRating] = useState("");
  // const [userRating, setUserRating] = useState("");
  // const [genre, setGenre] = useState<Genre>(Genre.None);
  // const [year, setYear] = useState<Year>(Year.None);

  const handleIMDBRating = (value: string) => {
    dispatch(
      setMovieFilter({
        ...movieFilter,
        imdBstar: value === "" ? undefined : parseInt(value),
      })
    );
  };
  const handleUserRating = (value: string) => {
    dispatch(
      setMovieFilter({
        ...movieFilter,
        userRating: value === "" ? undefined : parseInt(value),
      })
    );
  };
  const handleGenre = (value: string) => {
    dispatch(
      setMovieFilter({
        ...movieFilter,
        genre: value as Genre,
      })
    );
  };
  const handleYear = (value: string) => {
    dispatch(setMovieFilter({ ...movieFilter, year: value as Year }));
  };
  const searchMovies = () => {
    console.log("movie filter user rating ", movieFilter.userRating);
    MoviesService.getMovies(movieFilter)
      .then((response) => {
        console.log(response.data);
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={classes.container}>
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        sx={classes.title_textfield}
        value={movieFilter.Title}
        onChange={(event) =>
          dispatch(
            setMovieFilter({ ...movieFilter, Title: event.target.value })
          )
        }
      />
      <Grid container>
        <Grid item xs={6} sm={3}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              IMDB Rating
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={movieFilter.imdBstar?.toString()}
              onChange={(event) => handleIMDBRating(event.target.value)}
              label="IMDB Rating"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>1+</MenuItem>
              <MenuItem value={"2"}>2+</MenuItem>
              <MenuItem value={"3"}>3+</MenuItem>
              <MenuItem value={"4"}>4+</MenuItem>
              <MenuItem value={"5"}>5+</MenuItem>
              <MenuItem value={"6"}>6+</MenuItem>
              <MenuItem value={"7"}>7+</MenuItem>
              <MenuItem value={"8"}>8+</MenuItem>
              <MenuItem value={"9"}>9+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              User Rating
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={movieFilter.userRating?.toString()}
              onChange={(event) => handleUserRating(event.target.value)}
              label="User Rating"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>1+</MenuItem>
              <MenuItem value={"2"}>2+</MenuItem>
              <MenuItem value={"3"}>3+</MenuItem>
              <MenuItem value={"4"}>4+</MenuItem>
              <MenuItem value={"5"}>5+</MenuItem>
              <MenuItem value={"6"}>6+</MenuItem>
              <MenuItem value={"7"}>7+</MenuItem>
              <MenuItem value={"8"}>8+</MenuItem>
              <MenuItem value={"9"}>9+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={movieFilter.genre?.toString()}
              onChange={(event) => handleGenre(event.target.value)}
              label="Genre"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {Object.keys(Genre).map((key) => (
                <MenuItem key={key} value={Genre[key as keyof typeof Genre]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={movieFilter.year?.toString()}
              onChange={(event) => handleYear(event.target.value)}
              label="Year"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {Object.keys(Year).map((key) => (
                <MenuItem key={key} value={Year[key as keyof typeof Year]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={classes.button_container}>
        <Button variant="contained" color="primary" onClick={searchMovies}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default MovieFilter;
