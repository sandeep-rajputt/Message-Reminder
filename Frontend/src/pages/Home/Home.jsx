import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import Features from "../../components/sections/Features";
import GetStarted from "../../components/sections/GetStarted";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <Features />
      <GetStarted />
    </main>
  );
};

export default Home;
