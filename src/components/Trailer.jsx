import React, { useEffect, useState, useRef } from "react";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { fetchMovies } from "../api/MovieApi"; // Import hàm fetchMovies

const Trailer = () => {
  const [trailerMovies, setTrailerMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [isGradientVisible, setIsGradientVisible] = useState(true);
  const [hoveredPoster, setHoveredPoster] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const endpoint = `/movie/${category}`; // Điều chỉnh endpoint theo movieApi
        const movies = await fetchMovies(endpoint);
        if (movies.length > 0) {
          setTrailerMovies(movies.slice(0, 20));
          setHoveredPoster(
            movies[0].backdrop_path || movies[0].poster_path || ""
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      }
    };
    loadMovies();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setIsGradientVisible(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const videos = await fetchMovies(`/movie/${movieId}/videos`); // Điều chỉnh endpoint theo movieApi
      const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailer ? trailer.key : null;
    } catch (error) {
      console.error("Lỗi khi lấy trailer:", error);
      return null;
    }
  };

  const handlePosterClick = async (movie) => {
    const trailerKey = await fetchTrailer(movie.id);
    if (trailerKey) {
      setSelectedMovie({ ...movie, trailerKey });
    } else {
      alert("Không tìm thấy trailer cho phim này!");
    }
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div
      className="relative flex justify-center w-full bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: hoveredPoster
          ? `url(https://image.tmdb.org/t/p/original${hoveredPoster})`
          : "none",
      }}
    >
      <div className="max-w-[1300px] relative">
        <div className="flex items-center pt-[30px] pl-10">
          <h2 className="text-[24px] mr-5 text-white font-semibold">
            Latest Trailers
          </h2>
          <div className="relative flex items-center border border-[#1ed5a9] rounded-full cursor-pointer">
            <div
              className={`absolute top-0 h-full bg-[#1ed5a9] rounded-full transition-transform duration-300 ease-in-out ${
                category === "popular" ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ width: "50%" }}
            ></div>
            <button
              className={`relative px-5 py-1 rounded-full z-10 cursor-pointer ${
                category === "popular" ? "text-[#032541]" : "text-white"
              }`}
              onClick={() => setCategory("popular")}
            >
              Popular
            </button>
            <button
              className={`relative px-5 py-1 rounded-full z-10 cursor-pointer ${
                category === "now_playing" ? "text-[#032541]" : "text-white"
              }`}
              onClick={() => setCategory("now_playing")}
            >
              In Theaters
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="pt-5 flex gap-5 scroll-smooth custom-scrollbar overflow-x-auto pb-[30px] relative  "
        >
          {trailerMovies.map((movie) => (
            <div
              className="relative inline-block min-w-[300px] "
              key={movie.id}
              onMouseEnter={() => {
                if (movie.backdrop_path || movie.poster_path) {
                  setHoveredPoster(movie.backdrop_path || movie.poster_path);
                }
              }}
            >
              {movie.poster_path ? (
                <div
                  className="relative scale-100 cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => handlePosterClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="flex-shrink-0 object-cover rounded-lg w-full h-[calc(300px/1.78)] mx-10"
                  />
                  <FaPlay
                    color="white"
                    size={40}
                    className="absolute top-1/2 left-[calc(1/1.5*100%)] transform -translate-x-1/2 -translate-y-1/2 scale-130 hover:scale-130 transition-transform duration-300"
                  />
                  <div className="absolute top-[8px] right-[8px] cursor-pointer">
                    <HiMiniEllipsisHorizontalCircle
                      size={25}
                      className="text-[#a7b5b9] hover:text-[#01b4e5]"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-[calc(300px/1.78)] flex items-center justify-center bg-gray-200 rounded-lg">
                  No Image
                </div>
              )}
              <div className="pt-[26px] px-[10px] pb-[12px] min-w-[150px] text-white text-center">
                <h3 className="font-semibold mt-2 break-words text-[19px]">
                  {movie.title}
                </h3>
                <span className="text-[16px]">Watch Now</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
          <div className="relative w-[100%] max-w-[1228px]">
            <div className="p-4 bg-black rounded-t-lg flex items-center justify-between">
              <h3 className="text-white text-[20px] font-semibold">
                {selectedMovie.title}
              </h3>
              <button
                className="text-white opacity-50 hover:opacity-100 cursor-pointer"
                onClick={closePopup}
              >
                <IoClose size={20} />
              </button>
            </div>
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-b-lg"
                src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}?autoplay=1`}
                title={selectedMovie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trailer;
