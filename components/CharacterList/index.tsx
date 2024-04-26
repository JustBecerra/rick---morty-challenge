import { CharactersType } from "@/types";
import { CharacterCard } from "../CharacterCard";
import { Dispatch, SetStateAction, useContext } from "react";
import RandMContext from "@/context/RandMContext";
import Pagination from "@mui/material/Pagination/Pagination";
import { CircularProgress } from "@mui/material";

type CharactersProps = {
  characters: CharactersType[];
  setCharacter: Dispatch<SetStateAction<CharactersType | null>>;
  chosenCharacter: CharactersType | null;
  setCharacters: Dispatch<SetStateAction<CharactersType[]>>;
  loader: boolean;
  setLoader: Dispatch<SetStateAction<boolean>>;
};

export const CharacterList = (props: CharactersProps) => {
  const { pages } = useContext(RandMContext);
  const {
    characters,
    setCharacters,
    setCharacter,
    chosenCharacter,
    loader,
    setLoader,
  } = props;

  const handlePagination = async (e: React.ChangeEvent<any>, value: number) => {
    e.preventDefault();
    setLoader(true);
    const response = await fetch(`api/page?number=${value}`);
    const data = await response.json();
    setCharacters(data.results);
    setLoader(false);
  };
  return (
    <div className="w-[90%] h-[50vh] md:w-[45.5%] border-2 border-gray-50 flex rounded-lg items-center justify-center flex-wrap overflow-auto mb-4 md:mb-0 relative">
      {loader || characters.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        characters.map((char, key) => (
          <CharacterCard
            key={key}
            char={char}
            chosenCharacter={chosenCharacter}
            setCharacter={setCharacter}
          />
        ))
      )}
      {characters.length > 0 && !loader && (
        <div className="flex sticky bottom-2 items-center justify-center h-fit w-fit p-2 bg-zinc-50 rounded-xl mb-2">
          <Pagination
            count={pages}
            variant="outlined"
            shape="rounded"
            color="primary"
            size="small"
            onChange={handlePagination}
          />
        </div>
      )}
    </div>
  );
};
