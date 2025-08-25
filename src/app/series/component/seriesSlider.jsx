import { useEffect, useRef, useState } from "react";
import fetchTrendingSeries from "@/hook/series/fetchTrendingSeries";
import Image from "next/image";
import Loading from "./SeriesLoading";

const Slider = () => {
    const banner = useRef(null);
  const [trending, setTrending] = useState([]);
  const [currentSlide,setCurrentSlide] = useState(0)
  const [trendLoading, setTrendLoading] = useState(false);

  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

  useEffect(()=>{
      async function getTrending(){
            setTrendLoading(true)
            const res = await fetchTrendingSeries()
            let value = [...res,res[0]]
            setTrending(value)
            setTrendLoading(false)
        }
        getTrending()
  },[])

  useEffect(()=>{
    if(trending.length == 0 ) return
    const scroll = setInterval(()=>{
        setCurrentSlide((prev) => 
            prev >= trending.length -1? 0 : prev + 1
        )
    },7000)
    return ()=> clearInterval(scroll)
  },[trending])




  return(
    <div className=" w-full h-full flex justify-center ">
            <div className='flex w-[1700px] h-[600px] overflow-hidden relative'
        ref={banner}
        >
           <div className="absolute backdrop-blur-sm  right-[100px] bottom-[20px] z-[1000] flex flex-col gap-3 w-[600px] p-[10px] ">
                <h1 className=" min-w-[500px] font-inconsolata px-2 w-fit min-h-[50px] text-center font-bold text-4xl">{trending && trending[currentSlide]?.name}</h1>
                <p>{trending && trending[currentSlide]?.overview}</p>
                <button className=" border text-2xl font-bold w-[200px] font-inconsolata capitalize  cursor-pointer px-4 py-1.5 active:scale-90">more details</button>
            </div>
            <div className={`flex w-fit h-100 ${currentSlide === 0 ?"duration-0":"duration-700"} text-[200px]`}
            style={{transform : `translateX(-${currentSlide * (banner.current ? banner.current.clientWidth : 0)}px)`}}
            >
                {
                   trendLoading? 
                   <div className=' w-[1400px] h-[450px] shadow-lg shadow-[black] flex'><Loading/></div>:
                    trending && trending.map((item,index)=>{
                        return(
                            <div 
                            key={index}
                            className=' h-fit w-fit shrink-0'
                            >
                                <Image
                                src={`${baseImgUrl + item.backdrop_path}`}
                                alt={item.name}
                                width={1600}
                                height={400}
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
