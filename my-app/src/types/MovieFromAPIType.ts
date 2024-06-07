export type MovieFromAPIType = {
  imdb_id: string;
  title: string;
  year: number;
  description: string;
  content_rating: string;
  movie_length: number;
  rating: number;
  trailer: string;
  image_url: string;
  gen: { id: number; genre: string }[];
  banner: string;
  plot: string;
};
