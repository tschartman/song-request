"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SongsRequestList from "./SongsRequestList";

export default function SongRequestSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const queryClient = useQueryClient();

  const { data: searchResults = [], isFetching } = useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/song-search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to fetch search results");
      return response.json();
    },
    enabled: !!searchQuery.trim(),
  });

  const { data: songRequests = [] } = useQuery({
    queryKey: ["songRequests"],
    queryFn: async () => {
      const response = await fetch("/api/song-requests");
      if (!response.ok) throw new Error("Failed to fetch song requests");
      return response.json();
    },
  });

  const addSongMutation = useMutation({
    mutationFn: async (song) => {
      const response = await fetch("/api/song-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      });
      if (!response.ok) throw new Error("Failed to add song request");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songRequests"] });
    },
  });

  const addSongRequest = (song) => {
    addSongMutation.mutate(song);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg bg-gray-50 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl">Search for Songs</h2>
      <div className="w-full mt-4 relative">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search for a song..."
          className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-60 overflow-y-auto mt-1">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="py-3 px-4 hover:bg-gray-100 cursor-pointer flex items-center text-sm sm:text-base"
                onClick={() => addSongRequest(result)}
              >
                <span className="truncate">
                  <strong>{result.title}</strong> - {result.artist}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SongsRequestList songRequests={songRequests} />
    </div>
  );
}
