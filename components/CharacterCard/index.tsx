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
    <div className="flex w-[200px] h-[200px] border-2 border-gray-50">
      <div className="w-[50%] h-[100%] relative">
        <Image src={image} alt="" fill />
      </div>
      <div>
        <h1>{name}</h1>
        <div className="flex">
          <h3>{species}</h3>
          <h3>{status}</h3>
        </div>
      </div>
    </div>
  );
};
