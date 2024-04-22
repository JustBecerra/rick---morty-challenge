import { CharactersType } from "@/types";
import { CharacterCard } from "../CharacterCard";
import { Dispatch, SetStateAction, useContext } from "react";
import RandMContext from "@/context/RandMContext";
import Pagination from "@mui/material/Pagination/Pagination";

type CharactersProps = {
  characters: CharactersType[];
  setCharacter: Dispatch<SetStateAction<CharactersType | null>>;
  chosenCharacter: CharactersType | null;
  setCharacters: Dispatch<SetStateAction<CharactersType[]>>;
};

export const CharacterList = (props: CharactersProps) => {
  const { pages } = useContext(RandMContext);
  const { characters, setCharacters, setCharacter, chosenCharacter } = props;

  const handlePagination = async (e: React.ChangeEvent<any>, value: number) => {
    e.preventDefault();
    const response = await fetch(`api/page?number=${value}`);
    const data = await response.json();
    setCharacters(data.results);
  };
  return (
    <div className="w-[100%] h-[50vh] md:w-[50%] border-2 border-gray-50 flex  items-center justify-center flex-wrap overflow-auto">
      {characters.map((char, key) => (
        <CharacterCard
          key={key}
          char={char}
          chosenCharacter={chosenCharacter}
          setCharacter={setCharacter}
        />
      ))}
      <div className="flex items-center justify-center h-[12%] w-[90%] md:h-[8%] md:w-[50%] bg-zinc-50 rounded-xl mb-2">
        <Pagination
          count={pages}
          variant="outlined"
          shape="rounded"
          color="primary"
          size="small"
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};
