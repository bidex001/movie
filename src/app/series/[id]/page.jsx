"use client";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import AppContext from "@/context/context";
import { useRouter } from "next/navigation";
import useFetchSeriesById from "@/hook/series/fetchSeriesById";
import { useParams } from "next/navigation";
import { BiMoviePlay } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { MdDoubleArrow } from "react-icons/md";
import Loading from "../component/SeriesLoading";
import Header from "../component/header";

const TvPage = () => {
  const { seriesId, setSeriesId } = useContext(AppContext);
  const router = useRouter();
  const { id: paramId } = useParams();
  const finalId = seriesId || (paramId ? Number(paramId) : null);
  const { data, loading, error } = useFetchSeriesById(finalId);
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const scrollRef = useRef(null);
  const [seasonClicked, setSeasonClicked] = useState(null);

  console.log(data ? data : "data not found");
  console.log(data?.backdrop_path);

  useEffect(() => {
    if (!finalId) {
      router.push("/");
    }
  }, [finalId, router]);
  const [more,setMore] = useState(false)

  // useEffect(() => {
  //   console.log(data && data);
  // }, [data]);

  function rightScroll() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
      });
    }
  }

  return (
    <div className=" flex  flex-col items-center overflow-hidden bg-gray-900 w-full h-full min-h-screen ">
      <Header />
      <div className="flex  flex-col w-full h-full overflow-hidden  relative ">
        {data ? (
          <Image
            className=" h-[670px] max-md:h-[500px] object-cover object-center w-full "
            src={`${baseImgUrl}${data.backdrop_path}`}
            alt={data?.name || data?.original_name || "TV backdrop"}
            width={1700}
            height={1500}
          />
        ) : (
          <p>No backdrop available</p>
        )}
        <div className=" w-[600px] h-full absolute gap-4  bg-gradient-to-l p-4 max-md:p-2 capitalize max-md:bg-gradient-to-l max-md:from-transparent  max-md:to-transparent   from-transparent flex flex-col justify-center to-gray-900">
          {" "}
        </div>
        <div className="  absolute w-full  h-fit z-50 py-9  max-md:py-5 px-6 flex justify-between max-md:flex-col items-end max-md:items-center  bottom-0  bg-gradient-to-b from-transparent to-gray-900">
          <div className=" w-[700px] flex max-lg:w-full flex-col gap-3 max-lg:gap-1">
            <h1 className="text text-5xl font-inconsolata max-lg:text-4xl max-md:text-4xl max-sm:text-2xl max-xs:text-xl font-bold text-white">
              {data?.original_name || data?.original_name}
            </h1>
            <p className="txt font-semibold max-md:text-sm max-md:text-gray-500 max-lg:h-[80px] overflow-hidden max-lg:w-full   text-lg text-white">
              {data && data.overview}
            </p>
            <div className="flex  items-center max-lg:text-sm gap-4 font-bold font-inconsolata text-white text-lg">
              <p
                className={` font-inconsolata h-[50px] max-md:h-[40px] max-md:text-sm max-md:w-[40px] text-black flex items-center font-bold text-lg justify-center w-[50px] p-2 rounded-full
              ${data?.vote_average < 6 && "bg-red-500"}
              ${
                data?.vote_average < 8 &&
                data?.vote_average > 6 &&
                "bg-yellow-500"
              }
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
                {data?.first_air_date}
              </p>
            </div>
          
          </div>
          <div className="flex flex-col w-full items-end max-md:items-start gap-4 max-md:gap-1">
            {seasonClicked !== null && (
              <div className=" w-[400px] max-md:w-full h-[300px] movie max-md:h-[150px] overflow-y-scroll overflow-hidden  bg-gradient-to-b grid grid-cols-5 gap-3 p-5 justify-center   from-transparent to-gray-900 backdrop-blur-2xl">
                {data &&
                  data.seasons
                    .filter((season) => season.season_number === seasonClicked)
                    .map((season) =>
                      season.episodes
                        .filter((ep) => ep.episode_number !== 0)
                        .map((ep,index) => (
                          <button key={index} onClick={()=>{
                            router.push(`/series/episode/${ep.id}?seriesId=${finalId}&season=${season.season_number}&episode=${ep.episode_number}`)
                          }} className=" shrink-0 h-[40px] max-md:h-[30px] text-white font-inconsolata font-semibold text-lg max-md:text-sm cursor-pointer bg-gradient-to-l from-gray-800 to-gray-700 rounded-2xl hover:scale-110 max-sm:active:scale-110">
                            {ep.episode_number}
                          </button>
                        ))
                    )}
              </div>
            )}
            <div className={`flex gap-4 max-lg:gap-1 items-end w-[600px] max-lg:w-full  justify-end flex-wrap ${more ?" max-md:h-full":" max-md:h-[35px] overflow-hidden "} >`}>
              {data &&
                data.seasons
                  .filter((season) => season.season_number !== 0)
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" bg-gradient-to-l from-green-700 to-gray-900 hover:scale-110 max-sm:active:scale-110 transition duration-300 ease-in-out cursor-pointer *:active:text-black py-2 px-3 rounded-3xl"
                        onClick={() => {
                          setSeasonClicked(seasonClicked === item.season_number ? null : item.season_number)
                        }}
                      >
                        <p className=" font-semibold text-2xl max-lg:text-lg max-sm:text-sm text-gray-200">{`S0${item.season_number}`}</p>
                      </div>
                    );
                  })}
            </div>
            <span 
            onClick={()=>{
              setMore(!more)
            }}
            className="hidden max-md:block w-full text-right text-sm cursor-pointer hover:scale-95 active:scale-110 text-white uppercase font-bold font-serif">more</span>
          </div>
        </div>
      </div>

      <div className="flex gap-10 max-lg:gap-3 max-lg:flex-col max-lg:h-fit w-full h-[400px]">
        <div className=" w-[1200px] max-lg:w-full relative ">
          <h1 className="  font-inconsolata font-bold text-2xl max-md:text-xl max-sm:text-lg p-2 w-full capitalize text-white">
            top cast (10)
          </h1>
          <div
            className="w-full forcast h-full flex gap-3 p-2 *:shrink-0 item-center  overflow-x-scroll"
            ref={scrollRef}
          >
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
                data.cast.slice(0, 10).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" w-[200px] gap-2 h-[300px] max-md:h-[250px] max-md:w-[150px]   flex flex-col items-center justify-center overflow-hidden"
                      onClick={() => {
                        router.push(`/person/${item.id}`);
                      }}
                    >
                      <Image
                        src={`${baseImgUrl}${item.profile_path}`}
                        alt={item.name ? item.name : "name"}
                        width={200}
                        height={250}
                        className=" w-full h-[250px] max-sm:active:scale-110 max-md:h-[200px] rounded-lg object-cover"
                      />
                      <div className=" w-full flex flex-col gap-1 max-md:gap-0">
                        <p className=" text-center truncate  max-md:text-sm text-lg font-inconsolata font-bold text-white">
                          {item.name}
                        </p>
                        <p className="text-center  truncate max-md:text-sm w-full text-lg text-gray-400 ">
                          {item.character}
                        </p>
                      </div>
                    </div>
                  );
                })}
            <button
              className=" font-inconsolata text-4xl max-md:text-2xl flex justify-center items-center text-white border active:scale-90 bg-gray-900 p-2 rounded-full absolute right-[-20px] top-[150px] max-md:right-0"
              onClick={() => {
                rightScroll();
              }}
            >
              <MdDoubleArrow />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="capitalize max-lg:text-left max-lg:flex max-lg:w-full text-2xl text-gray-200 font-bold">
            recommend
          </h1>
          <div className="flex flex-wrap max-lg:px-2 max-sm:px-1 max-sm:gap-3 gap-4 justify-center overflow-y-scroll forcast">
            {data &&
              data.similar.slice(0, 10).map((item, index) => {
                return (
                  <Image
                    src={`${baseImgUrl + item.poster_path}`}
                    alt={item.name}
                    key={index}
                    width={160}
                    height={200}
                    id={item.id}
                    onClick={() => {
                      setSeriesId(item.id);
                      router.push(`/${item.id}`);
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

export default TvPage;
