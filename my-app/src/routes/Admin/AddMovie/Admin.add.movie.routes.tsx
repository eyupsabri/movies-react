import { Container, Grid, Pagination, useTheme } from "@mui/material";
import AdminMovieFilter from "../../../components/adminMovieFilter/adminMovieFilter.component";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import MovieCard from "../../../components/movieCard/movieCard.component";
import { useState } from "react";
import { useStyles } from "./Admin.add.movie.styles";
import useLoggedOut from "../../../hooks/useLoggedOut";

const AdminAddMovie = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const movieIds = useSelector(
    (state: RootState) => state.adminAddMovies.movies
  );

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const paginatedMovies = movieIds.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  useLoggedOut();

  return (
    <>
      <Container maxWidth="sm">
        <AdminMovieFilter />
      </Container>
      <Container sx={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {paginatedMovies.map((movie) => (
            <MovieCard key={movie.imdb_id} movieID={movie.imdb_id} />
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(movieIds.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          size="large"
          sx={{ mt: 5, justifyContent: "center", display: "flex" }}
        />
      </Container>
    </>
  );
};
export default AdminAddMovie;
