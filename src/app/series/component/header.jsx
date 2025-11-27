"use client";
import React, { useState, useEffect, useContext } from "react";
import { MdMovie } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import AppContext from "@/context/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ results: [] });

  const handleSelect = (item) => {
  setQuery(""); // clear search
  if (item.media_type === "movie") {
    router.push(`/${item.id}`);
  } else if (item.media_type === "tv") {
    router.push(`/series/${item.id}`);
  }
};

const pathname = usePathname();
const isMoviePage = pathname.startsWith("/");

  // Live search effect
  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.length < 2) {
        setResults({ results: [] });
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const timeout = setTimeout(fetchResults, 300); // debounce typing
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="border w-full flex justify-center">
      <div className="flex w-[1200px] max-xl:w-[1000px] max-lg:w-[800px] max-md:w-[600px] max-sm:w-[98%] max-md:justify-center max-md:gap-7 max-sm:justify-between max-sm:gap-0  max-md:px-2 rounded-4xl mt-4 backdrop-blur-3xl justify-between py-3 px-4 shadow-xl bg-transparent  fixed z-[1000]">
        
        {/* Logo */}
        <h1 className="flex max-md:text-xl font-inconsolata items-center text-white font-bold text-3xl gap-1">
          bbMovie <MdMovie className="text-[#b49a07]" />
        </h1>

        {/* Search Box */}
        <div className="relative w-[600px] max-md:w-[250px] max-xl:w-[450px] max-lg:w-[350px] max-sm:w-[180px]">
          <div className="flex bg-[#808080af] rounded-2xl overflow-hidden items-center gap-2">
            <input
              type="text"
              placeholder="search for a movie"
              className="flex-1 p-[10px] capitalize max-lg:text-sm max-md:text-xs outline-none focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="cursor-pointer active:scale-90 max-lg:text-sm max-sm:hidden max-xl:text-2xl max-sm:p-0 text-white font-bold text-3xl py-[10px] px-[20px]">
              <FaSearch />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {results?.results?.length > 0 && (
            <div className="absolute top-[45px] left-0 w-full bg-white shadow-lg rounded-lg z-20 max-h-96 overflow-y-auto">
              <ul>
                {results.results.map((item) => (
                  <li
                  onClick={() => handleSelect(item)}
                    key={item.id}
                    className="border-b border-gray-200"
                  >
                      <div className="flex items-center p-2 hover:bg-gray-100">
                        {item.poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            alt={item.title || item.name}
                            className="w-12 h-16 mr-4"
                          />
                        )}
                        <div>
                          <p className="font-bold">{item.title || item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.media_type === "movie" ? "Movie" : "Series"}
                          </p>
                        </div>
                      </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <div className="flex items-center gap-4 max-md:hidden">
          <Link href="/">
            <button className="cursor-pointer border-3 rounded-2xl px-5 font-inconsolata font-bold bg-black text-white text-2xl capitalize border-[#b49a07] active:scale-125">
              movies
            </button>
          </Link>
          <Link href="/series">
            <button className="cursor-pointer border-3 rounded-2xl px-5 font-inconsolata font-bold bg-black text-white text-2xl capitalize border-[#b49a07] active:scale-125">
              series
            </button>
          </Link>
        </div>

        {/* Mobile select */}
        <div className="hidden max-md:flex justify-center text-white items-center gap-2">
          <select
            onChange={(e) => router.push(e.target.value)}
            defaultValue="/series"
            className="flex items-center border-3 bg-black px-3 cursor-pointer py-1 text-sm capitalize rounded-lg justify-center border-[#b49a07]"
          >
            <option value="/series">series</option>
            <option value="/">movie</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default Header;
