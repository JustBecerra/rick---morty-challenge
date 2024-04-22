import { CharactersType } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type CardProps = {
  char: CharactersType;
  setCharacter: Dispatch<SetStateAction<CharactersType | null>>;
  chosenCharacter: CharactersType | null;
};

export const CharacterCard = (props: CardProps) => {
  const { name, image, species, status, id } = props.char;
  const { setCharacter, chosenCharacter } = props;

  const characterSelection = () => {
    if (chosenCharacter && chosenCharacter.id === id) {
      setCharacter(null);
    } else {
      setCharacter(props.char);
    }
  };
  return (
    <div
      className={`flex w-[90%] h-[100px] md:w-[45%] md:h-[150px] border-2 border-gray-50 m-2 cursor-pointer ${
        chosenCharacter && chosenCharacter.id === id && "bg-gray-50"
      }`}
      onClick={characterSelection}
    >
      <div className="w-[30%] md:w-[50%] h-[100%] relative">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1
          className={`text-sm text-balance text-center ${
            chosenCharacter && chosenCharacter.id === id && "text-black"
          }`}
        >
          {name}
        </h1>
        <div className="flex gap-2">
          <h3
            className={`text-xs ${
              chosenCharacter && chosenCharacter.id === id && "text-black"
            }`}
          >
            {species}
          </h3>
          <h3
            className={`text-xs ${
              chosenCharacter && chosenCharacter.id === id && "text-black"
            }`}
          >
            {status}
          </h3>
        </div>
      </div>
    </div>
  );
};
