import React, { useEffect, useState } from "react";
import useFetchGenreMovies from "@/hook/movies/fetchmoviegenre";
import Loading from "../loading";
import Card from "../card";

const WarMovies = () => {
 const {data,loading,error} = useFetchGenreMovies(10752)

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <h1 className=' font-bold text-2xl max-md:text-xl max-sm:text-lg  z-[1000] font-inconsolata capitalize px-2.5'>War</h1>
      <div className='flex  gap-2 w-full overflow-x-scroll movie py-2 px-3 '>
        {loading
          ? Array(10).fill("").map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" shrink-0 w-[200px] h-[250px] hover:scale-105 max-sm:active:scale-105 text-7xl shadow-md"
                  > <Loading/>
                  </div>
                );
              })
          : data &&
            data.map((item, index) => {
              return (
                <div key={index}  className=' shrink-0'>
                 <Card key={index} image={item.poster_path} id={item.id} title={item.title} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default WarMovies;
