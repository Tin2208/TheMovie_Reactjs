import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const searchCategories = [
  { id: "movie", title: "Movies" },
  { id: "tv", title: "TV Shows" },
  { id: "person", title: "People" },
  { id: "collection", title: "Collections" },
  { id: "company", title: "Companies" },
  { id: "keyword", title: "Keywords" },
  { id: "network", title: "Networks" },
];

const SearchSideBar = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  return (
    <div className="max-w-[260px] w-full flex flex-col gap-5">
      <div className="border border-[#e3e3e3] rounded-lg flex flex-col">
        <h3 className="bg-[#01b4e4] font-semibold p-5 text-white text-[1.2em] rounded-t-lg">
          Search Results
        </h3>

        <div className="py-2">
          <ul>
            {searchCategories.map((category) => (
              <li
                key={category.id}
                className="px-5 py-[10px] hover:bg-[#0000000a] cursor-pointer flex items-center justify-between"
              >
                <Link
                  to={`/search/${category.id}?query=${encodeURIComponent(
                    query
                  )}`}
                  className="search_tab"
                  title={category.title}
                >
                  {category.title}
                </Link>
                <span>0</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-[5px]">
        <span className="relative top-1">
          <BsFillInfoCircleFill size={22} />
        </span>
        <p>
          Tip: You can use the 'y:' filter to narrow your results by year.
          Example: 'star wars y:1977'.
        </p>
      </div>
    </div>
  );
};

export default SearchSideBar;
