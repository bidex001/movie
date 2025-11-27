"use client"
import Slider from './slider'
import Popular from './popular'
import ActionMovies from './gener/actionmovies'
import AdventureMovies from './gener/adventure'
import AnimationMovies from './gener/animation'
import ComedyMovies from './gener/comedy'
import CrimeMovies from './gener/crime'
import DocumentaryMovies from './gener/documentry'
import FantasyMovies from './gener/fantasy'
import HorrorMovies from './gener/horror'
import RomanceMovies from './gener/romance'
import SciMovies from './gener/sciencfic'
import ThrilMovies from './gener/thriller'
import WestMovies from './gener/western'
import WarMovies from './gener/war'
import Link from 'next/link'

const Main = () => {

    const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

  return (
    <div className='flex flex-col flex-1 gap-2 items-center'>
       <div className=' w-full flex h-full relative'>
        <Slider/>
       </div>
       <Popular/>
       <HorrorMovies/>
       <ComedyMovies/>
       <CrimeMovies/>
    <WarMovies/>
       <AdventureMovies/>
       <AnimationMovies/>
       <ActionMovies/>
       <DocumentaryMovies/>
       <FantasyMovies/>
       <RomanceMovies/>
       <SciMovies/>
       <ThrilMovies/>
    <WestMovies/>
    </div>
  )
}

export default Main