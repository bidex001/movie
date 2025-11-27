"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { FiDownload } from "react-icons/fi";
import Watch from "../../component/tvWatch";

const Episode = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const seriesId = searchParams.get("seriesId");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");
  const [data, setData] = useState(null);
  const [watch, setWatch] = useState(true);

  async function getInfo() {
    try {
      const res = await axios.get(`/api/tv/episode`, {
        params: { id: seriesId, season, episode },
      });
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div className="flex w-full justify-center pb-4 bg-gray-900  items-center gap-3 flex-col h-full max-md:h-screen ">
      <div className="flex w-full h-screen max-md:h-[200px]">
        {watch && (
          <Watch
            watch={watch}
            setWatch={setWatch}
            seriesId={seriesId}
            season={season}
            episode={episode}
            data={data}
          />
        )}
      </div>
      <div className="px-3 flex flex-col w-full max-md:mt-5 gap-2 items-start *:font-inconsolata *:text-gray-300">
        <h1 className=" font-bold text-xl max-lg:text-lg max-md:text-sm">{data && data.air_date}</h1>
        <p className=" max-md:text-sm">{data && data.overview}</p>
        <button className=" flex capitalize max-sm:text-sm cursor-pointer hover:scale-110 max-sm:active:scale-110 bg-gradient-to-l from-green-600 to-gray-900 gap-1 items-center px-5 py-1 rounded-2xl">
          <FiDownload />
          download here
        </button>
      </div>
    </div>
  );
};

export default Episode;
