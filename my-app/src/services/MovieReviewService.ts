import { MovieReviewAddType } from "../types/MovieReviewAdd.type";
import BaseService from "./BaseService";

class MovieReviewService extends BaseService {
  constructor() {
    super("https://localhost:7209/api/MovieReviews");
  }

  public async addMovieReview(review: MovieReviewAddType) {
    return this.post("/addReview", review);
  }
}

export default new MovieReviewService();
