import React, { useEffect, useState } from "react";
import FetchMovieGenre from "@/hook/movies/fetchmoviegenre";
import Loading from "../loading";
import Image from "next/image";
import Card from "../card";

const SciMovies = () => {
  const [action, SetAction] = useState(null);
  const [actionLoad, setActionLoad] = useState(false);

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

  useEffect(() => {
    async function getAction() {
      try {
        setActionLoad(true);
        const res = await FetchMovieGenre(878);
        SetAction(res);
        setActionLoad(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAction();
  }, []);
  return (
    <div className="flex w-full flex-col overflow-hidden mb-[20px]">
      <h1 className=' font-bold text-2xl  z-[1000] font-inconsolata  capitalize px-2.5'>sci-fic</h1>
      <div className='flex  gap-2 w-full overflow-x-scroll movie py-2 px-3  h-[330px]'>
        {actionLoad
          ? Array(10).fill("").map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" shrink-0 w-[200px] h-[250px] hover:scale-105 text-7xl shadow-md"
                  > <Loading/>
                  </div>
                );
              })
          : action &&
            action.map((item, index) => {
              return (
                <div key={index}  className=' shrink-0 w-[200px] h-[250px] hover:scale-105'>
                 <Card key={index} image={item.poster_path} id={item.id} />
                  <h1 className='  text-center font-semibold font-inconsolata text-lg w-full truncate'>{item.title}</h1>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default SciMovies;
