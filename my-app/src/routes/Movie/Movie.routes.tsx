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
import { Height, Star, Widgets } from "@mui/icons-material";
import { MovieReviewType } from "../../types/MovieReview.type";
import YouTube from "react-youtube";

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

  const dateToString = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const getStar = (reviews?: MovieReviewType[]) => {
    if (!reviews || reviews.length == 0) return "-";
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.star;
    });
    return sum / reviews.length;
  };
  console.log(movie?.trailerURL);

  const getVideoId = (url: string) => {
    const parts = url.split("/embed/");
    return parts.length > 1 ? parts[1] : undefined;
  };

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Star />
              <Typography variant="h6">{getStar(movie?.reviews)}/10</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {movie && (
        <Box
          sx={{
            mt: 2,
            position: "relative",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
            maxWidth: "100%",
            background: "black",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <YouTube
              videoId={getVideoId(movie.trailerURL)}
              opts={{ width: "100%", height: "100%" }}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 5, px: 1 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Summary
        </Typography>
        <Typography>{movie?.description}</Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Reviews</Typography>
        {movie?.reviews.map((review) => (
          <Card key={review.userName} sx={{ mt: 1, px: 1 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-start",
                }}
              >
                {/* <Typography>Created: {review.created}</Typography> */}
                <Typography variant="subtitle1">Reviewed by:</Typography>
                <Typography>{review.userName}</Typography>
                <Box
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Star />
                  <Typography>{review.star}/10</Typography>
                </Box>
              </Box>
            </CardContent>
            <CardHeader title={review.title} />

            <CardContent>
              <Typography>{review.description}</Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography>Created: {dateToString(review.created)}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};
export default Movie;
