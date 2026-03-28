"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/context";
import useFetchTrendingMovies from "@/hook/movies/fetchTrending";
import HeroParallaxShowcase from "@/app/component/ui/heroParallaxShowcase";

const Slider = () => {
  const { data, error, loading } = useFetchTrendingMovies();
  const { setMovieId } = useContext(AppContext);
  const router = useRouter();
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <HeroParallaxShowcase
      baseImgUrl={baseImgUrl}
      browseHref="/"
      browseLabel="Browse movie catalog"
      description="A cinematic home for trending films, standout releases, and quick jumps into the titles people are watching right now."
      error={error}
      items={data}
      loading={loading}
      onSelect={(item) => {
        setMovieId(item.id);
        router.push(`/${item.id}`);
      }}
      sectionLabel="Trending now"
      title="Your next movie night starts with"
    />
  );
};

export default Slider;
