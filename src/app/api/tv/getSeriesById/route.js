import Tmdb from "../../tmdb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type")

  if (!id) {
    return NextResponse.json({ message: "invalid id" }, { status: 400 });
  }

  try {
    const detailsRes = await Tmdb.get(`/tv/${id}`)
    const details = detailsRes.data
    const seasonPromises = details.seasons.map((season) =>{
    return Tmdb.get(`/tv/${id}/season/${season.season_number}`)
    })
    const seasonResults = await Promise.all(seasonPromises)
    const seasonsWithEpisodes = seasonResults.map((res)=> res.data)
    const [ videoRes, creditsRes, similarRes] = await Promise.all([
      Tmdb.get(`/tv/${id}/videos`),
      Tmdb.get(`/tv/${id}/credits`),
      Tmdb.get(`/tv/${id}/similar`),
    ]);

    return NextResponse.json(
      {
        ...details,
        videos: videoRes.data.results,
        cast: creditsRes.data.cast,
        crew: creditsRes.data.crew,
        similar: similarRes.data.results,
        seasons:seasonsWithEpisodes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching TV show:", error.message);
    return NextResponse.json(
      { message: "error in getting tv show" },
      { status: 500 }
    );
  }
}
