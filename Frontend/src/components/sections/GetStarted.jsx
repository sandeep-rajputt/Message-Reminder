import React from "react";
import DarkBgButton from "../common/DarkBgButton";

const GetStarted = () => {
  return (
    <section className="flex items-center justify-center px-5">
      <div className="max-w-device w-full py-28 flex flex-col justify-center items-center gap-5">
        <h3 className="xl:text-5xl md:text-3xl text-2xl font-bold text-center">
          Get Started with Message Reminder
        </h3>
        <p className="text-center text-dark-grey md:text-lg text-base">
          Sign up for free and start setting reminders for your important
          messages today.
        </p>
        <DarkBgButton link="/signup" className="px-6">
          Sign Up Free
        </DarkBgButton>
      </div>
    </section>
  );
};

export default GetStarted;
