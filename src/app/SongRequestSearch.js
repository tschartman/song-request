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
    <div className="flex flex-col items-center space-y-4 relative w-full max-w-lg">
      <h2 className="text-2xl font-semibold">Search for Songs</h2>
      <div className="w-full">
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search songs"
          className="px-4 py-2 text-base border border-gray-300 rounded-md w-full"
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => {
                  addSongRequest(result);
                  setSearchQuery("");
                  setShowDropdown(false);
                }}
              >
                <span>
                  <strong>{result.title}</strong> by {result.artist}
                </span>
                <em>{result.album}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SongsRequestList songRequests={songRequests} />
    </div>
  );
}

const styles = {
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};