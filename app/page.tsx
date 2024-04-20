"use client";
import { CharacterList } from "@/components/CharacterList";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Header } from "@/components/Header";
import RandMContext from "@/context/RandMContext";
import { useContext } from "react";

export default function Home() {
  const { characters, episodes } = useContext(RandMContext);
  console.log({ episodes });
  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />
      <div className="flex w-[80%] h-[50%] gap-4">
        <CharacterList characters={characters} />
        <CharacterList characters={characters} />
      </div>
      <div className="flex w-[100%] h-[50%] justify-center gap-4">
        <EpisodeCard episodes={episodes} />
        <EpisodeCard episodes={episodes} />
        <EpisodeCard episodes={episodes} />
      </div>
    </main>
  );
}
