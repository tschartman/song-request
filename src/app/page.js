import SongRequestSearch from "./SongRequestSearch";
import SongRequestList from "./SongsRequestList";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Request Songs</h1>
      <SongRequestSearch />
      <h2>Requests</h2>
      <SongRequestList />
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};