import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  CardActions,
  Button,
  useTheme,
} from "@mui/material";
import { useStyles } from "./movies.styles";
import { useEffect, useState } from "react";
import MoviesService from "../../services/MoviesService";
import { MovieType } from "../../types/Movie.type";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { setMovies } from "../../state/moviesSlice/moviesSlice";

const Movies = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const movieFilter = useSelector((state: RootState) => state.movieFilter);
  const movies = useSelector((state: RootState) => state.movies.movies);
  useEffect(() => {
    MoviesService.getMovies(movieFilter)
      .then((response) => {
        // console.log(response.data);
        dispatch(setMovies(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container sx={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {movies?.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <Card sx={classes.card}>
              <CardMedia sx={classes.cardMedia} image={movie.bannerURL} />
              <CardContent sx={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography>{movie.plot}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  size="small"
                  color="primary"
                  to={`/movies/${movie.id}`}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies;
