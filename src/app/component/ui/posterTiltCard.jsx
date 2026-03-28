"use client";

import { useState } from "react";
import Image from "next/image";

const defaultTilt = {
  glowX: 50,
  glowY: 50,
  rotateX: 0,
  rotateY: 0,
};

const getTitle = (item) => item?.title || item?.name || "Untitled";

const getYear = (item) => {
  const value = item?.release_date || item?.first_air_date;

  if (!value) {
    return "Unknown year";
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "Unknown year" : date.getFullYear();
};

const PosterTiltCard = ({
  item,
  baseImgUrl,
  onSelect,
  className = "",
  imageClassName = "",
}) => {
  const [tilt, setTilt] = useState(defaultTilt);
  const title = getTitle(item);
  const posterPath = item?.poster_path || item?.profile_path;

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      glowX: x * 100,
      glowY: y * 100,
      rotateX: (0.5 - y) * 16,
      rotateY: (x - 0.5) * 18,
    });
  };

  const resetTilt = () => setTilt(defaultTilt);

  return (
    <button
      className={`group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#070b14] p-3 text-left shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition duration-300 hover:border-amber-300/18 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${className}`}
      onBlur={resetTilt}
      onClick={() => onSelect(item)}
      onMouseLeave={resetTilt}
      onMouseMove={handlePointerMove}
      style={{
        transform: `perspective(1500px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      type="button"
    >
      <div
        className="absolute inset-0 rounded-[1.8rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(250,204,21,0.22), transparent 34%)`,
        }}
      />
      <div className="absolute inset-0 rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_26%,transparent_72%,rgba(255,255,255,0.06))]" />

      <div
        className="relative overflow-hidden rounded-[1.35rem]"
        style={{ transform: "translateZ(48px)" }}
      >
        {posterPath ? (
          <Image
            alt={title}
            className={`h-[250px] w-full rounded-[1.35rem] object-cover transition duration-500 group-hover:scale-105 ${imageClassName}`}
            height={360}
            src={`${baseImgUrl}${posterPath}`}
            width={240}
          />
        ) : (
          <div
            className={`flex h-[250px] w-full items-center justify-center rounded-[1.35rem] border border-dashed border-white/10 bg-white/5 text-sm text-white/45 ${imageClassName}`}
          >
            No poster
          </div>
        )}
      </div>

      <div
        className="relative px-1 pb-1 pt-4"
        style={{ transform: "translateZ(62px)" }}
      >
        <p className="truncate text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/45">
          {getYear(item)}
        </p>
      </div>
    </button>
  );
};

export default PosterTiltCard;
