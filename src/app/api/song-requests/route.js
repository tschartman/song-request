import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const requests = await prisma.songRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(requests), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch song requests" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, artist, album } = body;

    if (!title || !artist || !album) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newRequest = await prisma.songRequest.create({
      data: { title, artist, album },
    });

    return new Response(JSON.stringify(newRequest), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save song request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}