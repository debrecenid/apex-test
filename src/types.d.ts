export type MovieType = {
  id: string;
  keywords: KeyWord[];
  name: string;
  score: number;
  budget: number;
  socialMedia: { imdb: string };
  poster: { original: string };
  votes: number;
  releaseDate: string;
};

export type KeyWord = {
  name: string;
  id: string;
};
