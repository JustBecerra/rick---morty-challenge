import { charactersType } from "@/types";
import { CharacterCard } from "../CharacterCard";

type CharactersProps = {
  characters: charactersType[];
};

export const CharacterList = (props: CharactersProps) => {
  const { characters } = props;
  return (
    <div className="w-[50%] h-[50vh] border-2 border-gray-50 flex flex-row items-center justify-center flex-wrap overflow-auto">
      {characters.map((char, key) => (
        <CharacterCard
          key={key}
          name={char.name}
          species={char.species}
          image={char.image}
          status={char.status}
        />
      ))}
    </div>
  );
};
