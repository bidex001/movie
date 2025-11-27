
import useFetchPopularSeries from "@/hook/series/fetchPopularSeries";
import Loading from "./SeriesLoading";
import Image from "next/image";
import { useContext } from "react";
import AppContext from "@/context/context";
import { useRouter } from "next/navigation";

const Popular = () => {
  const { data, loading, error } = useFetchPopularSeries();
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const {setSeriesId} = useContext(AppContext)
  const router = useRouter()

  return (
    <div className=" flex flex-col w-full gap-1 px-1 mt-3">
      <h1 className=" font-bold text-2xl max-lg:text-xl max-md:text-lg  z-[1000] font-inconsolata capitalize px-2.5">
        trending
      </h1>
      <div className="flex  gap-2 w-full overflow-x-scroll movie py-2 px-3  h-[200px] max-sm:py-1  max-sm:px-2   max-lg:h-[160px] max-sm:h-[135px]">
        {loading
          ? Array(10)
              .fill("")
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" shrink-0 w-[200px] h-[250px] hover:scale-105 max-sm:active:scale-105 text-7xl shadow-md"
                  >
                    <Loading />
                  </div>
                );
              })
          : data &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" shrink-0 w-[350px] h-[170px] max-lg:w-[250px] max-lg:h-[130px] max-sm:w-[200px] max-sm:h-[110px]  hover:scale-105 max-sm:active:scale-105 flex flex-col relative "
                  onClick={()=>{
                    setSeriesId(item.id)
                    router.push(`/series/${item.id}`)
                  }}
                >
                  <Image
                    className=" w-full h-full"
                    src={`${baseImgUrl}${item.backdrop_path}`}
                    alt={`${item.name}`}
                    width={350}
                    height={180}
                  />
                  <h1 className="  text-center font-semibold font-inconsolata text-lg max-lg:text-sm w-full absolute bottom-[-30px] max-lg:bottom-[-20px] truncate">
                    {item.name}
                  </h1>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Popular;
