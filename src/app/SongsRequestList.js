export default async function SongRequestList() {

  const requests = [
    {song: 'test1'},
    {song: 'test2'},
    {song: 'test3'}
  ]

  return (
    <ul style={styles.list}>
      {requests.map((request, index) => (
        <li key={index} style={styles.listItem}>
          {request.song}
        </li>
      ))}
    </ul>
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