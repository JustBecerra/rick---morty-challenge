"use client";
import { charactersType } from "@/types";
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CharacterProps {
  character1: charactersType | null;
  character2: charactersType | null;
  setCharacter1: Dispatch<SetStateAction<charactersType | null>>;
  setCharacter2: Dispatch<SetStateAction<charactersType | null>>;
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
  return (
    <CharacterContext.Provider
      value={{
        character1,
        setCharacter1,
        character2,
        setCharacter2,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterProps => {
  const { character1, setCharacter1, character2, setCharacter2 } =
    useContext(CharacterContext);
  return {
    character1,
    setCharacter1,
    character2,
    setCharacter2,
  };
};

export default CharacterContext;
