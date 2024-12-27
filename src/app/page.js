import SongRequestSearch from "./SongRequestSearch";

export default function Home() {
  return (
    <div className="text-center py-8 flex justify-center min-h-screen">
      <div className="w-full max-w-2xl">
        <SongRequestSearch />
      </div>
    </div>  
  );
}
