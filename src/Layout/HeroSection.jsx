import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=234e21b8f6a282a6624cf4404219df68`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const randomMovie =
            data.results[Math.floor(Math.random() * data.results.length)];
          setBackgroundImage(
            `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
          );
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div
      className="mt-[110px] w-full flex justify-center bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      <div className="px-[40px] py-[80px] maxPrimaryPageWidth ">
        <div>
          <h2 className="text-[48px] text-white font-bold">Welcome.</h2>
          <h3 className="text-[32px] text-white">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
        </div>
        <div className="flex items-center bg-white rounded-[30px] mt-[30px]">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person..."
            className="w-full h-full pl-[30px] placeholder:text-[#acacac] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <span
            className="h-[46px] cursor-pointer px-[26px] py-[10px] border-0 bg-gradient-to-r from-[#1ed5a9] to-[#01b4e4] rounded-[30px] hover:text-[#032541]  text-white"
            onClick={() =>
              searchTerm.trim() &&
              navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
            }
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
