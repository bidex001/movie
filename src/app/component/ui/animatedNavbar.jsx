"use client";

import { useDeferredValue, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";
import { MdMovie } from "react-icons/md";

const navItems = [
  {
    href: "/",
    label: "movies",
    matches: (pathname) => !pathname.startsWith("/series"),
  },
  {
    href: "/series",
    label: "series",
    matches: (pathname) => pathname.startsWith("/series"),
  },
];

const buildResultLabel = (item) => item?.title || item?.name || "Untitled";

const AnimatedNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const trimmedQuery = deferredQuery.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            trimmedQuery,
          )}`,
          { signal: controller.signal },
        );

        const data = await response.json();
        const nextResults = (data?.results || [])
          .filter(
            (item) => item?.media_type === "movie" || item?.media_type === "tv",
          )
          .slice(0, 8);

        setResults(nextResults);
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Search error:", error);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [deferredQuery]);

  const handleSelect = (item) => {
    console.log("Selected item:", item);

    if (item.media_type === "tv") {
      console.log("Navigating to series:", `/series/${item.id}`);
      router.push(`/series/${item.id}`);
    } else {
      console.log("Navigating to movie:", `/${item.id}`);
      router.push(`/${item.id}`);
    }

    // Clear state after navigation is initiated
    setTimeout(() => {
      setQuery("");
      setResults([]);
    }, 0);
  };

  const currentSection = pathname.startsWith("/series") ? "series" : "movies";

  return (
    <header className="fixed inset-x-0 top-3 z-[1000] flex justify-center px-3 sm:px-4">
      <div
        className="relative transition-all duration-500"
        style={{
          width: isScrolled ? "min(92vw, 1120px)" : "min(96vw, 1280px)",
        }}
      >
        <div
          className={`absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.26),transparent_38%),linear-gradient(90deg,rgba(59,130,246,0.22),rgba(250,204,21,0.12),rgba(244,114,182,0.18))] blur-2xl transition-all duration-500 ${
            isScrolled ? "scale-[0.96] opacity-55" : "scale-100 opacity-80"
          }`}
        />

        <div
          className={`relative overflow-visible rounded-[1.9rem] border border-white/12 bg-black/35 shadow-[0_28px_110px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all duration-500 ${
            isScrolled ? "px-4 py-3 sm:px-5" : "px-4 py-4 sm:px-6"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[1.9rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.11),transparent_22%,transparent_78%,rgba(255,255,255,0.04))]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

          <div className="relative flex items-center gap-3 lg:gap-5">
            <Link
              className="group flex shrink-0 items-center gap-2 text-white"
              href="/"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/12">
                <MdMovie className="text-amber-300" />
              </span>
              <div className="hidden sm:block">
                <p className="font-inconsolata text-lg font-bold tracking-[0.18em] text-white">
                  BBMOVIE
                </p>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  motion catalog
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => {
                const isActive = item.matches(pathname);

                return (
                  <Link
                    className={`relative overflow-hidden rounded-full px-4 py-2 font-inconsolata text-sm font-semibold uppercase tracking-[0.24em] transition ${
                      isActive
                        ? "text-black"
                        : "border border-white/10 bg-white/5 text-white/72 hover:bg-white/10 hover:text-white"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {isActive ? (
                      <span className="absolute inset-0 bg-[linear-gradient(135deg,#fde68a,#f59e0b)]" />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="relative flex-1 pointer-events-auto">
              <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/7 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition focus-within:border-amber-300/25 focus-within:bg-white/10">
                <FaSearch className="shrink-0 text-sm text-amber-300" />
                <input
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Search ${currentSection} and cross over instantly`}
                  type="text"
                  value={query}
                />
              </div>

              {results.length ? (
                <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-[1001] pointer-events-auto overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#06070d]/95 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                  <ul className="max-h-[420px] overflow-y-auto">
                    {results.map((item) => (
                      <li key={`${item.media_type}-${item.id}`}>
                        <button
                          className="flex w-full pointer-events-auto items-center gap-3 border-b border-white/5 px-4 py-3 text-left transition last:border-b-0 hover:bg-white/6"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSelect(item);
                          }}
                          type="button"
                        >
                          {item.poster_path ? (
                            <img
                              alt={buildResultLabel(item)}
                              className="h-16 w-12 rounded-lg object-cover"
                              src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                            />
                          ) : (
                            <div className="flex h-16 w-12 items-center justify-center rounded-lg border border-dashed border-white/12 bg-white/5 text-[10px] uppercase tracking-[0.18em] text-white/35">
                              poster
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-white">
                              {buildResultLabel(item)}
                            </p>
                            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/42">
                              {item.media_type === "movie" ? "movie" : "series"}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <button
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              type="button"
            >
              {isMenuOpen ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenuAlt4 className="text-2xl" />
              )}
            </button>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 md:hidden ${
              isMenuOpen
                ? "max-h-40 translate-y-0 pt-4 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-2 pt-0 opacity-0"
            }`}
          >
            <div className="grid gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
              {navItems.map((item) => {
                const isActive = item.matches(pathname);

                return (
                  <Link
                    className={`rounded-[1rem] px-4 py-3 font-inconsolata text-sm font-semibold uppercase tracking-[0.24em] transition ${
                      isActive
                        ? "bg-[linear-gradient(135deg,#fde68a,#f59e0b)] text-black"
                        : "border border-white/10 bg-black/20 text-white/72"
                    }`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AnimatedNavbar;
