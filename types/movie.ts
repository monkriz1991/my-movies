export interface IMovie {
  id: number;
  title: string;
  issue_date: string;
  genre: string;
  rating: number;
  link: string;
  movie_id: string;
  poster: string;
  description: string;
}
export interface IMovieProps {
  movies: IMovie;
}
export interface IFormProps {
  idItem: number | null;
}
