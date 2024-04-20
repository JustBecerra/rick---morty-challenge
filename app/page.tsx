"use client";
import { CharacterList } from "@/components/CharacterList";
import { Header } from "@/components/Header";
import CharacterContext from "@/context/CharacterContext";
import { useContext } from "react";

export default function Home() {
  const { characters } = useContext(CharacterContext);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex w-[80%] h-[50%] gap-4">
        <CharacterList characters={characters} />
        <CharacterList characters={characters} />
      </div>
    </main>
  );
}
