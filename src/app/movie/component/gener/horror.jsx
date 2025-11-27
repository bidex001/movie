import React, { useEffect, useState } from "react";
import useFetchGenreMovies from "@/hook/movies/fetchmoviegenre";
import Loading from "../loading";
import Card from "../card";

const HorrorMovies = () => {
  const {data,loading,error} = useFetchGenreMovies(27)

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

  return (
    <div className="flex w-full flex-col overflow-hidden ">
      <h1 className=' font-bold text-2xl  z-[1000] max-lg:text-xl max-md:text-lg font-inconsolata  capitalize px-2.5'>horror</h1>
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
                <div key={index} className=' shrink-0 '>
                  <Card key={index} image={item.poster_path} id={item.id} title={item.title} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default HorrorMovies;
