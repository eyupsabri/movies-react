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
  Grow,
  Box,
  Fade,
} from "@mui/material";
import { useStyles } from "./movies.styles";
import { MovieType } from "../../types/Movie.type";
import { Link } from "react-router-dom";
import { useState } from "react";
import VizSensor from "react-visibility-sensor";
import OnMouseOverMovie from "../onMouseOverMovie/onMouseOverMovie.component";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import MovieWithAuthService from "../../services/MovieWithAuthService";

type MoviesProps = {
  movies: MovieType[];
  type: "addMovie" | "default";
  handleRefresh?: () => void;
};

const Movies = ({ movies, type, handleRefresh }: MoviesProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [active, setActive] = useState<boolean[]>(new Array(12).fill(false));
  const [isHovered, setIsHovered] = useState<boolean[]>(
    new Array(12).fill(false)
  );
  //const isAdmin = useSelector<RootState>((state) => state.auth.isAdmin);
  const handleMouseOver = (index: number) => {
    const newHovered = new Array(12).fill(false);
    newHovered[index] = true;
    setIsHovered(newHovered);
  };

  const handleMouseOut = (index: number) => {
    setIsHovered(new Array(12).fill(false));
  };
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);

  const deleteMovie = async (id: string) => {
    await MovieWithAuthService.deleteMovie(id).then((response) => {
      if (response.status === 200) handleRefresh && handleRefresh();
    });
  };
  return (
    <Container sx={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {movies?.map((movie, index) => (
          <VizSensor
            onChange={(isVisible: any) => {
              if (!active[index] && isVisible) {
                const newActive = active.map((value, index2) => {
                  if (index >= index2) return true;
                  else return false;
                });

                setActive(newActive);
              }
            }}
          >
            <Grow in={active[index]} timeout={1000}>
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card sx={classes.card}>
                  <CardMedia
                    sx={classes.cardMedia}
                    image={movie.bannerURL}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() => handleMouseOut(index)}
                  >
                    <Fade in={isHovered[index]}>
                      <Box sx={classes.onMouseOver}>
                        <OnMouseOverMovie
                          movieCategories={movie.movieCategories}
                          rating={movie.imdBstar}
                          id={movie.id}
                          slideAnimation={isHovered[index]}
                          type={type}
                        />
                      </Box>
                    </Fade>
                  </CardMedia>
                  <CardContent sx={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                      {movie.title}
                    </Typography>
                    <Typography>{movie.plot}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      component={Link}
                      size="small"
                      color="primary"
                      to={
                        type === "addMovie"
                          ? `/admin/movies/${movie.id}`
                          : `/movies/${movie.id}`
                      }
                    >
                      View
                    </Button>
                    {isAdmin && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </Grow>
          </VizSensor>
        ))}
      </Grid>
    </Container>
  );
};

export default Movies;
