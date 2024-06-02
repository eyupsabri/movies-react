import { MovieType } from "./Movie.type";
import { MovieReviewType } from "./MovieReview.type";

export type MovieDetailedType = {
  reviews: MovieReviewType[];
  movieCategories: string[];
} & MovieType;
