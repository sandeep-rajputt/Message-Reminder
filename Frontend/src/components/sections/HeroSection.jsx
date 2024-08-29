import React from "react";
import LightBgButton from "../common/LightBgButton";

const HeroSection = () => {
  return (
    <section className="bg-hero-gradient text-white flex items-center justify-center">
      <div className="grid grid-cols-[1fr_1fr] py-28 max-w-device">
        <div className="ml-5 flex items-center justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-7xl font-bold ">Secure and Organized Notes</h2>
            <p className="text-xl text-white/60">
              NoteVault is the ultimate note-taking app, designed to keep your
              thoughts and ideas safe and organized.
            </p>
            <LightBgButton link="/signup" className="px-5 w-fit">
              Get Started
            </LightBgButton>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[80%] rounded-lg overflow-hidden">
            <img
              className="w-full"
              src="/hero.jpeg"
              alt="note vault hero image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
