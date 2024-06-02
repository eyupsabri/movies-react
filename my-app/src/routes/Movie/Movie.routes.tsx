import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./Movie.styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MoviesService from "../../services/MoviesService";
import { MovieDetailedType } from "../../types/MovieDetailed.type";
import IconBxlImdb from "../../components/imdbSVG/imdbSVG.component";

const Movie = () => {
  const params = useParams<{ movieID: string }>();
  console.log(params);
  const theme = useTheme();
  const classes = useStyles(theme);
  const [movie, setMovie] = useState<MovieDetailedType>();

  useEffect(() => {
    if (params.movieID) {
      MoviesService.getMovieByID(params.movieID)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.movieID]);
  console.log(movie);
  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="img"
            src={movie?.bannerURL}
            alt={movie?.title}
            sx={{ height: 300, aspectRatio: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">{movie?.title}</Typography>
            <Typography variant="h5">{movie?.year}</Typography>
            <Box sx={{ display: "flex" }}>
              {movie?.movieCategories.map((category, index) => (
                <Typography key={category}>
                  {category}
                  {index != movie.movieCategories.length - 1 && "/"}
                </Typography>
              ))}
            </Box>

            <Typography>Content Rating: {movie?.contentRating}</Typography>
            <Typography>Movie Length: {movie?.movieLength} minutes</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconBxlImdb style={{ fontSize: 50 }} />
              <Typography variant="h6">{movie?.imdBstar}/10</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, px: 1 }}>
        <Typography variant="h5">Summary</Typography>
        <Typography>{movie?.description}</Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Reviews</Typography>
        {movie?.reviews.map((review) => (
          <Card key={review.userName} sx={{ mt: 2, px: 1 }}>
            <CardHeader title={review.title} />

            <CardContent>
              <Typography>{review.description}</Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Typography>{review.userName}</Typography>
              <Typography>{review.star}/10</Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
export default Movie;
