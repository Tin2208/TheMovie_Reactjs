import React, { useState, useEffect } from "react";
import poster from "../assets/Image/poster.jpg"; // Giữ lại ảnh mặc định nếu cần

const Peoples = () => {
  const [popularPeople, setPopularPeople] = useState([]);
  const apiKey = "234e21b8f6a282a6624cf4404219df68";

  useEffect(() => {
    const fetchPopularPeople = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        setPopularPeople(data.results.slice(0, 20)); // Lấy 4 người đầu tiên
      } catch (error) {
        console.error("Error fetching popular people:", error);
      }
    };

    fetchPopularPeople();
  }, [apiKey]);

  return (
    <div className="mt-[110px]  flex justify-center">
      <div className="flex maxPrimaryPageWidth  p-[30px] px-[40px]  justify-center">
        <div className="mt-5 flex flex-col gap-7.5">
          <h2>
            <span className="font-bold text-2xl">Popular People</span>
          </h2>
          <div className="flex flex-wrap justify-between gap-5 ">
            {popularPeople.length > 0 ? (
              popularPeople.map((person) => (
                <div
                  key={person.id}
                  className="flex flex-col w-[240px] rounded-t-lg  shadow-[0_2px_8px_#0000001a] border border-[#e3e3e3]"
                >
                  <img
                    className="rounded-lg w-full h-auto oject-cover"
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                        : poster // Dùng ảnh mặc định nếu không có profile_path
                    }
                    alt={person.name}
                  />
                  <div className="py-2 px-[10px] bg-white">
                    <p className="font-semibold text-[1.1em]">{person.name}</p>
                    <p className="text-[0.9em] font-normal text-black/60">
                      {person.known_for
                        .map((work) => work.title || work.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading popular people...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Peoples;
