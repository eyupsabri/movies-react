import axios, { AxiosResponse } from "axios";
import { MoviesAPIFilterResponseType } from "../types/MoviesAPIFilterResponse.type";
import { MovieFromAPIType } from "../types/MovieFromAPIType";

class MoviesDatabaseService {
  private api = axios.create({
    baseURL: "https://moviesminidatabase.p.rapidapi.com",
    headers: {
      "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
      "x-rapidapi-key": "497e13a5e2msh23079e35519693dp1a9122jsn4cc5a77abbb9",
    },
  });
  private static movieCache: MovieFromAPIType[] = [];

  public async getMoviesByTitle(
    title: string
  ): Promise<AxiosResponse<{ results: [MoviesAPIFilterResponseType] }>> {
    return this.api.get(`/movie/imdb_id/byTitle/${title}`);
  }
  public async getMovie(
    imdb_id: string
  ): Promise<
    | AxiosResponse<{ results: MovieFromAPIType }>
    | { data: { results: MovieFromAPIType } }
  > {
    const cachedMovie = MoviesDatabaseService.movieCache.find(
      (movie) => movie.imdb_id === imdb_id
    );
    if (cachedMovie) {
      console.log("Movie found in cache");
      return Promise.resolve({ data: { results: cachedMovie } });
    }
    const response = await this.api.get(`/movie/id/${imdb_id}`);
    MoviesDatabaseService.movieCache.unshift(response.data.results);
    if (MoviesDatabaseService.movieCache.length > 12) {
      MoviesDatabaseService.movieCache.pop();
    }
    return response;
  }
}

export default new MoviesDatabaseService();
