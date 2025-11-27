"use client";
import { useEffect } from "react";

export default function SearchBar({ query, setQuery, setResults }) {
  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults({ results: [] });
        return;
      }

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const timeout = setTimeout(fetchResults, 350);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="search for a movie"
      className="flex-1 p-[10px] text-center capitalize max-lg:text-sm max-md:text-xs outline-none focus:outline-none"
    />
  );
}
