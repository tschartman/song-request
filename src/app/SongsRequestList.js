import { useState } from 'react';

export default function SongRequestList({ songRequests, onSongDeleted }) {
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDelete = async (songId) => {
    // Prevent multiple delete attempts
    if (deletingIds.has(songId)) return;

    setDeletingIds(prev => new Set(prev).add(songId));

    try {
      const response = await fetch('/api/songs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: songId }),
      });

      if (response.ok) {
        // Call the parent component's callback to refresh the list
        if (onSongDeleted) {
          onSongDeleted(songId);
        }
      } else {
        const error = await response.json();
        console.error('Failed to delete song:', error);
        alert('Failed to delete song. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting song:', error);
      alert('An error occurred while deleting the song.');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(songId);
        return newSet;
      });
    }
  };

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-medium text-gray-800 mb-2 sm:text-xl">
        Requested Songs
      </h3>
      <ul className="w-full border border-gray-300 rounded-md shadow-md bg-white">
        {songRequests.map((song) => (
          <li
            key={song.id}
            className="py-2 px-4 border-b last:border-none flex justify-between items-center text-sm sm:text-base"
          >
            <span className="text-gray-800">
              <strong>{song.title}</strong> by {song.artist}
            </span>
            <button
              onClick={() => handleDelete(song.id)}
              disabled={deletingIds.has(song.id)}
              className={`ml-4 px-3 py-1 text-xs rounded transition-colors ${
                deletingIds.has(song.id)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1'
              }`}
            >
              {deletingIds.has(song.id) ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}