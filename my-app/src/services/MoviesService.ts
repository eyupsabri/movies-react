import { MovieType } from "../types/Movie.type";
import { MovieDetailedType } from "../types/MovieDetailed.type";
import { MovieFilterType } from "../types/MovieFilter.type";
import BaseService from "./BaseService";

class MoviesService extends BaseService {
  constructor() {
    super("https://localhost:7209/api/Movies");
  }
  public async getMovies(filter: MovieFilterType) {
    return this.getWithData<MovieType[]>("", filter);
  }

  public async getMovieByID(id: string) {
    return this.get<MovieDetailedType>("/" + id);
  }
}

export default new MoviesService();
