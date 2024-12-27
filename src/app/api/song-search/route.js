 
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const deezerResponse = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const deezerData = await deezerResponse.json();

    const results = deezerData.data.map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      album: track.album.title,
    }));

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data from Deezer" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }}