"use client";
import { CharacterList } from "@/components/CharacterList";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Header } from "@/components/Header";
import RandMContext from "@/context/RandMContext";
import { EpisodesType } from "@/types";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [sharedEpisodes, setSharedEpisodes] = useState<EpisodesType[]>([]);
  const [episodes1, setEpisodes1] = useState<EpisodesType[]>([]);
  const [episodes2, setEpisodes2] = useState<EpisodesType[]>([]);
  const {
    characters,
    episodes,
    setCharacter1,
    setCharacter2,
    character1,
    character2,
  } = useContext(RandMContext);
  useEffect(() => {
    const filteredIds1 = character1?.episode.map((ep) =>
      Number(ep[ep.length - 1])
    );
    const filteredEpisodes1 = episodes.filter((ep) => {
      if (filteredIds1?.includes(ep.id)) {
        return ep;
      }
    });
    setEpisodes1(filteredEpisodes1);

    const filteredIds2 = character2?.episode.map((ep) =>
      Number(ep[ep.length - 1])
    );
    const filteredEpisodes2 = episodes.filter((ep) => {
      if (filteredIds2?.includes(ep.id)) {
        return ep;
      }
    });
    setEpisodes2(filteredEpisodes2);
  }, [character1, character2, episodes]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />
      <div className="flex w-[80%] h-[50%] gap-4">
        <CharacterList
          characters={characters}
          chosenCharacter={character1}
          setCharacter={setCharacter1}
        />
        <CharacterList
          characters={characters}
          chosenCharacter={character2}
          setCharacter={setCharacter2}
        />
      </div>
      <div className="flex w-[100%] h-[50%] justify-center gap-4">
        <EpisodeCard episodes={episodes1} />
        <EpisodeCard episodes={episodes} />
        <EpisodeCard episodes={episodes2} />
      </div>
    </main>
  );
}
