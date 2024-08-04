import { Box, Button, Slide, Typography, useTheme } from "@mui/material";
import { useStyles } from "./onMouseOverMovie.styles";
import { Link } from "react-router-dom";
import { useRef } from "react";

type OnMouseOverMovieProps = {
  movieCategories: string[];
  rating: number;
  id: string;
  slideAnimation: boolean;
  type: "default" | "addMovie";
};

const OnMouseOverMovie = ({
  movieCategories,
  rating,
  id,
  slideAnimation,
  type,
}: OnMouseOverMovieProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <Box sx={classes.container} ref={boxRef}>
      <Box>
        <Typography variant="h5" color={"white"} textAlign={"center"}>
          IMDB Rating
        </Typography>
        <Typography variant="h5" color={"white"} textAlign={"center"}>
          {rating}
        </Typography>
      </Box>
      <Box>
        {movieCategories?.map((category, index) => {
          if (index <= 1)
            return (
              <Typography variant="h5" color={"white"} textAlign={"center"}>
                {category}
              </Typography>
            );
        })}
      </Box>
      <Slide
        direction="up"
        in={slideAnimation}
        mountOnEnter
        unmountOnExit
        container={boxRef.current}
        timeout={500}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={type === "addMovie" ? `/admin/movies/${id}` : `/movies/${id}`}
        >
          View
        </Button>
      </Slide>
    </Box>
  );
};

export default OnMouseOverMovie;
