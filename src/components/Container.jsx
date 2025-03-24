import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Trending from "./Trending";
import Trailer from "./Trailer";
import Popular from "./Popular";
import SignUpBanner from "./SignUpBanner";

const Container = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Header />
      <HeroSection />
      <Trending />
      <Trailer />
      <Popular />
      <SignUpBanner />
    </div>
  );
};

export default Container;
