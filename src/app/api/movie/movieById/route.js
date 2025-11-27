import Tmdb from "../../tmdb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "id required" }, { status: 400 });
  }
  try {
    const res = await Tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response:
          "credits,videos,images,similar,reviews,recommendations",
      },
    });
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error fetching id" }, { status: 500 });
  }
}
