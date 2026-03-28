"use client";
export const dynamic = "force-dynamic";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { BiMoviePlay } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import AppContext from "@/context/context";
import useFetchSeriesById from "@/hook/series/fetchSeriesById";
import Header from "../component/header";
import { BentoGrid, BentoGridItem } from "../component/ui/bentoGrid";
import PosterTiltCard from "@/app/component/ui/posterTiltCard";

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

const TvPage = () => {
  const { seriesId, setSeriesId } = useContext(AppContext);
  const router = useRouter();
  const { id: paramId } = useParams();
  const finalId = seriesId || (paramId ? Number(paramId) : null);
  const { data, loading, error } = useFetchSeriesById(finalId);
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const scrollRef = useRef(null);
  const [seasonClicked, setSeasonClicked] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);

  useEffect(() => {
    if (!finalId) {
      router.push("/series");
    }
  }, [finalId, router]);

  const visibleSeasons =
    data?.seasons?.filter((season) => season.season_number !== 0) || [];

  useEffect(() => {
    if (!visibleSeasons.length) return;

    const hasSelectedSeason = visibleSeasons.some(
      (season) => season.season_number === seasonClicked,
    );

    if (!hasSelectedSeason) {
      setSeasonClicked(visibleSeasons[0].season_number);
      setShowAllEpisodes(false);
    }
  }, [seasonClicked, visibleSeasons]);

  const activeSeason =
    visibleSeasons.find((season) => season.season_number === seasonClicked) ||
    visibleSeasons[0];

  const activeEpisodes =
    activeSeason?.episodes?.filter((episode) => episode.episode_number !== 0) ||
    [];

  const topCast = data?.cast?.slice(0, 10) || [];
  const similarSeries = data?.similar?.slice(0, 8) || [];
  const totalEpisodes = visibleSeasons.reduce((count, season) => {
    const nestedEpisodes =
      season?.episodes?.filter((episode) => episode.episode_number !== 0)
        .length || 0;

    return count + (season.episode_count || nestedEpisodes);
  }, 0);

  const metaPills = [
    data?.genres?.slice(0, 3).map((item) => item.name).join(" / "),
    data?.original_language?.toUpperCase(),
    data?.origin_country?.join(", "),
    data?.status,
  ].filter(Boolean);

  function rightScroll() {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 260,
      behavior: "smooth",
    });
  }

  function handleDownLoad() {
    if (!finalId) return;

    const link = document.createElement("a");
    link.href = `/api/tv/download?id=${finalId}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function handleWatchNow() {
    if (!finalId) return;

    const firstSeason = visibleSeasons[0];
    const firstEpisode = firstSeason?.episodes?.find(
      (episode) => episode.episode_number !== 0,
    );

    if (!firstSeason || !firstEpisode) return;

    router.push(
      `/series/episode/${firstEpisode.id}?seriesId=${finalId}&season=${firstSeason.season_number}&episode=${firstEpisode.episode_number}`,
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#02030a] text-white">
        <Header />
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="h-[520px] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/5" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-[220px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5 md:col-span-2" />
            <div className="h-[220px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5" />
            <div className="h-[320px] animate-pulse rounded-[2rem] border border-white/10 bg-white/5 md:col-span-3" />
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
              Series unavailable
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-white">
              We could not load this series.
            </h1>
            <p className="mt-3 text-white/65">
              Try another title or head back to the series page.
            </p>
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
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#09090b] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          {data?.backdrop_path ? (
            <Image
              alt={data?.name || data?.original_name || "TV backdrop"}
              className="absolute inset-0 h-full w-full object-cover object-center"
              height={1400}
              src={`${baseImgUrl}${data.backdrop_path}`}
              width={1800}
            />
          ) : null}

          <div className="hero-aurora absolute inset-0" />
          <div className="absolute inset-[-18%] opacity-80">
            <div className="hero-orb hero-orb-amber" />
            <div className="hero-orb hero-orb-blue" />
            <div className="hero-orb hero-orb-sky" />
          </div>
          <div className="hero-grid absolute inset-0 opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.8)_35%,rgba(2,6,23,0.58)_62%,rgba(2,6,23,0.94)_100%)] max-md:bg-[linear-gradient(180deg,rgba(2,6,23,0.12)_0%,rgba(2,6,23,0.72)_50%,rgba(2,6,23,0.96)_100%)]" />

          <div className="relative z-10 grid min-h-[620px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_300px] lg:items-end lg:p-10">
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
                  {data?.original_name || data?.name}
                </h1>

                <p className="max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                  {data?.overview || "No synopsis available for this series yet."}
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
                    First aired {formatDate(data?.first_air_date)}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    {visibleSeasons.length} seasons
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">
                    {totalEpisodes} episodes
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!visibleSeasons.length}
                  onClick={handleWatchNow}
                  type="button"
                >
                  <BiMoviePlay className="text-xl" />
                  Watch first episode
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                  onClick={handleDownLoad}
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
                className="w-[290px]"
                imageClassName="h-[410px]"
                item={data}
                onSelect={handleWatchNow}
              />
            </div>
          </div>
        </section>

        <BentoGrid>
          <BentoGridItem
            className="md:col-span-2"
            description="The series overview, genre mix, and episode rhythm are grouped here so the page feels structured instead of overcrowded."
            eyebrow="Series snapshot"
            title="Built for a long-form binge"
          >
            <div className="flex h-full flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                {data?.genres?.map((genre) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Episode runtime
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {data?.episode_run_time?.[0]
                      ? `${data.episode_run_time[0]} min`
                      : "Unknown"}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Last air date
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {formatDate(data?.last_air_date)}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                    Current status
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {data?.status || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
                {data?.tagline || "A detailed series page should help viewers decide quickly, explore seasons, and jump straight into an episode without hunting through clutter."}
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem
            description="The score card highlights the most important release and language details at a glance."
            eyebrow="Quick facts"
            title="Core series details"
          >
            <div className="grid h-full gap-3 sm:grid-cols-2 md:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Original language
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {data?.original_language?.toUpperCase() || "Unknown"}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Origin country
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {data?.origin_country?.join(", ") || "Unknown"}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Seasons available
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {visibleSeasons.length}
                </p>
              </div>
            </div>
          </BentoGridItem>

          <BentoGridItem
            className="md:col-span-2 md:row-span-2"
            description="Select a season and jump directly into any episode. This is the main Aceternity-style upgrade on the page."
            eyebrow="Season guide"
            header={
              activeSeason ? (
                <div className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-4">
                  {activeSeason.poster_path ? (
                    <Image
                      alt={activeSeason.name || "Season poster"}
                      className="h-20 w-16 rounded-xl object-cover"
                      height={140}
                      src={`${baseImgUrl}${activeSeason.poster_path}`}
                      width={100}
                    />
                  ) : (
                    <div className="flex h-20 w-16 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 text-xs text-white/45">
                      Poster
                    </div>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-amber-300/80">
                      Active season
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {activeSeason.name || `Season ${activeSeason.season_number}`}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      {activeSeason.episode_count || activeEpisodes.length} episodes
                      {" - "}
                      Released {formatDate(activeSeason.air_date)}
                    </p>
                  </div>
                </div>
              ) : null
            }
            title="Pick a season and open an episode"
          >
            <div className="flex h-full flex-col gap-5">
              <div className="flex flex-wrap gap-3">
                {visibleSeasons.map((season) => {
                  const isActive = season.season_number === activeSeason?.season_number;

                  return (
                    <button
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "border-amber-400/30 bg-amber-400 text-black"
                          : "border-white/12 bg-white/5 text-white/75 hover:bg-white/10"
                      }`}
                      key={season.id || season.season_number}
                      onClick={() => {
                        setSeasonClicked(season.season_number);
                        setShowAllEpisodes(false);
                      }}
                      type="button"
                    >
                      {season.name || `Season ${season.season_number}`}
                    </button>
                  );
                })}
              </div>

              {activeEpisodes.length ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {(showAllEpisodes
                      ? activeEpisodes
                      : activeEpisodes.slice(0, 12)
                    ).map((episode) => (
                      <button
                        className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-left transition hover:-translate-y-1 hover:bg-white/10"
                        key={episode.id}
                        onClick={() => {
                          router.push(
                            `/series/episode/${episode.id}?seriesId=${finalId}&season=${activeSeason.season_number}&episode=${episode.episode_number}`,
                          );
                        }}
                        type="button"
                      >
                        <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                          Episode {episode.episode_number}
                        </p>
                        <p className="mt-3 line-clamp-2 text-base font-semibold text-white">
                          {episode.name || "Untitled episode"}
                        </p>
                        <p className="mt-3 text-sm text-white/55">
                          {episode.air_date
                            ? `Aired ${formatDate(episode.air_date)}`
                            : "Air date unavailable"}
                        </p>
                      </button>
                    ))}
                  </div>

                  {activeEpisodes.length > 12 ? (
                    <button
                      className="w-fit rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      onClick={() => setShowAllEpisodes((prev) => !prev)}
                      type="button"
                    >
                      {showAllEpisodes ? "Show less" : "Show all episodes"}
                    </button>
                  ) : null}
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 px-6 text-center text-white/60">
                  Episode data is not available for this season yet.
                </div>
              )}
            </div>
          </BentoGridItem>

          <BentoGridItem
            description="A smaller support card keeps the numbers visible without crowding the main story and season panels."
            eyebrow="Binge tracker"
            title="What to expect"
          >
            <div className="flex h-full flex-col gap-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Audience score
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {(data?.vote_average || 0).toFixed(1)}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Seasons loaded
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {visibleSeasons.length}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  Episodes loaded
                </p>
                <p className="mt-3 text-3xl font-semibold text-white">
                  {totalEpisodes}
                </p>
              </div>
            </div>
          </BentoGridItem>
        </BentoGrid>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
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

            {similarSeries.length ? (
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
                {similarSeries.map((item) => (
                  <PosterTiltCard
                    baseImgUrl={baseImgUrl}
                    className="w-full"
                    imageClassName="h-[220px]"
                    key={item.id}
                    item={item}
                    onSelect={() => {
                      setSeriesId(item.id);
                      router.push(`/series/${item.id}`);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 p-6 text-center text-white/60">
                Similar series suggestions are not available right now.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TvPage;
