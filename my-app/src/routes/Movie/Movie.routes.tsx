import {
  Box,
  Button,
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
import { Add, Height, Star, Widgets } from "@mui/icons-material";
import { MovieReviewType } from "../../types/MovieReview.type";
import YouTube from "react-youtube";
import { MovieReviewAddType } from "../../types/MovieReviewAdd.type";
import MovieWithAuthService from "../../services/MovieWithAuthService";
import AddMovieReview from "../../components/addMovieReview/addMovieReview.component";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Movie = () => {
  const params = useParams<{ movieID: string }>();
  console.log(params);
  const theme = useTheme();
  const classes = useStyles(theme);
  const [movie, setMovie] = useState<MovieDetailedType>();
  const authenticated = useSelector<RootState>(
    (state) => state.auth.authanticated
  );
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

  // const onClickDeneme = async () => {
  //   if (params.movieID == undefined) return;

  //   const data: MovieReviewAddType = {
  //     description:
  //       "!lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit voluptate velit esse cillum dolore fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim id est laborum",
  //     star: 10,
  //     title: "Deneme",
  //     movieID: params.movieID,
  //     created: new Date(),
  //   };
  //   await MovieReviewService.addMovieReview(data)
  //     .then((response) => {
  //       console.log("Review added movieleri çekicek");
  //       return MoviesService.getMovieByID(params.movieID as string);
  //     })
  //     .then((response) => {
  //       setMovie(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Error e mi giriyor");
  //     });
  // };
  const onSubmit = async (data: {
    title: string;
    review: string;
    rating: number;
  }) => {
    if (params.movieID == undefined) return;
    const addReview: MovieReviewAddType = {
      description: data.review,
      star: data.rating,
      title: data.title,
      movieID: params.movieID,
      created: new Date(),
    };
    await MovieWithAuthService.addMovieReview(addReview)
      .then((response) => {
        console.log("Review added movieleri çekicek");
        return MoviesService.getMovieByID(params.movieID as string);
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log("Error e mi giriyor");
      });
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
        {movie?.reviews.map((review, index) => (
          <Card key={review.id} sx={{ mt: 1, px: 1 }}>
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

      {authenticated ? <AddMovieReview onSubmit={onSubmit} /> : null}
    </Container>
  );
};
export default Movie;
