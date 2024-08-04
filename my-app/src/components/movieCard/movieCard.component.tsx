import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./movieCard.styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MoviesDatabaseService from "../../services/MoviesDatabaseService";
import { MovieFromAPIType } from "../../types/MovieFromAPIType";
import MovieWithAuthService from "../../services/MovieWithAuthService";
import { MovieType } from "../../types/Movie.type";
import { MovieAddType } from "../../types/MovieAdd.type";
import { Genre } from "../../enums/Genre.enum";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setAlert } from "../../state/alertSlice/alertSlice";
import OnMouseOverMovie from "../onMouseOverMovie/onMouseOverMovie.component";

type MovieCardProps = {
  movieID: string;
};
const MovieCard = ({ movieID }: MovieCardProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [movie, setMovie] = useState<MovieFromAPIType>();
  const dispatch = useDispatch<AppDispatch>();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    MoviesDatabaseService.getMovie(movieID)
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieID]);

  const addToDatabase = () => {
    if (!movie) return null;

    const movieToAdd: MovieAddType = {
      id: movie.imdb_id,
      imdBstar: movie.rating,
      title: movie.title,
      year: movie.year,
      description: movie.description,
      contentRating: movie.content_rating,
      trailerURL: movie.trailer,
      imageURL: movie.image_url,
      bannerURL: movie.banner,
      plot: movie.plot,
      movieLength: movie.movie_length,
      genre: movie.gen.map(
        (genre) => +Genre[genre.genre as keyof typeof Genre]
      ),
    };
    console.log(movieToAdd);
    MovieWithAuthService.adminAddMovie(movieToAdd)
      .then((response) => {
        console.log(response);
        dispatch(
          setAlert({
            message: "Movie added to database successfully",
            type: "default",
          })
        );
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch(setAlert({ message: error.response.data, type: "button" }));
        }
      });
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={classes.card}>
        {/* <CardMedia sx={classes.cardMedia} image={movie?.banner} /> */}
        {movie && (
          <CardMedia
            sx={classes.cardMedia}
            image={movie?.banner}
            onMouseOver={() => handleMouseOver()}
            onMouseOut={() => handleMouseOut()}
          >
            <Fade in={isHovered}>
              <Box sx={classes.onMouseOver}>
                <OnMouseOverMovie
                  movieCategories={movie.gen.map((genre) => genre.genre)}
                  rating={movie?.rating}
                  id={movie?.imdb_id}
                  slideAnimation={isHovered}
                  type="addMovie"
                />
              </Box>
            </Fade>
          </CardMedia>
        )}

        <CardContent sx={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {movie?.title}
          </Typography>
          <Typography>{movie?.plot}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            component={Link}
            size="small"
            color="primary"
            to={`/admin/movies/${movie?.imdb_id}`}
          >
            View
          </Button>
          <Button size="small" color="primary" onClick={addToDatabase}>
            Add to database
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
