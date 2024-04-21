import { EpisodesType } from "@/types";

type episodesProps = {
  episodes: EpisodesType[];
  title: string;
};

export const EpisodeCard = (props: episodesProps) => {
  const { episodes, title } = props;
  return (
    <div className="flex flex-col w-[30%] h-[300px] border-2 border-gray-50">
      <div className="border-2 border-gray-50">
        <h1>{title}</h1>
      </div>
      <div className="flex flex-col overflow-auto">
        {episodes.map((episode, key) => (
          <h2 className="text-sm italic" key={key}>
            {episode.episode} - {episode.name} - {episode.air_date}
          </h2>
        ))}
      </div>
    </div>
  );
};
