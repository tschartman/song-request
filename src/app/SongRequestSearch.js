"use client";

import { useState } from "react";

export default function SongRequestForm() {
  const [songInput, setSongInput] = useState("");

  const addRequest = async () => {
    if (!songInput.trim()) return;

    const response = await fetch("/api/song-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ song: songInput }),
    });

    if (response.ok) {
      setSongInput(""); // Clear input
      window.location.reload(); // Refresh the page to update the list
    }
  };

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={songInput}
        onChange={(e) => setSongInput(e.target.value)}
        placeholder="Enter song name or URL"
        style={styles.input}
      />
      <button onClick={addRequest} style={styles.addButton}>
        Add
      </button>
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