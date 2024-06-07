import { Box, Container, useTheme } from "@mui/material";
import MovieFilter from "../../../components/movieFilter/movieFilter.component";
import Movies from "../../../components/movies/movies.component";
import { useStyles } from "./admin.home.styles";

const AdminHome = () => {
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

export default AdminHome;
