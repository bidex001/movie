"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "@/context/context";
import useFetchTrendingSeries from "@/hook/series/fetchTrendingSeries";
import InfiniteMovingMediaCards from "@/app/component/ui/infiniteMovingMediaCards";

const Popular = () => {
  const { data, loading, error } = useFetchTrendingSeries();
  const { setSeriesId } = useContext(AppContext);
  const router = useRouter();
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

  return (
    <InfiniteMovingMediaCards
      baseImgUrl={baseImgUrl}
      description="An endless line of breakout shows, fresh season drops, and series people are actively binging right now."
      eyebrow="Trending series"
      error={error}
      items={data}
      loading={loading}
      onSelect={(item) => {
        setSeriesId(item.id);
        router.push(`/series/${item.id}`);
      }}
      title="Binge-worthy titles in motion"
    />
  );
};

export default Popular;
