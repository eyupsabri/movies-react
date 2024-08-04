import { MovieType } from "../types/Movie.type";
import { MovieAddType } from "../types/MovieAdd.type";
import { MovieReviewAddType } from "../types/MovieReviewAdd.type";
import BaseService from "./BaseService";

class MovieWithAuthService extends BaseService {
  constructor() {
    super("https://localhost:7209/api");
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
