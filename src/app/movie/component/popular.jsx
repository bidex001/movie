"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/context";
import useFetchTrendingMovies from "@/hook/movies/fetchTrending";
import InfiniteMovingMediaCards from "@/app/component/ui/infiniteMovingMediaCards";

const Popular = () => {
  const { data, loading, error } = useFetchTrendingMovies();
  const { setMovieId } = useContext(AppContext);
  const router = useRouter();
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <InfiniteMovingMediaCards
      baseImgUrl={baseImgUrl}
      description="A continuous stream of what viewers are opening right now, built as an endless motion rail instead of another static shelf."
      eyebrow="Trending movies"
      error={error}
      items={data}
      loading={loading}
      onSelect={(item) => {
        setMovieId(item.id);
        router.push(`/${item.id}`);
      }}
      title="Now looping across the feed"
    />
  );
};

export default Popular;
