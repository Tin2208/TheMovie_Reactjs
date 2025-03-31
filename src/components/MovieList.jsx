import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";
import { fetchMovies } from "../api/MovieApi"; // Import module API riêng

const MovieList = ({ endpoint, title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setMovies([]); // Reset danh sách khi endpoint thay đổi
    setPage(1);
    fetchMovieData(1);
  }, [endpoint]);

  const fetchMovieData = async (pageNumber) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);

      const newMovies = await fetchMovies(endpoint, pageNumber);
      setMovies((prevMovies) =>
        pageNumber === 1 ? newMovies : [...prevMovies, ...newMovies]
      );
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovieData(nextPage);
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (movies.length === 0) return <div>No movies found.</div>;

  return (
    <div>
      <div className="flex gap-4 flex-wrap justify-between">
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

export default MovieList;
