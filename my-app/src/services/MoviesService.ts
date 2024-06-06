import axios from "axios";
import { MovieType } from "../types/Movie.type";
import { MovieDetailedType } from "../types/MovieDetailed.type";
import { MovieFilterType } from "../types/MovieFilter.type";
import BaseService from "./BaseService";

class MoviesService {
  private api = axios.create({
    baseURL: "https://localhost:7209/api/Movies",
  });

  public async getMovies(filter: MovieFilterType) {
    return this.api.get<MovieType[]>("", { params: filter });
  }

  public async getMovieByID(id: string) {
    return this.api.get<MovieDetailedType>("/" + id);
  }
}

export default new MoviesService();
