import { CharactersType } from "@/types";
import { CharacterCard } from "../CharacterCard";
import { Dispatch, SetStateAction } from "react";

type CharactersProps = {
  characters: CharactersType[];
  setCharacter: Dispatch<SetStateAction<CharactersType | null>>;
  chosenCharacter: CharactersType | null;
};

export const CharacterList = (props: CharactersProps) => {
  const { characters, setCharacter, chosenCharacter } = props;
  return (
    <div className="w-[50%] h-[50vh] border-2 border-gray-50 flex flex-row items-center justify-center flex-wrap overflow-auto">
      {characters.map((char, key) => (
        <CharacterCard
          key={key}
          char={char}
          chosenCharacter={chosenCharacter}
          setCharacter={setCharacter}
        />
      ))}
    </div>
  );
};
