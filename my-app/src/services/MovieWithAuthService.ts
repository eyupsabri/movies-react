import { MovieType } from "../types/Movie.type";
import { MovieAddType } from "../types/MovieAdd.type";
import { MovieReviewAddType } from "../types/MovieReviewAdd.type";
import BaseService from "./BaseService";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

class MovieWithAuthService extends BaseService {
  constructor() {
    super(apiUrl + "api");
  }

  public async addMovieReview(review: MovieReviewAddType) {
    return this.post("/MovieReviews/AddReview", review);
  }

  public async adminAddMovie(movieToAdd: MovieAddType) {
    return this.post("/Admin/AddMovie", movieToAdd);
  }
  public async deleteMovieReview(reviewId: string) {
    return this.delete(`/MovieReviews/DeleteReview/${reviewId}`);
  }
  public async deleteMovie(reviewId: string) {
    return this.delete(`/Admin/DeleteMovie/${reviewId}`);
  }
}

export default new MovieWithAuthService();
