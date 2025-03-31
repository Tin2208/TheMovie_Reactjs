import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import TVShowList from "../components/TVShowsList";

const TVShows = () => {
  const location = useLocation();

  // Danh sách các tab cho TV Shows
  const tabs = [
    { id: "popular", title: "Popular", endpoint: "/tv/popular" },
    { id: "airing-today", title: "Airing Today", endpoint: "/tv/airing_today" },
    { id: "on-the-air", title: "Airing TV Shows", endpoint: "/tv/on_the_air" },
    { id: "top-rated", title: "Top Rated", endpoint: "/tv/top_rated" },
  ];

  // Xác định tab hiện tại dựa trên pathname
  const currentTab =
    tabs.find((tab) => location.pathname.includes(tab.id)) || tabs[0]; // Mặc định là "popular" nếu không khớp

  return (
    <div>
      <div className="mt-[64px] flex justify-center p-[30px] px-[40px]">
        <div className="tv-page maxPrimaryPageWidth">
          {/* Tiêu đề */}
          <h3 className="text-[1.6em] font-bold pb-[20px]">
            {currentTab.title}
          </h3>

          <div className="flex gap-6">
            {/* Sidebar */}
            <SideBar />

            {/* Danh sách TV Shows */}
            <div className="flex-1">
              <TVShowList
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

export default TVShows;
