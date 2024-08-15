import { Box, Button, TextField, useTheme } from "@mui/material";
import { useStyles } from "./adminMovieFilter.styles";
import MoviesDatabaseService from "../../services/MoviesDatabaseService";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilterTitle,
  setMovieIDs,
} from "../../state/adminAddMoviesSlice/adminAddMoviesSlice";
import { useState } from "react";

type AdminMovieFilterProps = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  setNotFound: (value: boolean) => void;
};

const AdminMovieFilter = ({
  isLoading,
  setIsLoading,
  setNotFound,
}: AdminMovieFilterProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const dispatch = useDispatch<AppDispatch>();
  const { title } = useSelector(
    (state: RootState) => state.adminAddMovies.filter
  );

  const searchMovies = () => {
    setIsLoading(true);

    MoviesDatabaseService.getMoviesByTitle(title)
      .then((response) => {
        if (response.data.results.length <= 0) {
          console.error("No results found");
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        console.log(response);
        dispatch(setMovieIDs(response.data.results));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box sx={classes.container}>
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        sx={classes.title_textfield}
        value={title}
        onChange={(event) => dispatch(setFilterTitle(event.target.value))}
      />
      {/* <Grid container>
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
              {Object.keys(Year).map((key) => (
                <MenuItem key={key} value={Year[key as keyof typeof Year]}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid> */}
      <Box sx={classes.button_container}>
        <Button variant="contained" color="primary" onClick={searchMovies}>
          {isLoading ? "Loading..." : "Search"}
        </Button>
      </Box>
    </Box>
  );
};
export default AdminMovieFilter;
