"use client";
import { GET as GETCHARACTER } from "@/app/api/characters/route";
import { CharactersType, EpisodesType } from "@/types";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface RandMProps {
  character1: CharactersType | null;
  character2: CharactersType | null;
  setCharacter1: Dispatch<SetStateAction<CharactersType | null>>;
  setCharacter2: Dispatch<SetStateAction<CharactersType | null>>;
  charactersList1: CharactersType[];
  charactersList2: CharactersType[];
  setCharactersList1: Dispatch<SetStateAction<CharactersType[]>>;
  setCharactersList2: Dispatch<SetStateAction<CharactersType[]>>;
  episodes: EpisodesType[];
  setEpisodes: Dispatch<SetStateAction<EpisodesType[]>>;
  pages: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const RandMContext = createContext<RandMProps>({} as RandMProps);

type RandMProviderProps = {
  children: ReactElement;
};

export const RandMProvider: React.FC<RandMProviderProps> = ({ children }) => {
  const [character1, setCharacter1] = useState<CharactersType | null>(null);
  const [character2, setCharacter2] = useState<CharactersType | null>(null);
  const [charactersList1, setCharactersList1] = useState<CharactersType[]>([]);
  const [charactersList2, setCharactersList2] = useState<CharactersType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodesType[]>([]);
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await GETCHARACTER();
      const data = await response.json();
      setCharactersList1(data.results);
      setCharactersList2(data.results);
      setPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const fetchEpisodes = async (page: number) => {
    try {
      const response = await fetch(`api/episodes?number=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const fetchAllEpisodes = async () => {
    let allEpisodes: EpisodesType[] = [];
    let page = 1;
    let episodes = [];

    while (page <= 3) {
      episodes = await fetchEpisodes(page);
      allEpisodes = [...allEpisodes, ...episodes.results];
      page++;
    }

    setEpisodes(allEpisodes);
  };

  useEffect(() => {
    fetchCharacters();
    fetchAllEpisodes();
  }, []);
  return (
    <RandMContext.Provider
      value={{
        character1,
        setCharacter1,
        character2,
        setCharacter2,
        charactersList1,
        charactersList2,
        setCharactersList1,
        setCharactersList2,
        episodes,
        setEpisodes,
        pages,
        loading,
        setLoading,
      }}
    >
      {children}
    </RandMContext.Provider>
  );
};

export const useRandMContext = (): RandMProps => {
  const {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
    charactersList1,
    charactersList2,
    setCharactersList1,
    setCharactersList2,
    episodes,
    setEpisodes,
    pages,
    loading,
    setLoading,
  } = useContext(RandMContext);
  return {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
    charactersList1,
    charactersList2,
    setCharactersList1,
    setCharactersList2,
    episodes,
    setEpisodes,
    pages,
    loading,
    setLoading,
  };
};

export default RandMContext;
