type originandlocationType = {
  name: string;
  url: string;
};

export type charactersType = {
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
