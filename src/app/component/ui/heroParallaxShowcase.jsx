"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiCameraMovie, BiMoviePlay } from "react-icons/bi";

const getMediaTitle = (item) => item?.title || item?.name || "Untitled";
const getMediaDate = (item) => item?.release_date || item?.first_air_date || "";

const buildRows = (items) => {
  if (!items.length) {
    return [[], [], []];
  }

  const expanded = [...items];

  while (expanded.length < 15) {
    expanded.push(...items);
  }

  return [
    expanded.slice(0, 5),
    expanded.slice(5, 10),
    expanded.slice(10, 15),
  ];
};

const PosterCard = ({ item, baseImgUrl, onSelect }) => {
  const title = getMediaTitle(item);
  const poster = item?.poster_path ? `${baseImgUrl}${item.poster_path}` : null;

  return (
    <button
      className="group relative h-[250px] w-[170px] shrink-0 bg-transparent text-left [perspective:1400px]"
      onClick={() => onSelect(item)}
      type="button"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#06070d] shadow-[0_18px_50px_rgba(0,0,0,0.38)] transition duration-300 [transform-style:preserve-3d] group-hover:[transform:translateY(-12px)_rotateX(2deg)_rotateY(-6deg)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        {poster ? (
          <Image
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            fill
            sizes="170px"
            src={poster}
            style={{
              transform: "translateZ(38px)",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-white/30">
            <BiCameraMovie />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.72)_72%,rgba(2,6,23,0.96))]" />
        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            transform: "translateZ(56px)",
          }}
        >
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-xs text-white/55">
            {getMediaDate(item) || "Streaming now"}
          </p>
        </div>
      </div>
    </button>
  );
};

