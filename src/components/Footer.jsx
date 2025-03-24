import React from "react";
import LogoFooter from "../assets/Logofooter.svg";

const Footer = () => {
  return (
    <div className="flex w-full justify-center bg-[radial-gradient(at_30%_top,_#031d33_0%,_#032541_70%)]">
      <div className="maxPrimaryPageWidth flex justify-center  py-20 gap-10">
        <div className="text-right relative -top-9 right-0">
          <img
            className="absolute top-0 right-0 w-[130px] h-[94px]"
            src={LogoFooter}
            alt="logo"
          />
          <button className="cursor-pointer relative font-bold top-[140px]  border-white bg-white text-[#01b4e4] text-[1.3em] inline-block border-2  rounded-md px-4 py-2 transition-all duration-100 ease-linear">
            JOIN THE COMMUNITY
          </button>
        </div>
        <div className="text-white">
          <h3 className="text-[1.4em] leading-[1.4em]">THE BASICS</h3>
          <ul className="text-[17px]">
            <li>
              <a href="/about">Giới thiệu về TMDB</a>
            </li>
            <li>
              <a href="/about/staying-in-touch">Contact Us</a>
            </li>
            <li>
              <a href="/talk">Support Forums</a>
            </li>
            <li>
              <a href="https://developer.themoviedb.org/docs" target="_blank">
                API Documentation
              </a>
            </li>
            <li>
              <a
                href="https://status.themoviedb.org/"
                target="_blank"
                rel="noopener"
              >
                System Status
              </a>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h3 className="text-[1.4em] leading-[1.4em]">GET INVOLVED</h3>
          <ul className="text-[17px]">
            <li>Contribution Bible</li>
            <li>Thêm phim mới</li>
            <li>Thêm chương trình TV mới</li>
          </ul>
        </div>
        <div className="text-white">
          <h3 className="text-[1.4em] leading-[1.4em]">COMMUNITY</h3>
          <ul className="text-[17px]">
            <li>
              <a href="/bible/general#674f287930fc85cab62597b4">Guidelines</a>
            </li>
            <li>
              <a href="/discuss">Discussions</a>
            </li>
            <li>
              <a href="/leaderboard">Leaderboard</a>
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h3 className="text-[1.4em] leading-[1.4em]">LEGAL</h3>
          <ul className="text-[17px]">
            <li>
              <a href="/terms-of-use">Terms of Use</a>
            </li>
            <li>
              <a href="/api-terms-of-use">API Terms of Use</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/dmca-policy">DMCA Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
