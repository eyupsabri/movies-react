import axios from "axios";
import { MovieDetailedType } from "../types/MovieDetailed.type";
import { MovieFilterType } from "../types/MovieFilter.type";
import { PagedMovieListType } from "../types/PagedMovieList.type";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

class MoviesService {
  private api = axios.create({
    baseURL: apiUrl + "api/Movies",
  });

  public async getMovies(filter: MovieFilterType, pageIndex: number) {
    return this.api.get<PagedMovieListType>("", {
      params: { ...filter, pageIndex: pageIndex },
    });
  }

  public async getMovieByID(id: string) {
    return this.api.get<MovieDetailedType>("/" + id);
  }
  public async getMoviesWithQuery(query: string) {
    return this.api.get<PagedMovieListType>("/?" + query);
  }
}

export default new MoviesService();
