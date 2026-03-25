import Tmdb from "../../tmdb";

export const runtime = "nodejs";

function buildDownloadUrl(template, params) {
  return template
    .replaceAll("{{imdb_id}}", encodeURIComponent(params.imdbId || ""))
    .replaceAll("{{tvdb_id}}", encodeURIComponent(params.tvdbId || ""))
    .replaceAll("{{series_id}}", encodeURIComponent(String(params.seriesId)))
    .replaceAll("{{tmdb_id}}", encodeURIComponent(String(params.seriesId)))
    .replaceAll("{{season}}", encodeURIComponent(String(params.season)))
    .replaceAll("{{episode}}", encodeURIComponent(String(params.episode)));
}

function sanitizeFileName(name) {
  return String(name || "series_episode")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 120);
}

function getFileExtension(contentType) {
  if (!contentType) return "mp4";
  if (contentType.includes("video/mp4")) return "mp4";
  if (contentType.includes("video/webm")) return "webm";
  if (contentType.includes("video/x-matroska")) return "mkv";
  return "bin";
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const seriesId = searchParams.get("seriesId");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  if (!seriesId || !season || !episode) {
    return new Response("seriesId, season and episode are required.", {
      status: 400,
    });
  }

  const downloadTemplate =
    process.env.SERIES_DOWNLOAD_URL_TEMPLATE ||
    process.env.MOVIE_DOWNLOAD_URL_TEMPLATE;

  if (!downloadTemplate) {
    return new Response(
      "Missing SERIES_DOWNLOAD_URL_TEMPLATE (or MOVIE_DOWNLOAD_URL_TEMPLATE) in your environment.",
      { status: 500 }
    );
  }
  if (downloadTemplate.includes("your-download-host")) {
    return new Response(
      "Download template is still using the placeholder domain. Replace it with your real file host.",
      { status: 500 }
    );
  }

  try {
    const [episodeRes, externalRes] = await Promise.all([
      Tmdb.get(`/tv/${seriesId}/season/${season}/episode/${episode}`),
      Tmdb.get(`/tv/${seriesId}/season/${season}/episode/${episode}/external_ids`),
    ]);

    const episodeData = episodeRes.data;
    const imdbId = externalRes.data?.imdb_id || null;
    const tvdbId = externalRes.data?.tvdb_id || null;

    if (downloadTemplate.includes("{{imdb_id}}") && !imdbId) {
      return new Response("IMDb id is unavailable for this episode.", {
        status: 404,
      });
    }
    if (downloadTemplate.includes("{{tvdb_id}}") && !tvdbId) {
      return new Response("TVDB id is unavailable for this episode.", {
        status: 404,
      });
    }

    const upstreamUrl = buildDownloadUrl(downloadTemplate, {
      imdbId,
      tvdbId,
      seriesId,
      season,
      episode,
    });

    let validatedUrl;
    try {
      validatedUrl = new URL(upstreamUrl);
    } catch {
      return new Response(
        `Invalid download template result: ${upstreamUrl}`,
        { status: 500 }
      );
    }

    const upstream = await fetch(validatedUrl, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return new Response("Download source is unavailable right now.", {
        status: upstream.status || 502,
      });
    }

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstream.headers.get("content-length");
    const extension = getFileExtension(contentType);
    const fileName = sanitizeFileName(
      `S${pad(season)}E${pad(episode)}_${episodeData?.name || "episode"}`
    );

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${fileName}.${extension}"`);
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      `Could not start series download: ${
        error?.message || "unknown server error"
      }`,
      {
        status: 500,
      }
    );
  }
}

