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
         <aside className='absolute backdrop-blur-lg mt-[74px] z-[500] justify-center w-[250px] px-[10px] py-[40px] *:rounded-2xl *:active:scale-110 *:cursor-pointer  h-[87%] text-white flex flex-col gap-3 text-3xl font-bold *:capitalize *:tracking-wider font-inconsolata *:text-center'>
            <Link href={"/"} className='bg-[#a5a3a379]'>
            <button className='bg-[]'>movies</button>
            </Link>
            <Link href={"/series"} className='bg-[#a5a3a3e2]'>
            <button>series</button>
            </Link>
        </aside>
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