import { Genre } from "../enums/Genre.enum";

export type MovieAddType = {
  id: string;
  imdBstar: number;
  title: string;
  year: number;
  description: string;
  contentRating: string;
  trailerURL: string;
  imageURL: string;
  bannerURL: string;
  movieLength: number;
  plot: string;
  genre: number[];
};
