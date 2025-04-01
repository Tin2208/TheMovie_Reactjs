import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { fetchTVShows } from "../api/TVShowsApi"; // Sử dụng cùng API để lấy dữ liệu TV Shows

const TVShowList = ({ endpoint, title }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setShows([]); // Reset danh sách khi endpoint thay đổi
    setPage(1);
    fetchTVData(1);
  }, [endpoint]);

  const fetchTVData = async (pageNumber) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const newShows = await fetchTVShows(endpoint, pageNumber);
      setShows((prevShows) =>
        pageNumber === 1 ? newShows : [...prevShows, ...newShows]
      );
    } catch (err) {
      setError(err.message);
      setShows([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTVData(nextPage);
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (shows.length === 0) return <div>No TV shows found.</div>;

  return (
    <div>
      <div className="flex gap-4 flex-wrap justify-between">
        {shows.map((show) => (
          <div
            key={show.id}
            className="relative inline-block min-w-[180px] cursor-pointer border border-[#e3e3e3] rounded-[8px]"
          >
            {show.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
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
            <div className="absolute top-63 left-2 w-[40px] h-[40px] bg-[#081c22] p-[3px] rounded-full">
              {show.vote_average === 0 ? (
                <span className="text-white text-xs font-bold flex items-center justify-center h-full">
                  NR
                </span>
              ) : (
                <CircularProgressbar
                  value={Math.round(show.vote_average * 10)}
                  text={`${Math.round(show.vote_average * 10)}%`}
                  styles={buildStyles({
                    textSize: "30px",
                    textColor: "white",
                    pathColor:
                      show.vote_average >= 7
                        ? "green"
                        : show.vote_average >= 5
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
                {show.name}
              </h3>
              <p className="text-gray-500 text-xs">
                {new Date(show.first_air_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="load-more mt-4 px-4 py-2 bg-[#01b4e4] text-white rounded text-6 font-bold w-full"
        onClick={handleLoadMore}
        disabled={loadingMore}
      >
        <span className="hover:text-black cursor-pointer">
          {loadingMore ? "Loading..." : "Load More"}
        </span>
      </button>
    </div>
  );
};

export default TVShowList;
