import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./movieCard.styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MoviesDatabaseService from "../../services/MoviesDatabaseService";
import { MovieFromAPIType } from "../../types/MovieFromAPIType";

type MovieCardProps = {
  movieID: string;
};
const MovieCard = ({ movieID }: MovieCardProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [movie, setMovie] = useState<MovieFromAPIType>();

  useEffect(() => {
    MoviesDatabaseService.getMovie(movieID)
      .then((response) => {
        setMovie(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieID]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={classes.card}>
        <CardMedia sx={classes.cardMedia} image={movie?.banner} />
        <CardContent sx={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {movie?.title}
          </Typography>
          <Typography>{movie?.plot}</Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            size="small"
            color="primary"
            to={`/admin/movies/${movie?.imdb_id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
