import { Box, Button, Typography, useTheme } from "@mui/material";
import { useStyles } from "./onMouseOverMovie.styles";
import { Link } from "react-router-dom";

type OnMouseOverMovieProps = {
  movieCategories: string[];
  rating: number;
  id: string;
};

const OnMouseOverMovie = ({
  movieCategories,
  rating,
  id,
}: OnMouseOverMovieProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "70%",
      }}
    >
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
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/movies/${id}`}
      >
        View
      </Button>
    </Box>
  );
};

export default OnMouseOverMovie;
