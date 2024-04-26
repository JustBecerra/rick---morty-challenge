import { CharactersType } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import HelpIcon from "@mui/icons-material/Help";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";

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

  const renderIcon = () => {
    if (status === "Alive") {
      return <FavoriteIcon fontSize="small" />;
    } else if (status === "Dead") {
      return <HeartBrokenIcon fontSize="small" />;
    } else {
      return <HelpIcon fontSize="small" />;
    }
  };
  return (
    <div
      className={`flex w-[90%] h-[100px] xl:w-[45%] rounded-lg md:h-[150px] border-2 border-gray-50 m-2 cursor-pointer ${
        chosenCharacter && chosenCharacter.id === id && "bg-gray-50"
      }`}
      onClick={characterSelection}
    >
      <div className="w-[30%] md:w-[50%] h-[100%] relative">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center w-[70%] md:w-[50%]">
        <h1
          className={`text-sm md:text-xs text-wrap text-balance text-center ${
            chosenCharacter && chosenCharacter.id === id && "text-black"
          }`}
        >
          {name}
        </h1>
        <div className="flex gap-2 w-[100%] flex-col  justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <div className="flex justify-center items-center">
              {renderIcon()}
            </div>
            <h3
              className={`text-xs text-center mr-2 ${
                chosenCharacter && chosenCharacter.id === id && "text-black"
              }`}
            >
              {status}
            </h3>
          </div>
          <h3
            className={`text-xs text-center text-wrap ${
              chosenCharacter && chosenCharacter.id === id && "text-black"
            }`}
          >
            {species}
          </h3>
        </div>
      </div>
    </div>
  );
};
