import { CharacterList } from "@/components/CharacterList";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="flex w-[80%] h-[50%] gap-4">
        <CharacterList />
        <CharacterList />
      </div>
    </main>
  );
}
