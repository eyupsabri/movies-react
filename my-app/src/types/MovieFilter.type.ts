import { Genre } from "../enums/Genre.enum";
import { Year } from "../enums/Year.enum";

export type MovieFilterType = {
  Title?: string;
  year: Year;
  imdBstar: string;
  sortBy: "imdbStar" | "year";
  sortAsc?: boolean;
  genre: Genre;
  userRating: string;
};
