"use client";
import { FaXmark } from "react-icons/fa6";

const Watch = ({ setWatch, seriesId, season, episode }) => {
  const canPlay = Boolean(seriesId && season && episode);

  const embedUrl = canPlay
    ? `https://vidsrc.me/embed/tv?tmdb=${encodeURIComponent(
        seriesId
      )}&season=${encodeURIComponent(season)}&episode=${encodeURIComponent(
        episode
      )}`
    : null;

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col bg-black/95 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-semibold text-white/80 uppercase tracking-[0.2em]">
          Episode Player
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          onClick={() => setWatch(false)}
          type="button"
        >
          <FaXmark className="text-xl" />
        </button>
      </div>
      <div className="relative flex-1">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            referrerPolicy="origin"
            allowFullScreen
            className="bg-black"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-semibold text-white/80">Video player unavailable</p>
              <p className="mt-2 text-sm text-white/60">Please try again later</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
