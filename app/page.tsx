"use client";
import { CharacterList } from "@/components/CharacterList";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Header } from "@/components/Header";
import RandMContext from "@/context/RandMContext";
import { EpisodesType } from "@/types";
import { useContext, useEffect, useState } from "react";

interface renderEpisodesType {
  episodes1: EpisodesType[];
  episodes2: EpisodesType[];
  sharedEpisodes: EpisodesType[];
}

export default function Home() {
  const [renderEpisodes, setRenderEpisodes] = useState<renderEpisodesType>({
    episodes1: [],
    episodes2: [],
    sharedEpisodes: [],
  });

  const {
    charactersList1,
    charactersList2,
    setCharactersList1,
    setCharactersList2,
    episodes,
    setCharacter1,
    setCharacter2,
    character1,
    character2,
  } = useContext(RandMContext);

  useEffect(() => {
    const filteredEpisodes1 = episodes.filter((ep) =>
      character1?.episode.some((episodeId) => {
        const lastIndex = episodeId.lastIndexOf("/");
        const result = episodeId.substring(lastIndex + 1);
        return Number(result) === ep.id;
      })
    );

    const filteredEpisodes2 = episodes.filter((ep) =>
      character2?.episode.some((episodeId) => {
        const lastIndex = episodeId.lastIndexOf("/");
        const result = episodeId.substring(lastIndex + 1);
        return Number(result) === ep.id;
      })
    );

    const sharedEpisodes = filteredEpisodes1.filter((ep1) =>
      filteredEpisodes2.some((ep2) => ep1.id === ep2.id)
    );

    const filteredEpisodes1WithoutShared = filteredEpisodes1.filter(
      (ep1) => !sharedEpisodes.some((sharedEp) => sharedEp.id === ep1.id)
    );

    const filteredEpisodes2WithoutShared = filteredEpisodes2.filter(
      (ep2) => !sharedEpisodes.some((sharedEp) => sharedEp.id === ep2.id)
    );
    setRenderEpisodes((prev) => ({
      ...prev,
      episodes1: filteredEpisodes1WithoutShared,
      episodes2: filteredEpisodes2WithoutShared,
      sharedEpisodes: sharedEpisodes,
    }));
  }, [character1, character2]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4">
      <Header />
      <div className="flex w-[80%] h-[50%] gap-4 flex-col md:flex-row justify-center items-center">
        <CharacterList
          characters={charactersList1}
          setCharacters={setCharactersList1}
          chosenCharacter={character1}
          setCharacter={setCharacter1}
        />
        <CharacterList
          characters={charactersList2}
          setCharacters={setCharactersList2}
          chosenCharacter={character2}
          setCharacter={setCharacter2}
        />
      </div>
      {character1 && character2 && (
        <div className="flex w-[100%] h-[50%] justify-center gap-4 flex-col md:flex-row justify-center items-center">
          <EpisodeCard
            episodes={renderEpisodes.episodes1}
            title={`Character #${character1.id} - Only Episodes`}
          />
          <EpisodeCard
            episodes={renderEpisodes.sharedEpisodes}
            title={`Characters #${character1.id} & #${character2.id} - Shared Episodes`}
          />
          <EpisodeCard
            episodes={renderEpisodes.episodes2}
            title={`Character #${character2.id} - Only Episodes`}
          />
        </div>
      )}
    </main>
  );
}
