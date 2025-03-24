import React, { useEffect, useState, useRef } from "react";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Popular = () => {
  const [items, setItems] = useState([]);
  const [isGradientVisible, setIsGradientVisible] = useState(true);
  const [isInTheaters, setIsInTheaters] = useState(false);
  const scrollRef = useRef(null);

  const fetchPopularTVShows = async () => {
    try {
      const endpoint = `https://api.themoviedb.org/3/tv/popular?api_key=234e21b8f6a282a6624cf4404219df68&language=vi-VN&page=1`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setItems(data.results || []);
    } catch (error) {
      console.error("Error fetching popular TV shows:", error);
      setItems([]);
    }
  };

  const fetchMoviesInTheaters = async () => {
    try {
      const endpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=234e21b8f6a282a6624cf4404219df68&region=VN&language=vi-VN&page=1`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setItems(data.results || []);
    } catch (error) {
      console.error("Error fetching movies in theaters:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchPopularTVShows();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft > 100) {
          setIsGradientVisible(false);
        } else {
          setIsGradientVisible(scrollLeft + clientWidth < scrollWidth - 0);
        }
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

  const handleInTheatersClick = () => {
    if (!isInTheaters) {
      fetchMoviesInTheaters();
      setIsInTheaters(true);
    }
  };

  return (
    <div className="relative flex justify-center w-full ">
      <div className="overflow-x-auto scroll-smooth custom-scrollbar py-6 ">
        <div className="maxPrimaryPageWidth pl-10 relative">
          <div className="flex items-center gap-5">
            <h2 className="text-2xl font-semibold">Popular</h2>
            <div className="flex items-center border border-[#032541] rounded-full cursor-pointer">
              <button
                className={`px-5 py-1 rounded-full transition-colors duration-300 ease-in-out ${
                  isInTheaters
                    ? "bg-[#032541] text-[#71eabc]"
                    : "bg-[#032541] text-[#032541]"
                }`}
                onClick={handleInTheatersClick}
                style={{ padding: "4px 20px" }}
                disabled={isInTheaters}
              >
                In Theaters
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="pt-5 flex gap-4  whitespace-nowrap  relative"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="relative inline-block min-w-[150px] cursor-pointer"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.name || item.title}
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

                {/* Điểm đánh giá - Circular Progress */}
                <div
                  className={`absolute left-2 w-[40px] h-[40px] bg-[#081c22] p-[3px] rounded-full flex items-center justify-center ${
                    isInTheaters ? "bottom-25" : "bottom-20"
                  }`}
                >
                  {item.vote_average === 0 ? (
                    <span className="text-white text-xs font-bold">NR</span>
                  ) : (
                    <CircularProgressbar
                      value={Math.round(item.vote_average * 10)}
                      text={`${Math.round(item.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: "30px",
                        textColor: "white",
                        pathColor:
                          item.vote_average >= 7
                            ? "green"
                            : item.vote_average >= 5
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
                    {item.name || item.title}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {new Date(
                      item.first_air_date || item.release_date
                    ).toLocaleDateString()}
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

export default Popular;
