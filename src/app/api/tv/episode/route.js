import Tmdb from "../../tmdb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const season = searchParams.get("season");
    const episode = searchParams.get("episode");

    if (!id || !season || !episode) {
      return NextResponse.json(
        { message: "Missing parameters (seriesId, season, episode)" },
        { status: 400 }
      );
    }

    // Fetch episode details
    const episodeRes = await Tmdb.get(`/tv/${id}/season/${season}/episode/${episode}`);

    // Fetch external IDs (contains IMDb)
    const externalRes = await Tmdb.get(`/tv/${id}/season/${season}/episode/${episode}/external_ids`);

    // Combine results
    const episodeData = {
      ...episodeRes.data,
      imdb_id: externalRes.data.imdb_id || null,
    };

    return NextResponse.json(episodeData, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
