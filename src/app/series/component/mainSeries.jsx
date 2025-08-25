"use client"
import Link from 'next/link'
import Slider from './seriesSlider'
import Popular from './popularSeries'
import ActionSeries from './seriesGenre/actionSeries'
import AnimationSeries from './seriesGenre/animationSeries'
import ComedySeries from './seriesGenre/comedySeries'
import CrimeSeries from './seriesGenre/crimeSeries'
import DramaSeries from './seriesGenre/DramaSeries'
import MystrySeries from './seriesGenre/mystrySeries'
import WarSeries from './seriesGenre/warSeries'

const Main = () => {

    const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

  return (
    <div className='flex flex-col flex-1 gap-2 items-center'>
       <div className=' w-full flex h-full relative'>
         <aside className='absolute backdrop-blur-lg mt-[74px] z-[500] justify-center w-[250px] px-[10px] py-[40px] *:rounded-2xl *:active:scale-110 *:cursor-pointer  h-[87%] text-white flex flex-col gap-3 text-3xl font-bold *:capitalize *:tracking-wider font-inconsolata *:text-center'>
            <Link href={"/"} className='bg-[#a5a3a3e2]'>
            <button className='bg-[]'>movies</button>
            </Link>
            <Link href={"/series"} className='bg-[#a5a3a379]' >
            <button>series</button>
            </Link>
        </aside>
        <Slider/>
       </div>
       <Popular/>
       <ActionSeries/>
       <AnimationSeries/>
       <ComedySeries/>
       <CrimeSeries/>
       <DramaSeries/>
       <MystrySeries/>
       <WarSeries/>

    </div>
  )
}

export default Main