const HeroParallaxShowcase = ({
  items,
  loading,
  error,
  baseImgUrl,
  onSelect,
  browseHref,
  browseLabel,
  sectionLabel,
  title,
  description,
}) => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const rows = useMemo(() => buildRows(items), [items]);
  const featuredItem = items[featuredIndex] || items[0] || null;

  useEffect(() => {
    if (items.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setFeaturedIndex((previous) => (previous + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalTravel = rect.height + viewportHeight;
      const nextProgress = Math.min(
        Math.max((viewportHeight - rect.top) / totalTravel, 0),
        1,
      );

      setScrollProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <section className="relative flex w-full justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="h-[820px] w-full max-w-7xl animate-pulse rounded-[2.75rem] border border-white/10 bg-white/5" />
      </section>
    );
  }

  if (error || !items.length) {
    return (
      <section className="relative flex w-full justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl rounded-[2.25rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/80">
            Content unavailable
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Trending titles could not be loaded.
          </h2>
          <p className="mt-3 text-white/60">
            Refresh the page or continue browsing the catalog sections below.
          </p>
        </div>
      </section>
    );
  }

  const backdrop = featuredItem?.backdrop_path
    ? `${baseImgUrl}${featuredItem.backdrop_path}`
    : null;
  const featuredPoster = featuredItem?.poster_path
    ? `${baseImgUrl}${featuredItem.poster_path}`
    : backdrop;

  return (
    <section className="relative flex w-full justify-center px-4 pt-24 sm:px-6 lg:px-8">
      <div
        className="relative w-full max-w-7xl overflow-hidden rounded-[2.75rem] border border-white/10 bg-[#04060d] shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
        ref={sectionRef}
      >
        {backdrop ? (
          <Image
            alt={getMediaTitle(featuredItem)}
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-center opacity-28"
            fill
            sizes="100vw"
            src={backdrop}
          />
        ) : null}

        <div className="hero-aurora absolute inset-0" />
        <div className="absolute inset-[-18%] opacity-80">
          <div className="hero-orb hero-orb-amber" />
          <div className="hero-orb hero-orb-blue" />
          <div className="hero-orb hero-orb-sky" />
        </div>
        <div className="hero-grid absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.36),rgba(2,6,23,0.9)_58%,rgba(2,6,23,0.98))]" />

        <div className="relative z-10 px-6 pb-16 pt-10 sm:px-8 lg:px-10 lg:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300/85">
                {sectionLabel}
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
                {title}{" "}
                {featuredItem ? (
                  <span className="text-amber-300">
                    {getMediaTitle(featuredItem)}
                  </span>
                ) : null}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/68 sm:text-base lg:mx-0">
                {featuredItem?.overview || description}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/75 lg:justify-start">
                {featuredItem?.vote_average ? (
                  <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 font-semibold text-amber-100">
                    {featuredItem.vote_average.toFixed(1)} rating
                  </span>
                ) : null}
                {getMediaDate(featuredItem) ? (
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    {getMediaDate(featuredItem)}
                  </span>
                ) : null}
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  {items.length} trending picks
                </span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300"
                  onClick={() => featuredItem && onSelect(featuredItem)}
                  type="button"
                >
                  <BiMoviePlay className="text-xl" />
                  Explore featured title
                </button>
                <Link
                  className="rounded-full border border-white/12 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                  href={browseHref}
                >
                  {browseLabel}
                </Link>
              </div>
            </div>

            {featuredItem ? (
              <div className="hidden justify-end lg:flex">
                <button
                  className="group relative w-[320px] bg-transparent text-left [perspective:1800px]"
                  onClick={() => onSelect(featuredItem)}
                  type="button"
                >
                  <div
                    className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#04070f] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.46)] transition duration-500 [transform-style:preserve-3d] group-hover:-translate-y-3 group-hover:rotate-y-[-8deg]"
                    style={{
                      transform: `translateY(${(1 - scrollProgress) * 26}px) rotateX(${10 - scrollProgress * 8}deg) rotateZ(${(0.5 - scrollProgress) * 2}deg)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_30%)]" />

                    <div
                      className="relative overflow-hidden rounded-[1.5rem]"
                      style={{
                        transform: "translateZ(52px)",
                      }}
                    >
                      {featuredPoster ? (
                        <Image
                          alt={getMediaTitle(featuredItem)}
                          className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                          height={420}
                          src={featuredPoster}
                          width={288}
                        />
                      ) : (
                        <div className="flex h-[420px] w-full items-center justify-center text-5xl text-white/26">
                          <BiCameraMovie />
                        </div>
                      )}
                    </div>

                    <div
                      className="relative px-1 pb-2 pt-4"
                      style={{
                        transform: "translateZ(70px)",
                      }}
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-amber-300/82">
                        Hero spotlight
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">
                        {getMediaTitle(featuredItem)}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {featuredItem?.overview?.slice(0, 125) ||
                          "Open the featured title to continue into the full detail view."}
                        {featuredItem?.overview?.length > 125 ? "..." : ""}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-16 hidden overflow-hidden md:block">
            <div
              className="transition-transform duration-200"
              style={{
                transform: `perspective(1400px) rotateX(${18 - scrollProgress * 12}deg) rotateZ(${(0.5 - scrollProgress) * 4}deg) translateY(${68 - scrollProgress * 68}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              {rows.map((row, index) => {
                const direction = index % 2 === 0 ? -1 : 1;
                const shift = 92 + index * 36;

                return (
                  <div
                    className={`mb-5 flex gap-5 ${index === 1 ? "ml-[-140px]" : "ml-[-40px]"}`}
                    key={index}
                    style={{
                      transform: `translateX(${direction * scrollProgress * shift}px)`,
                    }}
                  >
                    {row.map((item, itemIndex) => (
                      <PosterCard
                        baseImgUrl={baseImgUrl}
                        item={item}
                        key={`${index}-${item.id}-${itemIndex}`}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:hidden">
            {items.slice(0, 4).map((item) => (
              <PosterCard
                baseImgUrl={baseImgUrl}
                item={item}
                key={item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroParallaxShowcase;
