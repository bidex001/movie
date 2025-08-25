
import { useEffect,useState } from 'react'
import fetchPopular from '@/hook/series/fetchPopularSeries'
import Image from 'next/image'
import Loading from './SeriesLoading'
import Card from '@/app/movie/component/card'

const Popular = () => {
    const [popular,setPopular] = useState([])
    const [popLoading,setPopLoading] = useState(false)

    const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL

       useEffect(()=>{
        async function getData (){
            setPopLoading(true)
            const res = await fetchPopular()
            setPopular(res)
            setPopLoading(false)
        }
        getData()
    },[])


  return (
    <div className=' flex flex-col w-full gap-1 px-1 mt-3'>
             <h1 className=' font-bold text-2xl  z-[1000] font-inconsolata capitalize px-2.5'>trending</h1>
        <div className='flex  gap-2 w-full overflow-x-scroll movie py-2 px-3  h-[330px]'>
            {
               popLoading? Array(10).fill("").map((item,index)=>{
                return(
                    <div 
                    key={index}
                    className=' shrink-0 w-[200px] h-[250px] hover:scale-105 text-7xl shadow-md'
                    ><Loading/></div>
                )
               }):
                popular && popular.map((item,index)=>{
                    return(
                        <div key={index} className=' shrink-0 w-[200px] h-[250px] hover:scale-105 flex flex-col relative '>
                        <Card key={index} image={item.poster_path} id={item.id} />
                            <h1 className='  text-center font-semibold font-inconsolata text-lg w-full absolute bottom-[-75px] truncate'>{item.title}</h1>
                        </div>
                    )
                })
            }
            
        </div>
    </div>
  )
}

export default Popular