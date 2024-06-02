import { Container, Box, useTheme } from "@mui/material";
import Movies from "../../components/movies/movies.component";
import { useStyles } from "./Home.styles";
import MovieFilter from "../../components/movieFilter/movieFilter.component";

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <>
      <Box sx={classes.container}>
        <Container maxWidth="sm">
          <MovieFilter />
        </Container>
      </Box>
      <Movies />
    </>
  );
};

export default Home;
