import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // Thêm useLocation
import Logo from "../assets/logo.svg";
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const location = useLocation(); // Lấy đường dẫn hiện tại
  const isMoviePage = location.pathname.startsWith("/movies"); // Kiểm tra nếu trang là Movies
  const [trendingSearch, setTrendingSearch] = useState([]);
  const [isSearchQuery, setSearchQuery] = useState(false);
  const searchRef = useRef(null);

  const menus = [
    {
      title: "Movies",
      path: "/movies",
      options: ["Popular", "Now Playing", "Upcoming", "Top Rated"],
    },
    {
      title: "TV Shows",
      path: "/tv-shows",
      options: ["Popular", "Now Playing", "Upcoming", "Top Rated"],
    },
    { title: "People", path: "/people", options: ["Popular People"] },
    {
      title: "More",
      path: "/more",
      options: ["Discussions", "Leaderboard", "Support", "API Documentation"],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 0 && !activeMenu) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeMenu]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?api_key=234e21b8f6a282a6624cf4404219df68&language=vi-VN&page=1"
        );
        const data = await response.json();
        setTrendingSearch(data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching trending:", error);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-16 bg-[#032541] text-white flex justify-center z-50`}
    >
      <div
        className={`maxPrimaryPageWidth flex items-center justify-between px-10 text-base transition-all duration-300 z-60 ${
          isHeaderVisible
            ? "transform translate-y-0 opacity-100"
            : "transform -translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="flex items-center">
          <Link to="/">
            <img className="mr-4" src={Logo} alt="Logo" />
          </Link>
          <ul className="flex gap-[30px]">
            {menus.map((menu, index) => (
              <li
                key={index}
                className="relative cursor-pointer py-[10px]"
                onMouseEnter={() => setActiveMenu(menu.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link to={menu.path}>{menu.title}</Link>
                {activeMenu === menu.title && (
                  <ul
                    className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-max py-1 z-60"
                    style={{ zIndex: 60 }}
                    onMouseEnter={() => setActiveMenu(menu.title)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    {menu.options.map((option, i) => (
                      <li
                        key={i}
                        className="px-4 py-2 hover:bg-gray-200 pt-[4px] pr-[48px] pb-[4px] pl-[16px]"
                      >
                        <Link
                          to={`${menu.path}/${option
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {option}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4">
          <ul className="flex gap-[30px] items-center py-2.5">
            <li>
              <Link to="/add">
                <FaPlus size="1.4rem" />
              </Link>
            </li>
            <li className="border border-white rounded-[3px] text-[14px] font-semibold px-[5px] py-[3px] hover:bg-white hover:text-[#032541] hover:cursor-pointer">
              <Link to="/language/vi">VI</Link>
            </li>
            <li>
              <Link to="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link to="/join">Tham gia TMDB</Link>
            </li>
            <li className="flex items-center ">
              <button
                className="cursor-pointer"
                onClick={() => setSearchQuery(true)}
              >
                <IoSearchSharp size="1.4rem" color="#01b4e4" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Ẩn ô Search bar nếu đang ở trang Movies */}
      {!isMoviePage && (
        <div>
          <div
            className={`w-full absolute left-0 border-t border-b border-[#e3e3e3] flex justify-center bg-white transition-all duration-300 z-40 ${
              isHeaderVisible ? "top-[64px]" : "top-0"
            }`}
          >
            <div className=" h-[44px] flex  relative">
              <div ref={searchRef}>
                <div className="maxPrimaryPageWidth px-10 flex items-center h-full">
                  <IoSearchSharp size="1.4rem" color="black" />
                  <input
                    type="text"
                    placeholder="Search for a movie, tv show, person..."
                    className="w-full outline-none text-black h-full pl-[30px] placeholder:text-[#acacac]"
                    onFocus={() => setSearchQuery(true)}
                  />
                </div>
              </div>
            </div>
          </div>
          {isSearchQuery && (
            <div>
              <div className=" bg-[#f7f7f7] w-full absolute left-0 top-[110px] flex justify-center">
                <div className="flex items-center gap-1.5 py-[10px] border-b border-[#e3e3e3] px-10  maxPrimaryPageWidth">
                  <IoMdTrendingUp color="black" />
                  <span className="text-[1.2em] font-bold text-black">
                    Trending
                  </span>
                </div>
              </div>
              <div className="bg-white w-full absolute left-0 top-[154px] flex justify-center">
                <ul className="flex  flex-col py-[10px] border-b border-[#e3e3e3] px-10  maxPrimaryPageWidth">
                  {trendingSearch.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="flex items-center gap-1.5 !w-full border-b border-[#e3e3e3] pt-[4px] pb-[5px] cursor-pointer hover:bg-[#dee2e6]"
                        onClick={() => setSearchQuery(false)}
                      >
                        <IoSearchSharp size="1rem" color="black" />
                        <span className="text-black">
                          {item.title || item.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
