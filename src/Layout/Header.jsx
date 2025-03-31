import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Icons/Logo.svg";
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { fetchTrendingMovies } from "../api/MovieApi";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isMoviePage = location.pathname.startsWith("/movies");
  const isTVPage = location.pathname.startsWith("/tv");
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
      path: "/tv",
      options: ["Popular", "Airing Today", "On The Air", "Top Rated"],
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
        const trendingData = await fetchTrendingMovies("day"); // Gọi hàm fetchTrendingMovies
        setTrendingSearch(trendingData.slice(0, 10)); // Lấy 10 kết quả đầu tiên
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trending:", error.message);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery(false);
      } else {
        console.log("Click trong khu vực tìm kiếm, giữ dropdown");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchQuery(false);
    }
  };

  const handleTrendingClick = (term) => {
    if (!term) {
      return;
    }
    setSearchTerm(term);
    setSearchQuery(false);
    const searchUrl = `/search?query=${encodeURIComponent(term)}`;
    navigate(searchUrl);
  };

  const openSearch = () => {
    setSearchQuery(true);
  };

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
                {menu.title === "Movies" ||
                menu.title === "TV Shows" ||
                menu.title === "People" ? (
                  <span>{menu.title}</span>
                ) : (
                  <Link to={menu.path}>{menu.title}</Link>
                )}
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
                            .replace(/\s+/g, "-")}`}
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
            <li className="flex items-center">
              <button className="cursor-pointer" onClick={openSearch}>
                <IoSearchSharp size="1.4rem" color="#01b4e4" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {!(isMoviePage || isTVPage) && (
        <div ref={searchRef}>
          <div
            className={`w-full absolute left-0 border-t border-b border-[#e3e3e3] flex justify-center bg-white transition-all duration-300 z-40 ${
              isHeaderVisible ? "top-[64px]" : "top-0"
            }`}
          >
            <div className="h-[44px] flex relative">
              <div className="maxPrimaryPageWidth px-10 flex items-center h-full">
                <IoSearchSharp size="1.4rem" color="black" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phim, chương trình TV, người..."
                  className="w-full outline-none text-black h-full pl-[30px] placeholder:text-[#acacac]"
                  onFocus={() => setSearchQuery(true)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  value={searchTerm}
                />
              </div>
            </div>
          </div>
          {isSearchQuery && (
            <div>
              <div className="bg-[#f7f7f7] w-full absolute left-0 top-[110px] flex justify-center z-50">
                <div className="flex items-center gap-1.5 py-[10px] border-b border-[#e3e3e3] px-10 maxPrimaryPageWidth">
                  <IoMdTrendingUp color="black" />
                  <span className="text-[1.2em] font-bold text-black">
                    Trending
                  </span>
                </div>
              </div>
              <div className="bg-white w-full absolute left-0 top-[154px] flex justify-center z-50">
                <ul className="flex flex-col py-[10px] border-b border-[#e3e3e3] px-10 maxPrimaryPageWidth">
                  {trendingSearch.length > 0 ? (
                    trendingSearch.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-1.5 !w-full border-b border-[#e3e3e3] pt-[4px] pb-[5px] cursor-pointer hover:bg-[#dee2e6]"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(
                            "Nhấp vào item:",
                            item.title || item.name
                          );
                          handleTrendingClick(item.title || item.name);
                        }}
                      >
                        <IoSearchSharp size="1rem" color="black" />
                        <span className="text-black">
                          {item.title || item.name || "Không có tiêu đề"}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-black">Không có dữ liệu trending</li>
                  )}
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
