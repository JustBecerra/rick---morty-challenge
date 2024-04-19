"use client";
import CharacterContext from "@/context/CharacterContext";
import { CharacterCard } from "../CharacterCard";
import { useContext } from "react";

export const CharacterList = () => {
  const { characters } = useContext(CharacterContext);
  console.log({ characters });
  return (
    <div className="w-[50%] h-[40%] border-2 border-gray-50">
      <CharacterCard />
    </div>
  );
};
