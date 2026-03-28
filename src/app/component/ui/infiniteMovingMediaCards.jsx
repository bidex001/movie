"use client";

import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";

const getMediaTitle = (item) => item?.title || item?.name || "Untitled";

const getMediaMeta = (item) =>
  item?.release_date || item?.first_air_date || "Streaming now";

const splitRows = (items) => {
  const firstRow = [];
  const secondRow = [];

  items.forEach((item, index) => {
    if (index % 2 === 0) {
      firstRow.push(item);
      return;
    }

    secondRow.push(item);
  });

  return [firstRow, secondRow.length ? secondRow : firstRow];
};

const buildTrack = (items, minimum = 8) => {
  if (!items.length) return [];

  const expanded = [...items];

  while (expanded.length < minimum) {
    expanded.push(...items);
  }

  const baseTrack = expanded.slice(0, Math.max(minimum, items.length));

  return [...baseTrack, ...baseTrack];
};

const MediaLoopCard = ({ item, baseImgUrl, onSelect }) => {
  const title = getMediaTitle(item);
  const imagePath = item?.backdrop_path || item?.poster_path;

  return (
    <button
      className="group relative h-[200px] w-[320px] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b15] text-left shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(0,0,0,0.52)] sm:w-[360px]"
      onClick={() => onSelect(item)}
      type="button"
    >
      {imagePath ? (
        <Image
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          fill
          sizes="(max-width: 640px) 320px, 360px"
          src={`${baseImgUrl}${imagePath}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl text-white/28">
          <BiCameraMovie />
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.05),rgba(3,7,18,0.82)_70%,rgba(3,7,18,0.98))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.18),transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-200/85">
          <span className="rounded-full border border-amber-400/18 bg-amber-400/12 px-3 py-1">
            Trending
          </span>
          {item?.vote_average ? (
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-white/68">
              {item.vote_average.toFixed(1)}
            </span>
          ) : null}
        </div>

        <p className="truncate text-lg font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/58">{getMediaMeta(item)}</p>
      </div>
    </button>
  );
};

const InfiniteMovingMediaCards = ({
  items,
  loading,
  error,
  baseImgUrl,
  onSelect,
  eyebrow,
  title,
  description,
}) => {
  if (loading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="h-[430px] animate-pulse rounded-[2.5rem] border border-white/10 bg-white/5" />
      </section>
    );
  }

  if (error || !items.length) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300/78">
            Feed unavailable
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Trending titles could not be loaded.
          </h2>
          <p className="mt-3 text-white/60">
            Refresh the page and try again in a moment.
          </p>
        </div>
      </section>
    );
  }

  const rows = splitRows(items.slice(0, 12));

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#05070f] px-5 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:px-8 sm:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,rgba(6,10,20,0.98),rgba(2,6,23,0.92))]" />
        <div className="relative">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-300/82">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              {description}
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {rows.map((row, index) => {
              const trackItems = buildTrack(row);

              return (
                <div
                  className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                  key={`${index}-${row.length}`}
                >
                  <div
                    className={`marquee-track flex w-max gap-5 ${
                      index % 2 === 0
                        ? "animate-marquee-left"
                        : "animate-marquee-right"
                    }`}
                    style={{
                      animationDuration: `${30 + index * 4}s`,
                    }}
                  >
                    {trackItems.map((item, itemIndex) => (
                      <MediaLoopCard
                        baseImgUrl={baseImgUrl}
                        item={item}
                        key={`${index}-${item.id}-${itemIndex}`}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteMovingMediaCards;
