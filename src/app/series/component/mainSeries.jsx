"use client"
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
  return (
    <div className='flex flex-col flex-1 gap-8 items-center pb-10'>
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
