import React from "react";
import DarkBgButton from "../common/DarkBgButton";

const GetStarted = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="max-w-device w-full py-28 flex flex-col justify-center items-center gap-5">
        <h3 className="text-5xl font-bold text-center">
          Get Started with Message Reminder
        </h3>
        <p className="text-center text-dark-grey text-lg">
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
