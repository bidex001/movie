import React from "react";
import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";

const Card = ({ title, image, id }) => {
  const baseImgUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
  return (
    <div className=" shrink-0 w-[200px] h-[250px] hover:scale-105 flex flex-col relative ">
      {image ? (
        <Image
          src={`${baseImgUrl + image}`}
          alt={title ? title : "images"}
          width={200}
          height={250}
          priority
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <BiCameraMovie className="text-4xl text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default Card;
