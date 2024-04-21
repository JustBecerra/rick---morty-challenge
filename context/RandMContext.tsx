"use client";
import { GET as GETCHARACTER } from "@/app/api/characters/route";
import { GET as GETEPISODE } from "@/app/api/episodes/route";
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
  const [pages, setPages] = useState(1);
  const [episodes, setEpisodes] = useState<EpisodesType[]>([]);
  const fetchCharacters = async () => {
    try {
      const response = await GETCHARACTER();
      const data = await response.json();
      setCharactersList1(data.results);
      setCharactersList2(data.results);
      setPages(data.info.pages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await GETEPISODE();
      const data = await response.json();
      setEpisodes(data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchEpisodes();
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
  };
};

export default RandMContext;
