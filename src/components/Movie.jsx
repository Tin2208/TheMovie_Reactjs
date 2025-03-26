import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { TbCalendarEvent } from "react-icons/tb";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import arrowDown from "../assets/arrowDown.svg";
import Header from "./Header";
const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=234e21b8f6a282a6624cf4404219df68&region=VN&language=vi-VN&page=1`;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(ENDPOINT);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No movies found.
      </div>
    );
  }

  return (
    <div>
      <div className="mt-[64px] flex justify-center p-[30px] px-[40px]">
        <div className="movie-page maxPrimaryPageWidth">
          <div className="pb-[20px]">
            <h3 className="text-[1.6em] font-bold">Popular Movies</h3>
          </div>
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="sidebar w-[260px]">
              <div className="filters">
                <div className="shadow-md shadow-black/10 max-w-[260px] mb-3 border border-[#e3e3e3] rounded-[8px] flex text-[1.1em] justify-between items-center p-[14px] px-[16px] font-bold">
                  <h2>Sort</h2>
                  <span className="font-bold">
                    <MdNavigateNext size={24} />
                  </span>
                </div>
                <div className="shadow-md shadow-black/10 max-w-[260px] border border-[#e3e3e3] rounded-[8px]">
                  <div className="p-[14px] px-[16px]">
                    <div className="text-[1.1em] font-bold justify-between items-center flex">
                      <h2>Filters</h2>
                      <span className="font-bold">
                        <MdNavigateNext size={24} />
                      </span>
                      <span>
                        <MdKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="p-[14px] px-[16px]">
                    <div className="flex items-center mb-[10px]">
                      <h3 className="text-[1em] font-light">Show Me</h3>
                      <BsQuestionCircleFill
                        className="text-gray-600 text-xl ml-[6px]"
                        size={16}
                      />
                    </div>
                    <div className="flex flex-col text-4">
                      <label>
                        <input type="radio" name="filter" defaultChecked />
                        <span className="ml-1">Everything</span>
                      </label>
                      <label>
                        <input type="radio" name="filter" value="not-seen" />
                        <span className="ml-1">Movies I Haven't Seen</span>
                      </label>
                      <label>
                        <input type="radio" name="filter" value="seen" />
                        <span className="ml-1">Movies I Have Seen</span>
                      </label>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h3 className="text-[1em] font-light">Release Dates</h3>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" />
                      <span className="ml-1">Search all releases?</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mt-[8px]">
                        <span>from</span>
                        <div className="border border-[#21252933] flex items-center justify-between rounded-[6px]">
                          <span className="py-[6px] px-[12px] text-[#a4a4a4]">
                            undefined
                          </span>
                          <button className="p-[10px] bg-[#dee2e6]">
                            <TbCalendarEvent />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-[8px]">
                        <span>to</span>
                        <div className="border border-[#21252933] flex items-center justify-between rounded-[6px]">
                          <span className="py-[6px] px-[12px] text-[#a4a4a4]">
                            undefined
                          </span>
                          <button className="p-[10px] bg-[#dee2e6]">
                            <TbCalendarEvent />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h4 className="text-[1em] font-light">Genres</h4>
                    </div>
                    <ul className="flex flex-col gap-2">
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Chương trình truyền hình</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Bí Ẩn</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Chiến Tranh</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Chính Kịch</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Gia Đình</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Giả Tưởng</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Gân Cấn</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Hoạt Hình</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Hài</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Hành Động</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Hình Sự</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Khoa Học Viễn Tưởng</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Kinh Dị</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Lãng Mạn</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Lịch Sử</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Miền Tây</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Nhạc</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Phiêu Lưu</a>
                      </li>
                      <li className="border border-[#9e9e9e] rounded-[14px] py-[4px] px-[12px] w-max">
                        <a href="#">Phim Tài Liệu</a>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <h3 className="text-[1em] font-light ">Certification</h3>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div className="flex items-center mb-[10px]">
                      <h3 className="text-[1em] font-light">Language </h3>
                      <BsQuestionCircleFill
                        className="text-gray-600 text-xl ml-[6px]"
                        size={16}
                      />
                    </div>
                    <div className=" flex items-center justify-between bg-[#dee2e6] rounded-[8px]">
                      <span className="py-[6px] px-[12px]">None Selected</span>
                      <button className="p-[6px]">
                        <img className="w-6 " src={arrowDown} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h3 className="text-[1em] font-light mb-2.5">
                        User Score
                      </h3>
                    </div>
                    <div className="">
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className=" h-2 relative flex items-center">
                        <div className="bg-[#01b3e4] h-1 w-full"></div>
                        <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -left-[6px]"></div>
                        <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -right-[6px]"></div>
                      </div>
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className="flex  justify-between">
                        <span class="relative -left-[3px] text-[#b7b7b7]">
                          0
                        </span>
                        <span class="relative -right-[4px] text-[#b7b7b7]">
                          5
                        </span>
                        <span class="relative -right-[4px] text-[#b7b7b7]">
                          10
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h3 className="text-[1em] font-light mb-2.5">
                        Minimum User Votes
                      </h3>
                    </div>
                    <div className="">
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className=" h-2 relative flex items-center">
                        <div className="bg-[#01b3e4] h-1 w-full"></div>
                        <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -left-[6px]"></div>
                      </div>
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className="flex  justify-between">
                        <span class="relative -left-[3px] text-[#b7b7b7]">
                          0
                        </span>
                        <span class="relative -right-[4px] text-[#b7b7b7]">
                          100
                        </span>
                        <span class="relative -right-[6px] text-[#b7b7b7]">
                          200
                        </span>
                        <span class="relative -right-[8px] text-[#b7b7b7]">
                          300
                        </span>
                        <span class="relative -right-[8px] text-[#b7b7b7]">
                          400
                        </span>
                        <span class="relative -right-[10px] text-[#b7b7b7]">
                          500
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h3 className="text-[1em] font-light mb-2.5">Runtime</h3>
                    </div>
                    <div className="">
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>

                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>

                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className=" h-2 relative flex items-center">
                        <div className="bg-[#01b3e4] h-1 w-full"></div>
                        <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -left-[6px]"></div>
                        <div className="w-[14px] h-[14px] bg-[#01b3e4] rounded-full absolute -right-[6px]"></div>
                      </div>
                      <div>
                        <ul className="flex flex-1 flex-inherit justify-between items-center">
                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>

                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>

                          <li className="border-l-2 border-gray-400 h-2"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-1"></li>
                          <li className="border-l-2 border-gray-400 h-2"></li>
                        </ul>
                      </div>
                      <div className="flex  justify-between">
                        <span class="relative -left-[3px] text-[#b7b7b7]">
                          0
                        </span>
                        <span class="relative -right-[6px] text-[#b7b7b7]">
                          120
                        </span>
                        <span class="relative -right-[8px] text-[#b7b7b7]">
                          240
                        </span>
                        <span class="relative -right-[10px] text-[#b7b7b7]">
                          360
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-[#e3e3e3]"></div>
                  <div className="pt-[14px] px-[16px] pb-[16px]">
                    <div>
                      <h3 className="text-[1em] font-light mb-2.5">Keywords</h3>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Filter by Keywords..."
                        className="border border-[#9e9e9e] rounded-[8px] py-1.5 px-3 w-full placeholder-black"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="w-full mt-5 flex justify-center items-center rounded-[20px] h-[44px] bg-[#01b4e4] text-[1.2em] text-white font-semibold">
                    SEARCH
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách phim */}
            <div className="flex-1">
              <div className=" flex gap-4 flex-wrap whitespace-nowrap relative justify-between">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative inline-block min-w-[180px] cursor-pointer border border-[#e3e3e3] rounded-[8px]"
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="object-cover rounded-t-[8px] w-[180px] h-[273px]"
                      />
                    ) : (
                      <div className="w-full h-[273px] flex items-center justify-center bg-gray-200 rounded-lg">
                        No Image
                      </div>
                    )}
                    <div className="absolute top-2 right-2 z-10 cursor-pointer">
                      <HiMiniEllipsisHorizontalCircle
                        size={25}
                        className="text-[#a7b5b9] hover:text-[#01b4e5]"
                      />
                    </div>
                    <div className="absolute bottom-20 left-2 w-[40px] h-[40px] bg-[#081c22] p-[3px] rounded-full">
                      {movie.vote_average === 0 ? (
                        <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                          NR
                        </span>
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
              <button className="load-more mt-4 px-4 py-2 bg-[#01b4e4] text-white rounded text-6 font-bold w-full">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
