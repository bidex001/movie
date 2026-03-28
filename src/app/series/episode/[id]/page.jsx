"use client";
export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";
import Header from "../../component/header";
import Watch from "../../component/tvWatch";

const formatDate = (value) => {
  if (!value) return "Unknown";
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Episode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const seriesId = searchParams.get("seriesId");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const [data, setData] = useState(null);
  const [watch, setWatch] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getInfo() {
    if (!seriesId || !season || !episode) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/tv/episode`, {
        params: { id: seriesId, season, episode },
      });
      console.log(res.data);
      setData(res.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInfo();
  }, [seriesId, season, episode]);

  function handleEpisodeDownload() {
    if (!seriesId || !season || !episode) return;

    const link = document.createElement("a");
    link.href = `/api/tv/download?seriesId=${encodeURIComponent(
      seriesId
    )}&season=${encodeURIComponent(season)}&episode=${encodeURIComponent(
      episode
    )}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  if (!seriesId || !season || !episode) {
    return (
      <div className="min-h-screen bg-[#02030a] text-white">
        <Header />
        <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center px-4 pt-28 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Episode unavailable
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              Missing episode information.
            </h1>
            <button
              className="mt-6 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/15"
              onClick={() => router.push("/series")}
              type="button"
            >
              Back to series
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02030a] text-white">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="h-[540px] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/5" />
          <div className="h-[320px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#02030a] text-white">
        <Header />
        <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl items-center justify-center px-4 pt-28 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300/80">
              Episode unavailable
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              We could not load this episode.
            </h1>
            <button
              className="mt-6 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/15"
              onClick={() => router.push("/series")}
              type="button"
            >
              Back to series
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02030a] text-white">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#04060d] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <div className="hero-aurora absolute inset-0" />
          <div className="absolute inset-[-18%] opacity-80">
            <div className="hero-orb hero-orb-amber" />
            <div className="hero-orb hero-orb-blue" />
            <div className="hero-orb hero-orb-sky" />
          </div>
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28),rgba(2,6,23,0.86)_56%,rgba(2,6,23,0.98))]" />

          <div className="relative z-10 space-y-6 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300/85">
                  Season {season} • Episode {episode}
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Episode details
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                {data?.overview || "No synopsis is available for this episode yet."}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                {data?.air_date && (
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    {formatDate(data.air_date)}
                  </span>
                )}
                {data?.episode_number && (
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    Episode {data.episode_number}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300"
                onClick={() => setWatch(true)}
                type="button"
              >
                <BiMoviePlay className="text-xl" />
                Watch episode
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                onClick={handleEpisodeDownload}
                type="button"
              >
                <FiDownload />
                Download
              </button>
            </div>
          </div>
        </section>
      </main>

      {watch && (
        <Watch
          setWatch={setWatch}
          seriesId={seriesId}
          season={season}
          episode={episode}
        />
      )}
    </div>
  );
};

export default Episode;
