"use client";
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
  characters: CharactersType[];
  setCharacters: Dispatch<SetStateAction<CharactersType[]>>;
  episodes: EpisodesType[];
  setEpisodes: Dispatch<SetStateAction<EpisodesType[]>>;
}

const RandMContext = createContext<RandMProps>({} as RandMProps);

type RandMProviderProps = {
  children: ReactElement;
};

export const RandMProvider: React.FC<RandMProviderProps> = ({ children }) => {
  const [character1, setCharacter1] = useState<CharactersType | null>(null);
  const [character2, setCharacter2] = useState<CharactersType | null>(null);
  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [episodes, setEpisodes] = useState<EpisodesType[]>([]);
  const fetchCharacters = async () => {
    try {
      const response = await fetch("/api/characters");
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await fetch("/api/episodes");
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
        characters,
        setCharacters,
        episodes,
        setEpisodes,
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
    characters,
    setCharacters,
    episodes,
    setEpisodes,
  } = useContext(RandMContext);
  return {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
    characters,
    setCharacters,
    episodes,
    setEpisodes,
  };
};

export default RandMContext;
