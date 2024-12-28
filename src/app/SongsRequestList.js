
export default function SongRequestList({ songRequests }) {

  return (
    <div className="w-full mt-4">
      <h3 className="text-xl font-medium text-gray-800 mb-2">Requested Songs</h3>
      <ul className="w-full border border-gray-300 rounded-md shadow-md bg-white">
        {songRequests.map((song) => (
          <li
            key={song.id}
            className="py-2 px-4 border-b last:border-none flex justify-between items-center"
          >
            <span>
              <strong>{song.title}</strong> by {song.artist}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    fontSize: "18px",
    borderBottom: "1px solid #ccc",
  },
};