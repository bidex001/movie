import React from "react";
import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AppContext from "@/context/context";
import { usePathname } from "next/navigation";
import { FaCheck } from "react-icons/fa";

const Card = ({ title, image, id }) => {
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const {setMovieId,setSeriesId} = useContext(AppContext)
  const router = useRouter()
  const pathName = usePathname()

  return (
    <div className=" shrink-0 w-[200px] h-[250px] max-md:h-[200px] max-md:w-[150px]  hover:scale-105 max-sm:active:scale-105 flex flex-col relative "
    onClick={()=>{
      if(pathName == "/"){
        setMovieId(id)
        router.push(`/${id}`)
      }
      else if(pathName == "/series"){
        setSeriesId(id)
        router.push(`/series/${id}`)
      }
    }}
    >
      {image ? (
        <Image
          src={`${baseImgUrl + image}`}
          alt={title ? title : "images"}
          width={200}
          height={250}
          priority
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <BiCameraMovie className="text-4xl text-gray-500" />
        </div>
      )}
      <div className="flex items-start gap-2 *:opacity-0 *:font-inconsolata font-semibold hover:*:opacity-100 max-sm:active:*:opacity-100 absolute top-[0px] left-[0px] w-full *:transition-opacity max-md:*:text-sm *:duration-500 *:delay-500 hover:bg-black/50 max-sm:active:bg-black/50 bg-transparent h-full p-2 " >
        <p>{title}</p>
        <button className="border p-1 rounded-lg cursor-pointer active:bg-green-600"
        title="Add to favourite"><FaCheck/></button>
      </div>
    </div>
    
  );
};

export default Card;

