import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import SearchSideBar from "../components/SearchSideBar";
import SearchList from "../components/SearchList";

const Search = () => {
  const location = useLocation(); // Lấy thông tin location
  const queryParams = new URLSearchParams(location.search); // Phân tích query string
  const query = queryParams.get("query"); // Lấy giá trị của tham số 'query'

  return (
    <div className="mt-[110px] flex justify-center">
      <div className="flex gap-7.5 maxPrimaryPageWidth p-[30px] px-[40px]">
        <SearchSideBar />
        <SearchList query={query} />
      </div>
    </div>
  );
};

export default Search;
