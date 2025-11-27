"use client";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const Watch = ({ watch, setWatch, data }) => {
  return (
    <div>
      {watch && (
        <div className="w-full h-screen max-md:h-full max-md:w-full  border-b-2 border-gray-400  z-[1000] flex flex-col bg-gray-900 absolute top-0">
          <div className=" w-full relative flex-1">
            <button
              className="absolute cursor-pointer text-gray-500 right-3 top-3 hover:scale-110 max-sm:active:scale-110 text-3xl"
              onClick={() => {
                setWatch(false);
              }}
            >
              <FaXmark />
            </button>
          </div>
         {
          data?(
             <iframe
            src={`https://vidsrc.me/embed/movie?imdb=${data.imdb_id}`}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            referrerPolicy="origin"
            allowFullScreen
          ></iframe>
          ):"loading"
         }
        </div>
      )}
    </div>
  );
};

export default Watch;
