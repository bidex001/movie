"use client";
import React, { useEffect,useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "@/context/context";
import { useRouter } from "next/navigation";
import useFetchMovieById from "@/hook/movies/fetchMovieById";
import { useParams } from "next/navigation";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { BiMoviePlay } from "react-icons/bi";
import Loading from "../movie/component/loading";
import { MdDoubleArrow } from "react-icons/md";
import Watch from "../movie/component/watch";

const IdPage = () => {
  const { movieId,setMovieId } = useContext(AppContext);
    const [watch,setWatch] = useState(false)

  const router = useRouter();
  const { id: paramId } = useParams();
  const finalId = movieId || paramId;
  const { data, loading, error } = useFetchMovieById(finalId);
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const scrollRef = useRef(null)
  

  useEffect(() => {
    if (!finalId) {
      router.push("/");
    }
  }, [finalId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  function rightScroll(){
    if(scrollRef.current){
      scrollRef.current.scrollBy({
        left: 200
      })
    }
  }

  return (
    <div className=" flex justify-center flex-col items-center overflow-hidden bg-gray-900 w-full h-full min-h-screen ">
      <main className=" w-full flex flex-col relative">
        <div className="flex  flex-col w-full h-full overflow-hidden z-[500] relative ">
        {data ? (
          <Image
            className=" h-[670px] max-md:h-[500px] w-full object-cover object-center  brightness-50 "
            src={`${baseImgUrl}${data.backdrop_path}`}
            alt={data.title || "Movie backdrop"}
            width={1700}
            height={1500}
          />
        ) : (
          <p>No backdrop available</p>
        )}
        <div className=" w-[600px] h-full absolute gap-4 max-md:bg-gradient-to-l max-md:from-transparent  max-md:to-transparent  bg-gradient-to-l p-4 capitalize   from-transparent flex flex-col justify-center to-gray-900">
          {" "}
        </div>
        <div className="  absolute w-full h-fit z-50 py-9 px-6  max-md:py-5  bottom-0  bg-gradient-to-b from-transparent to-gray-900">
          <div className=" w-[700px] max-md:w-full flex flex-col gap-3 max-md:gap-1">
            <h1 className="text text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-2xl max-xs:text-xl font-inconsolata font-bold text-white">
              {data && data.title}
            </h1>
            <p className="txt font-semibold text-lg max-md:text-sm max-md:text-gray-500 text-white">
              {data && data.overview}
            </p>
            <div className="flex  items-center gap-4 font-bold font-inconsolata text-white text-lg max-md:text-sm">
              <p
                className={` font-inconsolata h-[50px] max-md:h-[40px] text-black flex items-center font-bold text-lg  max-md:text-sm justify-center w-[50px] max-md:w-[40px] p-2  rounded-full
          ${data?.vote_average < 6 && "bg-red-500"}
          ${data?.vote_average < 8 && data?.vote_average > 6 && "bg-yellow-500"}
          ${data?.vote_average >= 8 && "bg-green-600"}
          `}
              >
                {data &&
                  data.vote_average &&
                  (data && data.vote_average).toFixed(2)}
              </p>
              <p>{data?.release_date}</p>
              <p className=" uppercase">{data?.original_language}</p>
              <p className="uppercase">{data?.origin_country}</p>
              <p className=" text-yellow-500 font-bold ">
                {data?.runtime
                  ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
                  : "N/A"}{" "}
              </p>
            </div>
              <div className="flex gap-6 mt-4">
              <button onClick={()=>{
                setWatch(true)
              }} className="flex items-center gap-2 px-8 py-3 max-md:px-6 max-md:py-2 max-md:text-sm rounded-2xl bg-red-600 hover:bg-red-700 max-sm:active:bg-red-700 transition-all duration-200 hover:scale-105 max-sm:active:scale-105">
                Watch now <BiMoviePlay size={22} />
              </button>
              <button className="flex items-center gap-2 px-8 py-3 max-md:px-6 max-md:py-2 max-md:text-sm rounded-2xl bg-gray-700 hover:bg-gray-600 max-sm:active:bg-gray-600 transition-all duration-200 hover:scale-105 max-sm:active:scale-105">
                Download <FaDownload size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {watch && <Watch watch={watch} data={data} setWatch={setWatch}/>}
      </main>
      <div className=" w-full flex max-lg:flex-col   gap-3 h-[400px] max-lg:h-fit justify-start ">
        <div className=" w-[1200px] max-lg:w-full relative ">
          <h1 className="  font-inconsolata font-bold text-2xl max-md:text-xl max-sm:text-lg max-xs:text-sm p-2 w-full capitalize text-white">
            top cast (10)
          </h1>
          <div className="w-full forcast h-full flex gap-3 p-2 *:shrink-0 item-center  overflow-x-scroll"
          ref={scrollRef}>
            {loading
              ? Array(10).map((_, i) => {
                  <div
                    key={i}
                    className=" w-[200px] h-[300px] border-gray-500 animate-pulse"
                  >
                    <Loading />
                  </div>;
                })
              : data &&
                data.credits.cast.slice(0, 10).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" w-[200px] gap-2 h-[300px] max-md:h-[250px] max-md:w-[150px] flex flex-col items-center justify-center overflow-hidden"
                      onClick={()=>{
                        router.push(`/person/${item.id}`)
                      }}
                    >
                      <Image
                        src={`${baseImgUrl}${item.profile_path}`}
                        alt={item.name ? item.name : "name"}
                        width={200}
                        height={250}
                        className=" w-full h-[250px] cursor-pointer hover:scale-110 max-sm:active:scale-110 max-md:h-[200px] rounded-lg"
                      />
                      <div className=" w-full flex flex-col gap-1 max-md:gap-0">
                        <p className=" text-center truncate text-lg max-md:text-sm font-inconsolata font-bold text-white">
                          {item.name}
                        </p>
                        <p className="text-center  truncate w-full text-lg max-md:text-sm text-gray-400 ">
                          {item.character}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <button className=" font-inconsolata text-4xl max-md:text-2xl flex justify-center items-center text-white border active:scale-90 bg-gray-900 p-2 rounded-full absolute right-[-20px] max-md:right-0 top-[150px]"
                onClick={()=>{
                  rightScroll()
                }}><MdDoubleArrow /></button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="capitalize text-2xl max-lg:text-left max-lg:flex max-lg:w-full px-3 text-gray-200 font-bold">recommend</h1>
          <div className="flex flex-wrap max-lg:px-2 max-sm:px-1 gap-4 max-sm:gap-3  justify-center overflow-y-scroll forcast">
            {data &&
              data.similar.results.slice(0, 10).map((item, index) => {
                return (
                  <Image
                    src={`${baseImgUrl + item.poster_path}`}
                    alt={item.title}
                    key={index}
                    width={160}
                    height={200}
                    id={item.id}
                    onClick={()=>{
                      setMovieId(item.id)
                      router.push(`/${item.id}`)
                    }}
                    className=" max-md:w-[150px] max-md:h-[200px] max-sm:w-[160px] max-md:rounded-lg cursor-pointer hover:scale-110 max-sm:active:scale-110"
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdPage;
