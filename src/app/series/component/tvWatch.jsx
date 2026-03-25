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
    <div className="w-full h-screen max-md:h-[400px] border-b-2 border-gray-400 z-[1000] flex flex-col bg-gray-900 absolute top-0">
      <div className="w-full relative flex-1">
        <button
          className="absolute cursor-pointer text-gray-500 right-3 top-3 hover:scale-110 max-sm:active:scale-110 text-3xl"
          onClick={() => setWatch(false)}
        >
          <FaXmark />
        </button>
      </div>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          style={{ width: "100%", height: "100%" }}
          frameBorder="0"
          referrerPolicy="origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-gray-200 p-4">Series player info is unavailable.</p>
      )}
    </div>
  );
};

export default Watch;
