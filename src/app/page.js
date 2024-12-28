import SongRequestSearch from "./SongRequestSearch";

export default function Home() {
  return (
    <div className="text-center py-8 flex flex-col items-center min-h-screen bg-slate-200">
      <div className="w-full max-w-4xl">
        <div className="text-center pb-8">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-gradient-text mb-8 sm:text-6xl">
            DJ Requests
          </h1>
        </div>
        <div className="flex flex-col items-center w-full max-w-lg">
        <SongRequestSearch />
        </div>
      </div>
    </div>
  );
}