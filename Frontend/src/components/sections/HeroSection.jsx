import React from "react";
import LightBgButton from "../common/LightBgButton";

const HeroSection = () => {
  return (
    <section className="bg-hero-gradient text-white flex items-center justify-center">
      <div className="grid xl:grid-cols-[1fr_1fr] grid-cols-1 gap-10 xl:gap-0 py-28 max-w-device px-5">
        <div className="ml-5 flex items-center justify-center">
          <div className="flex flex-col gap-5 items-center xl:items-start">
            <h2 className="xl:text-7xl text-5xl font-bold text-center xl:text-start">
              Never Forget a Message Again
            </h2>
            <p className="md:text-xl text-base text-white/80 text-center xl:text-start max-w-4xl">
              Message Reminder is a service that allows you to set and manage
              reminders that are sent directly to your{" "}
              <span className="text-green-500">WhatsApp</span>. Never miss an
              important message again.
            </p>
            <LightBgButton link="/signup" className="px-5 w-fit">
              Get Started
            </LightBgButton>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="xl:w-[80%] lg:w-[50%] md:w-[60%] w-full rounded-xl overflow-hidden">
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
