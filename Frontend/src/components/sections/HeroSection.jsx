import React from "react";
import LightBgButton from "../common/LightBgButton";

const HeroSection = () => {
  return (
    <section className="bg-hero-gradient text-white flex items-center justify-center">
      <div className="grid grid-cols-[1fr_1fr] py-28 max-w-device">
        <div className="ml-5 flex items-center justify-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-7xl font-bold ">
              Never Forget a Message Again
            </h2>
            <p className="text-xl text-white/80">
              Message Reminder is a service that allows you to set and manage
              reminders that are sent directly to your WhatsApp. Never miss an
              important message again.
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
