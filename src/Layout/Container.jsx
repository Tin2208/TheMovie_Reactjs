import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Trending from "../components/Trending";
import Trailer from "../components/Trailer";
import Popular from "../components/Popular";
import SignUpBanner from "../components/SignUpBanner";

const Container = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      {/* <Header /> */}
      <HeroSection />
      <Trending />
      <Trailer />
      <Popular />
      <SignUpBanner />
    </div>
  );
};

export default Container;
