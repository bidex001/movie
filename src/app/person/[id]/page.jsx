"use client";
import React from "react";
import useCastDetail from "@/hook/castDetail";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/app/movie/component/headerMovie";
import Footer from "@/app/movie/component/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {useState} from "react"

const CastDetail = () => {
  const params = useParams();
  const { id } = params;
  const { cast, error, loading } = useCastDetail(id);
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  const router = useRouter();
  const [more,setMore] = useState(false)

  return (
    <div className="flex flex-col w-full h-full gap-7 min-h-screen px-[20px] overflow-hidden  items-center bg-gray-900">
      <Header />
      <div className="flex w-full items-center h-fit mt-[100px] gap-7">
        <Image
          src={
            cast && cast.detail && cast.detail.profile_path
              ? `${baseImgUrl}${cast.detail.profile_path}`
              : "/default-profile.png"
          }
          alt={
            cast && cast.detail && cast.detail.name ? cast.detail.name : "image"
          }
          width={200}
          height={200}
          className="rounded-2xl max-md:w-[150px] object-cover max-md:h-[200px]"
        />
        <div className="flex flex-col gap-1 w-fit">
          <h1 className=" text-2xl max-md:text-lg font-bold font-inconsolata text-gray-100">
            {cast && cast.detail.name}
          </h1>
          <p className="text-lg max-md:text-sm max-md:text-gray-300 font-semibold font-inconsolata text-gray-200">
            {cast && cast.detail.known_for_department}
          </p>
          <p className="text-lg max-md:text-sm max-md:text-gray-300 font-semibold font-inconsolata text-gray-200">
            {cast && cast.detail.place_of_birth}
          </p>
          <p className="text-lg max-md:text-sm max-md:text-gray-300 font-semibold font-inconsolata text-gray-200">
            {cast && cast.detail.birthday}
          </p>
          <p className={`text-gray-400  ${more?"h-fit":"h-[100px] overflow-hidden"}`}>{cast && cast.detail.biography} </p>
          <span
            onClick={()=>setMore(!more)}
           className=" font-bold uppercase font-serif text-white text-sm cursor-pointer active:text-gray-500 ">see more...</span>
        </div>
      </div>
      <div className="flex flex-col w-full  items-center h-fit gap-3">
        <h1 className="text text-2xl w-full text-left capitalize text-gray-300">filmography</h1>
        <div className="flex w-full items-center justify-center flex-wrap gap-4 max-md:gap-2 ">
          {cast &&
            cast.combine.cast.slice(1, 20).map((item, index) => {
              console.log(item);
              return (
                <Link
                  href={
                    item.media_type == "movie"
                      ? `/${item.id}`
                      : `/series/${item.id}`
                  }
                >
                  <Image
                    src={`${baseImgUrl}${item.poster_path}`}
                    alt={item.title || "image"}
                    width={161}
                    height={150}
                    key={index}
                    className=" max-md:h-[200px] cursor-pointer hover:scale-110 max-sm:active:scale-110 max-md:w-[150px] max-sm:w-[170px] object-cover max-md:rounded-lg "
                  />
                </Link>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CastDetail;
