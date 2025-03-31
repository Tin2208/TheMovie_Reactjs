import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import MovieList from "../components/MovieList";

const Movie = () => {
  const location = useLocation();

  // Danh sách các tab
  const tabs = [
    { id: "popular", title: "Popular", endpoint: "/movie/popular" },
    { id: "now-playing", title: "Now Playing", endpoint: "/movie/now_playing" },
    { id: "upcoming", title: "Upcoming", endpoint: "/movie/upcoming" },
    { id: "top-rated", title: "Top Rated", endpoint: "/movie/top_rated" },
  ];

  // Xác định tab hiện tại dựa trên pathname
  const currentTab =
    tabs.find((tab) => location.pathname.includes(tab.id)) || tabs[0]; // Mặc định là "popular" nếu không khớp

  return (
    <div>
      <div className="mt-[64px] flex justify-center p-[30px] px-[40px]">
        <div className="movie-page maxPrimaryPageWidth">
          {/* Tiêu đề */}
          <h3 className="text-[1.6em] font-bold pb-[20px]">
            {currentTab.title}
          </h3>

          <div className="flex gap-6">
            {/* Sidebar */}
            <SideBar />

            {/* Movie List */}
            <div className="flex-1">
              <MovieList
                endpoint={currentTab.endpoint}
                title={currentTab.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
