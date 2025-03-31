import React, { useEffect, useState, useRef } from "react";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import bgTrending from "../assets/Image/bgTrending.svg";
import { fetchTrendingMovies } from "../api/MovieApi";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isGradientVisible, setIsGradientVisible] = useState(true);
  const scrollRef = useRef(true);
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const movies = await fetchTrendingMovies(timeWindow);
        setTrendingMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    getTrendingMovies();
  }, [timeWindow]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setIsGradientVisible(scrollLeft + clientWidth < scrollWidth - 0);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleTimeWindowChange = (window) => {
    setTimeWindow(window);
  };

  return (
    <div className="relative flex justify-center w-full">
      <div>
        <div
          className="maxPrimaryPageWidth pl-10 relative bg-no-repeat bg-[50%_200px]"
          style={{ backgroundImage: `url(${bgTrending})` }}
        >
          <div className="flex items-center gap-5 pt-[30px]">
            <h2 className="text-2xl font-semibold">Trending</h2>
            <div className="relative flex items-center border border-[#032541] rounded-full cursor-pointer">
              <div
                className={`absolute top-0 h-full bg-[#032541] rounded-full transition-transform duration-300 ease-in-out ${
                  timeWindow === "day" ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ width: "50%" }}
              ></div>
              <button
                className={`relative px-5 py-1 rounded-full transition-colors cursor-pointer duration-300 ease-in-out z-10 ${
                  timeWindow === "day" ? "text-[#71eabc]" : "text-black"
                }`}
                onClick={() => handleTimeWindowChange("day")}
                style={{ padding: "4px 20px" }}
              >
                Today
              </button>
              <button
                className={`relative cursor-pointer px-5 py-1 rounded-full transition-colors duration-300 ease-in-out z-10 ${
                  timeWindow === "week" ? "text-[#71eabc]" : "text-black"
                }`}
                onClick={() => handleTimeWindowChange("week")}
                style={{ padding: "4px 20px" }}
              >
                This Week
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="pt-5 pb-[30px] flex gap-4 whitespace-nowrap overflow-x-auto scroll-smooth custom-scrollbar relative"
          >
            {trendingMovies.map((movie) => (
              <div
                key={movie.id}
                className="relative inline-block min-w-[150px] cursor-pointer"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="object-cover rounded-lg w-full h-[225px]"
                  />
                ) : (
                  <div className="w-full h-[225px] flex items-center justify-center bg-gray-200 rounded-lg">
                    No Image
                  </div>
                )}
                <div className="absolute top-2 right-2 z-10 cursor-pointer">
                  <HiMiniEllipsisHorizontalCircle
                    size={25}
                    className="text-[#a7b5b9] hover:text-[#01b4e5]"
                  />
                </div>
                <div className="absolute bottom-30 left-2 w-[40px] h-[40px] bg-[#081c22] p-[3px] rounded-full">
                  {movie.vote_average === 0 ? (
                    <span className="text-white text-xs font-bold">NR</span>
                  ) : (
                    <CircularProgressbar
                      value={Math.round(movie.vote_average * 10)}
                      text={`${Math.round(movie.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: "30px",
                        textColor: "white",
                        pathColor:
                          movie.vote_average >= 7
                            ? "green"
                            : movie.vote_average >= 5
                            ? "yellow"
                            : "red",
                        trailColor: "#204529",
                        backgroundColor: "#081c22",
                      })}
                    />
                  )}
                </div>
                <div className="pt-6 px-2 pb-3 text-sm min-w-[150px]">
                  <h3 className="font-bold mt-2 break-words max-w-[150px] whitespace-normal text-ellipsis overflow-hidden">
                    {movie.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`w-10 h-full absolute top-0 right-0 bg-gradient-to-r from-transparent to-white transition-opacity duration-300 ease-linear ${
              isGradientVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
