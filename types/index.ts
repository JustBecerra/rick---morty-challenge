type originandlocationType = {
  name: string;
  url: string;
};

export type CharactersType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: originandlocationType;
  location: originandlocationType;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type EpisodesType = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type ApiResponseFormat<T> = {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string | null;
  };
  results: T[];
};
