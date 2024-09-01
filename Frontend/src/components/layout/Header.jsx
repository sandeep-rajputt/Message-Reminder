// src/components/Header.js
import React from "react";
import { useSelector } from "react-redux";
import HoverBoxLink from "../common/HoverBoxLink";
import DarkBgButton from "../common/DarkBgButton";
import DarkBorderButton from "../common/DarkBorderButton";
import LogoSvg from "../../assets/SVG Components/LogoSvg";
import HeaderUser from "./HeaderUser";

const Header = () => {
  const userData = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);
  console.log(status);

  return (
    <header className="fixed w-full bg-white flex items-center justify-center shadow-header z-10">
      <div className="flex justify-between px-6 py-4 max-w-device w-full">
        <div className="flex gap-2 items-center justify-center">
          <LogoSvg />
          <h1 className="text-2xl font-semibold">Message Reminder</h1>
        </div>
        {status === "loading" || status === "idle" ? (
          <></>
        ) : userData ? (
          <div className="flex gap-3 items-center justify-center font-normal">
            <ul className="flex gap-3 items-center justify-center mr-1">
              <li>
                <HoverBoxLink link="/dashboard" text="Dashboard" />
              </li>
              <li>
                <HoverBoxLink link="/set-reminder" text="Set New Reminder" />
              </li>
              <li>
                <HoverBoxLink link="/all-reminders" text="All Reminders" />
              </li>
            </ul>
            <div className="flex items-center justify-center">
              <HeaderUser user={userData} />
            </div>
          </div>
        ) : (
          <div>
            <nav>
              <ul className="flex gap-3 items-center justify-center">
                <li>
                  <DarkBgButton link="/signup">Sign Up</DarkBgButton>
                </li>
                <li>
                  <DarkBorderButton link="/login">Log In</DarkBorderButton>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
