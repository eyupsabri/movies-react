import { MovieType } from "./Movie.type";

export type PagedMovieListType = {
  pageCount: number;
  pageIndex: number;
  movies: MovieType[];
};
