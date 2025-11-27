import { useEffect, useRef, useState } from "react";
import useFetchTrendingSeries from "@/hook/series/fetchTrendingSeries";
import Image from "next/image";
import Loading from "./SeriesLoading";
import { useContext } from "react";
import AppContext from "@/context/context";
import { useRouter } from "next/navigation";


const Slider = () => {
    const {data,loading,error} = useFetchTrendingSeries()
    const banner = useRef(null);
  const [currentSlide,setCurrentSlide] = useState(0)
  const router = useRouter()
const{setSeriesId} = useContext(AppContext)
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL


  useEffect(()=>{
    if(data.length == 0 ) return
    const scroll = setInterval(()=>{
        setCurrentSlide((prev) => 
            prev >= data.length -1? 0 : prev + 1
        )
    },7000)
    return ()=> clearInterval(scroll)
  },[data])




  return(
    <div className=" w-full h-full flex justify-center ">
            <div className='flex w-[1700px] h-[600px] overflow-hidden relative'
        ref={banner}
        >
          <div className="w-full h-1/2 absolute bottom-0   z-50 bg-gradient-to-b from-transparent to-gray-900 ">
           <div className="absolute  left-[100px] max-lg:left-0  max-lg:px-3 max-xl:w-[800px] max-lg:w-full bottom-[20px] z-[1000] flex flex-col gap-3 w-[600px] p-[10px] ">
                <h1 className=" min-w-[500px] max-sm:min-w-full min-h-[50px] max-md:min-h-[20px] max-lg:text-left font-inconsolata px-2 w-fit max-md:text-3xl max-sm:text-2xl text-center font-bold text-4xl">{data && data[currentSlide]?.name}</h1>
                <p className="max-sm:text-xs">{data && data[currentSlide]?.overview}</p>
                <button className="flex hover:[&>span]:w-full max-sm:active:[&>span]:w-full active:[&>span]:w-full max-sm:w-30 max-sm:text-lg max-sm:px-2 max-sm:py-1 overflow-hidden items-center border-2 w-40 rounded-full cursor-pointer border-[#b49a07] justify-center capitalize text-white relative text-xl font-semibold p-2 gap-1"
                onClick={()=>{
                  setSeriesId(data[currentSlide]?.id)
                  router.push(`/series/${data[currentSlide]?.id}`)
                }}
                ><span className="absolute -z-1 duration-500 block left-0 top-0 h-full w-0 bg-blue-500"></span>
                  more info</button>
            </div>
          </div>
            <div className={`flex w-fit h-100 ${currentSlide === 0 ?"duration-0":"duration-700"} text-[200px]`}
            style={{transform : `translateX(-${currentSlide * (banner.current ? banner.current.clientWidth : 0)}px)`}}
            >
                {
                   loading? 
                   <div className=' w-[1400px] h-[450px] shadow-lg shadow-[black] flex'><Loading/></div>:
                    data && data.map((item,index)=>{
                        return(
                            <div 
                            key={index}
                            className=' h-fit w-fit shrink-0 max-lg:h-[800px]'
                            >
                                <Image
                                src={`${baseImgUrl + item.backdrop_path}`}
                                alt={item.name}
                                width={1600}
                                height={400}
                                className="max-lg:h-[800px] object-cover w-fit h-full"
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
};

export default Slider;
