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