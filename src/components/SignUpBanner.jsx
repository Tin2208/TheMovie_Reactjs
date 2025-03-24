import React from "react";

const SignUpBanner = () => {
  return (
    <div className="w-full bg-[#032541] flex justify-center">
      <div className="maxPrimaryPageWidth flex  p-[30px_40px] flex-col">
        <div>
          <h2 className="font-bold text-2xl text-white">Join Today</h2>
        </div>
        <div className="py-5 flex gap-10  ">
          <div className="flex gap-[30px] flex-col w-[65%]">
            <p className="text-[1.2em] text-white">
              Get access to maintain your own{" "}
              <em className="opacity-70">custom personal lists</em>,{" "}
              <em className="opacity-70">track what you've seen</em> and search
              and filter for <em className="opacity-70">what to watch next</em>
              —regardless if it's in theatres or on TV.
            </p>
            <p>
              <button className="text-white text-[0.9em] cursor-pointer bg-[#805be7] border-2 border-[#805be7]  rounded-md px-4 py-2 transition-all duration-100 ease-linear">
                Sign Up
              </button>
            </p>
          </div>

          <div>
            <ul className="text-white text-1xl list-disc">
              <li>Enjoy TMDB ad free</li>
              <li>Maintain a personal watchlist</li>
              <li>
                Filter by your subscribed streaming services and find something
                to watch
              </li>
              <li>Log the movies and TV shows you've seen</li>
              <li>Build custom lists</li>
              <li>Contribute to and improve our database</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpBanner;
