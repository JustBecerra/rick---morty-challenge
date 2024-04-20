"use client";
import { charactersType } from "@/types";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CharacterProps {
  character1: charactersType | null;
  character2: charactersType | null;
  setCharacter1: Dispatch<SetStateAction<charactersType | null>>;
  setCharacter2: Dispatch<SetStateAction<charactersType | null>>;
  characters: charactersType[];
  setCharacters: Dispatch<SetStateAction<charactersType[]>>;
}

const CharacterContext = createContext<CharacterProps>({} as CharacterProps);

type CharacterProviderProps = {
  children: ReactElement;
};

export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [character1, setCharacter1] = useState<charactersType | null>(null);
  const [character2, setCharacter2] = useState<charactersType | null>(null);
  const [characters, setCharacters] = useState<charactersType[]>([]);
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

  useEffect(() => {
    fetchCharacters();
  }, []);
  return (
    <CharacterContext.Provider
      value={{
        character1,
        setCharacter1,
        character2,
        setCharacter2,
        characters,
        setCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterProps => {
  const {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
    characters,
    setCharacters,
  } = useContext(CharacterContext);
  return {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
    characters,
    setCharacters,
  };
};

export default CharacterContext;
