"use client";
export const dynamic = "force-dynamic";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BiMoviePlay } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import AppContext from "@/context/context";
import useFetchMovieById from "@/hook/movies/fetchMovieById";
import Header from "../movie/component/headerMovie";
import Watch from "../movie/component/watch";
import PosterTiltCard from "../component/ui/posterTiltCard";

const formatDate = (value) => {
  if (!value) return "Unknown";

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const scoreTone = (score) => {
  if (score >= 8) {
    return "border-emerald-400/20 bg-emerald-500/15 text-emerald-200";
  }

  if (score >= 6) {
    return "border-amber-400/20 bg-amber-500/15 text-amber-100";
  }

  return "border-rose-400/20 bg-rose-500/15 text-rose-100";
};

const MoviePage = () => {
  const { movieId, setMovieId } = useContext(AppContext);
  const [watch, setWatch] = useState(false);
  const router = useRouter();
  const { id: paramId } = useParams();
  const finalId = movieId || paramId;
  const { data, loading, error } = useFetchMovieById(finalId);
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!finalId) {
      router.push("/");
    }
  }, [finalId, router]);

  const topCast = data?.credits?.cast?.slice(0, 10) || [];
  const similarMovies = data?.similar?.results?.slice(0, 8) || [];
  const runtimeLabel = data?.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : "Runtime unavailable";

  const metaPills = [
    data?.genres?.slice(0, 3).map((item) => item.name).join(" / "),
    data?.original_language?.toUpperCase(),
    data?.production_countries
      ?.slice(0, 2)
      .map((item) => item.iso_3166_1)
      .join(", "),
    data?.status,
  ].filter(Boolean);

  const rightScroll = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 260,
      behavior: "smooth",
    });
  };

  const handleMovieDownload = () => {
    if (!finalId) return;

    const link = document.createElement("a");
    link.href = `/api/movie/download?id=${finalId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02030a] text-white">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="h-[540px] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/5" />
          <div className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
            <div className="h-[320px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
            <div className="h-[320px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
          </div>
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
              Movie unavailable
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              We could not load this movie.
            </h1>
            <button
              className="mt-6 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/15"
              onClick={() => router.push("/")}
              type="button"
            >
              Back to movies
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
          {data?.backdrop_path ? (
            <Image
              alt={data?.title || data?.original_title || "Movie backdrop"}
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover object-center opacity-30"
              fill
              sizes="100vw"
              src={`${baseImgUrl}${data.backdrop_path}`}
            />
          ) : null}

          <div className="hero-aurora absolute inset-0" />
          <div className="absolute inset-[-18%] opacity-80">
            <div className="hero-orb hero-orb-amber" />
            <div className="hero-orb hero-orb-blue" />
            <div className="hero-orb hero-orb-sky" />
          </div>
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.28),rgba(2,6,23,0.86)_56%,rgba(2,6,23,0.98))]" />

          <div className="relative z-10 grid min-h-[620px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:items-end lg:p-10">
            <div className="space-y-8">
              <div className="max-w-4xl space-y-5">
                <div className="flex flex-wrap gap-3">
                  {metaPills.map((item) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {data?.title || data?.original_title}
                </h1>

                <p className="max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                  {data?.overview || "No synopsis is available for this movie yet."}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold ${scoreTone(
                      data?.vote_average || 0,
                    )}`}
                  >
                    <IoStarSharp />
                    {(data?.vote_average || 0).toFixed(1)} viewer score
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    {formatDate(data?.release_date)}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    {runtimeLabel}
                  </span>
                  {data?.vote_count ? (
                    <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                      {data.vote_count.toLocaleString()} votes
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300"
                  onClick={() => setWatch(true)}
                  type="button"
                >
                  <BiMoviePlay className="text-xl" />
                  Watch now
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                  onClick={handleMovieDownload}
                  type="button"
                >
                  <FaDownload />
                  Download details
                </button>
              </div>
            </div>

            <div className="hidden justify-end lg:flex">
              <PosterTiltCard
                baseImgUrl={baseImgUrl}
                className="w-[300px]"
                imageClassName="h-[420px]"
                item={data}
                onSelect={() => setWatch(true)}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090b]/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/80">
                  Cast
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  Top cast
                </h2>
              </div>

              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                onClick={rightScroll}
                type="button"
              >
                <MdDoubleArrow className="text-2xl" />
              </button>
            </div>

            {topCast.length ? (
              <div
                className="forcast flex gap-4 overflow-x-auto pb-2"
                ref={scrollRef}
              >
                {topCast.map((person) => (
                  <button
                    className="group w-[190px] shrink-0 rounded-[1.75rem] border border-white/10 bg-white/5 p-3 text-left transition hover:-translate-y-1 hover:bg-white/10"
                    key={person.id}
                    onClick={() => router.push(`/person/${person.id}`)}
                    type="button"
                  >
                    {person.profile_path ? (
                      <Image
                        alt={person.name || "Cast member"}
                        className="h-[240px] w-full rounded-[1.2rem] object-cover"
                        height={260}
                        src={`${baseImgUrl}${person.profile_path}`}
                        width={190}
                      />
                    ) : (
                      <div className="flex h-[240px] w-full items-center justify-center rounded-[1.2rem] border border-dashed border-white/10 bg-black/20 text-sm text-white/45">
                        No image
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="truncate text-lg font-semibold text-white">
                        {person.name}
                      </p>
                      <p className="truncate text-sm text-white/55">
                        {person.character}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-center text-white/60">
                Cast information is not available right now.
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090b]/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/80">
              Recommendations
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              More like this
            </h2>

            {similarMovies.length ? (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
                {similarMovies.map((item) => (
                  <PosterTiltCard
                    baseImgUrl={baseImgUrl}
                    className="w-full"
                    imageClassName="h-[220px]"
                    item={item}
                    key={item.id}
                    onSelect={() => {
                      setMovieId(item.id);
                      router.push(`/${item.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-center text-white/60">
                Similar movie suggestions are not available right now.
              </div>
            )}
          </div>
        </section>
      </main>

      {watch ? <Watch data={data} setWatch={setWatch} watch={watch} /> : null}
    </div>
  );
};

export default MoviePage;
