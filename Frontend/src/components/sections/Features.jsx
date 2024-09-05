import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiRepeat } from "react-icons/fi";

const featuresData = [
  {
    icon: <FaWhatsapp size={"40px"} />,
    title: "WhatsApp Reminders",
    discription:
      "Set reminders that are sent directly to your WhatsApp, so you never miss an important message.",
  },
  {
    icon: <CiCalendarDate size={"40px"} />,
    title: "Scheduled Reminders",
    discription:
      "Schedule reminders to be sent at specific times, so you're always prepared.",
  },
  {
    icon: <FaTelegramPlane size={"40px"} />,
    title: "Telegram Reminders",
    discription:
      "In the future, we'll add support for Telegram reminders as well.",
  },
  {
    icon: <FaInstagram size={"40px"} />,
    title: "Instagram Reminders",
    discription:
      "We're also planning to add support for Instagram reminders in the future.",
  },
  {
    icon: <IoMdNotificationsOutline size={"40px"} />,
    title: "Reminder Notifications",
    discription:
      "Get push notifications on your device when your reminders are sent, so you never miss a beat.",
  },
  {
    icon: <FiRepeat size={"40px"} />,
    title: "Recurring Reminders",
    discription:
      "Set reminders to repeat daily, weekly, or monthly, so you never forget important messages.",
  },
];

const Features = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="max-w-device w-full py-28 flex flex-col justify-center items-center gap-20 px-20">
        <div className="grid gap-5 ">
          <h3 className="xl:text-5xl text-3xl font-bold text-center">
            Features That Matter
          </h3>
          <p className="text-center text-dark-grey md:text-lg text-base">
            Message Reminder offers a suite of powerful features to help you
            never forget an important message.
          </p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_1fr] grid-cols-1 gap-10">
          {featuresData.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full max-w-96 grid grid-rows-[auto_auto_1fr] gap-2"
              >
                <div className="flex justify-center items-center">
                  {item.icon}
                </div>
                <h4 className="text-center font-bold">{item.title}</h4>
                <p className="text-center text-dark-grey">{item.discription}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
