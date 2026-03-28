"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/context";
import useFetchTrendingSeries from "@/hook/series/fetchTrendingSeries";
import HeroParallaxShowcase from "@/app/component/ui/heroParallaxShowcase";

const Slider = () => {
  const { data, error, loading } = useFetchTrendingSeries();
  const { setSeriesId } = useContext(AppContext);
  const router = useRouter();
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <HeroParallaxShowcase
      baseImgUrl={baseImgUrl}
      browseHref="/series"
      browseLabel="Browse series catalog"
      description="Discover the shows that are pulling viewers in, from new arrivals to binge-worthy seasons worth opening next."
      error={error}
      items={data}
      loading={loading}
      onSelect={(item) => {
        setSeriesId(item.id);
        router.push(`/series/${item.id}`);
      }}
      sectionLabel="Trending now"
      title="Your next binge starts with"
    />
  );
};

export default Slider;
