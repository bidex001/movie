"use client";
import Link from "next/link";

export default function SearchResults({ results, setQuery }) {
  const items = results?.results ?? [];
  if (items.length === 0) return null;

  return (
    <div className="absolute top-[50px] left-0 w-full bg-white shadow-lg rounded-lg z-20">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setQuery("")}
            className="border-b border-gray-200"
          >
            <Link
              href={
                item.media_type === "movie"
                  ? `/movie/${item.id}`
                  : `/series/${item.id}`
              }
            >
              <div className="flex items-center p-2 hover:bg-gray-100">
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-12 h-16 mr-4"
                />

                <div>
                  <p className="font-bold">{item.title || item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.media_type === "movie" ? "Movie" : "Series"}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
