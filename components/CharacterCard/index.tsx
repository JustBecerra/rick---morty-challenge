import Image from "next/image";

export const CharacterCard = () => {
  return (
    <div className="flex">
      <div className="w-[50%] h-[100%]">{/* <Image /> */}</div>
      <div>
        <h1>Name</h1>
        <div className="flex">
          <h3>Species</h3>
          <h3>Status</h3>
        </div>
      </div>
    </div>
  );
};
