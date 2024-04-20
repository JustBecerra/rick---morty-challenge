import Image from "next/image";

type CardProps = {
  name: string;
  image: string;
  species: string;
  status: string;
};

export const CharacterCard = (props: CardProps) => {
  const { name, image, species, status } = props;
  return (
    <div className="flex w-[45%] h-[150px] border-2 border-gray-50 m-2">
      <div className="w-[50%] h-[100%] relative">
        <Image src={image} alt="" fill />
      </div>
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1 className="text-sm text-balance text-center">{name}</h1>
        <div className="flex gap-2">
          <h3 className="text-xs">{species}</h3>
          <h3 className="text-xs">{status}</h3>
        </div>
      </div>
    </div>
  );
};
