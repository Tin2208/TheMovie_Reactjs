import React, { useState, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";

const SearchList = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=234e21b8f6a282a6624cf4404219df68&query=${query}&language=vi-VN&page=1`
        );
        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="mb-4">
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results.length === 0 && !loading && (
        <p>There are no movies that matched your query..</p>
      )}

      {results.map((item) => (
        <div
          key={item.id}
          className="shadow-md border border-gray-300 bg-white rounded-lg flex mb-2"
        >
          <div
            className="h-[141px] w-auto min-w-[94px] flex items-center justify-center"
            style={{
              backgroundColor: item.poster_path ? "transparent" : "#dbdbdb",
            }}
          >
            {item.poster_path ? (
              <img
                className="w-full h-full object-cover rounded-l-lg "
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title || item.name}
              />
            ) : (
              <CiImageOn size="3rem" color="#757575" />
            )}
          </div>
          <div className="px-4 py-2.5 flex flex-col gap-5">
            <div>
              <h2 className="font-semibold ">{item.title || item.name}</h2>
              <span className="text-[#999]">
                {item.release_date || item.first_air_date || ""}
              </span>
            </div>
            <div>
              <p className="line-clamp-2 overflow-hidden text-ellipsis">
                {item.overview || ""}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
