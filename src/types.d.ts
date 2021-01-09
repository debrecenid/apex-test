export type MovieType = {
  id: string;
  keywords: KeyWord[];
  name: string;
  score: number;
  status: string;
  socialMedia: { imdb: string };
  votes: number;
};

export type KeyWord = {
  name: string;
  id: string;
};
