import { Box, Container, Grid, Typography } from "@mui/material";
import IconBxlImdb from "../../../components/imdbSVG/imdbSVG.component";
import YouTube from "react-youtube";
import { MovieFromAPIType } from "../../../types/MovieFromAPIType";
import { useEffect, useState } from "react";
import MoviesDatabaseService from "../../../services/MoviesDatabaseService";
import { useParams } from "react-router-dom";
import useLoggedOut from "../../../hooks/useLoggedOut";

const AdminDetailedMovie = () => {
  const params = useParams<{ imdb_id: string }>();

  const getVideoId = (url: string) => {
    const parts = url.split("/embed/");
    return parts.length > 1 ? parts[1] : undefined;
  };
  const [movie, setMovie] = useState<MovieFromAPIType>();
  useEffect(() => {
    if (params.imdb_id) {
      MoviesDatabaseService.getMovie(params.imdb_id).then((response) => {
        setMovie(response.data.results);
        console.log(response.data.results.gen);
      });
    }
  }, [params.imdb_id]);
  useLoggedOut();

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            component="img"
            src={movie?.banner}
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
              {movie?.gen.map((category, index) => (
                <Typography key={category.genre}>
                  {category.genre}
                  {index != movie.gen.length - 1 && "/"}
                </Typography>
              ))}
            </Box>

            <Typography>Content Rating: {movie?.content_rating}</Typography>
            <Typography>Movie Length: {movie?.movie_length} minutes</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconBxlImdb style={{ fontSize: 50 }} />
              <Typography variant="h6">{movie?.rating}/10</Typography>
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
              videoId={getVideoId(movie.trailer)}
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
    </Container>
  );
};

export default AdminDetailedMovie;
