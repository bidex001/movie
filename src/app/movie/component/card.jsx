"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BiCameraMovie } from "react-icons/bi";
import AppContext from "@/context/context";

const Card = ({ title, image, id }) => {
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const { setMovieId, setSeriesId } = useContext(AppContext);
  const router = useRouter();
  const pathname = usePathname();
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glowX: "50%",
    glowY: "20%",
    active: false,
  });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width;
    const offsetY = (event.clientY - bounds.top) / bounds.height;

    setTilt({
      active: true,
      glowX: `${offsetX * 100}%`,
      glowY: `${offsetY * 100}%`,
      rotateX: (0.5 - offsetY) * 18,
      rotateY: (offsetX - 0.5) * 18,
    });
  };

  const resetTilt = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glowX: "50%",
      glowY: "20%",
      active: false,
    });
  };

  const handleNavigate = () => {
    if (pathname.startsWith("/series")) {
      setSeriesId(id);
      router.push(`/series/${id}`);
      return;
    }

    setMovieId(id);
    router.push(`/${id}`);
  };

  return (
    <button
      className="group relative h-[250px] w-[180px] shrink-0 bg-transparent text-left [perspective:1400px] max-md:h-[220px] max-md:w-[155px]"
      onClick={handleNavigate}
      onMouseLeave={resetTilt}
      onMouseMove={handleMove}
      onTouchEnd={resetTilt}
      type="button"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#05070d] transition duration-300 will-change-transform [transform-style:preserve-3d] group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.45)]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.active ? 1.03 : 1})`,
          boxShadow: tilt.active
            ? "0 26px 70px rgba(0, 0, 0, 0.46)"
            : "0 18px 40px rgba(0, 0, 0, 0.32)",
        }}
      >
        <div
          className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX} ${tilt.glowY}, rgba(250, 204, 21, 0.24), transparent 34%)`,
            transform: "translateZ(20px)",
          }}
        />

        {image ? (
          <Image
            alt={title || "Poster"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 155px, 180px"
            src={`${baseImgUrl}${image}`}
            style={{
              transform: tilt.active ? "translateZ(42px)" : "translateZ(0px)",
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-white/28">
            <BiCameraMovie />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02),rgba(2,6,23,0.7)_68%,rgba(2,6,23,0.98))]" />

        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            transform: tilt.active ? "translateZ(60px)" : "translateZ(0px)",
          }}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-amber-200/75">
            Featured poster
          </p>
          <h3 className="mt-2 truncate text-sm font-semibold text-white">
            {title}
          </h3>
          <p className="mt-1 text-xs text-white/56">Open details</p>
        </div>
      </div>
    </button>
  );
};

export default Card;
