import Tmdb from "../../tmdb";

export const runtime = "nodejs";

function buildDownloadUrl(template, imdbId, tmdbId) {
  return template
    .replaceAll("{{imdb_id}}", encodeURIComponent(imdbId || ""))
    .replaceAll("{{tmdb_id}}", encodeURIComponent(String(tmdbId)));
}

function sanitizeFileName(name) {
  return String(name || "movie")
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Movie id is required.", { status: 400 });
  }

  const downloadTemplate = process.env.MOVIE_DOWNLOAD_URL_TEMPLATE;
  if (!downloadTemplate) {
    return new Response(
      "Missing MOVIE_DOWNLOAD_URL_TEMPLATE in your environment.",
      { status: 500 }
    );
  }
  if (downloadTemplate.includes("your-download-host")) {
    return new Response(
      "MOVIE_DOWNLOAD_URL_TEMPLATE is still using the placeholder domain. Replace it with your real movie file host.",
      { status: 500 }
    );
  }

  try {
    const movieRes = await Tmdb.get(`/movie/${id}`);
    const movie = movieRes.data;
    const imdbId = movie?.imdb_id;

    if (downloadTemplate.includes("{{imdb_id}}") && !imdbId) {
      return new Response("IMDb id is unavailable for this movie.", {
        status: 404,
      });
    }

    const upstreamUrl = buildDownloadUrl(downloadTemplate, imdbId, id);
    let validatedUrl;
    try {
      validatedUrl = new URL(upstreamUrl);
    } catch {
      return new Response(
        `Invalid MOVIE_DOWNLOAD_URL_TEMPLATE result: ${upstreamUrl}`,
        {
          status: 500,
        }
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
    const fileName = `${sanitizeFileName(movie?.title)}.${extension}`;

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`);
    if (contentLength) headers.set("Content-Length", contentLength);

    return new Response(upstream.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(
      `Could not start the movie download: ${
        error?.message || "unknown server error"
      }`,
      {
        status: 500,
      }
    );
  }
}
