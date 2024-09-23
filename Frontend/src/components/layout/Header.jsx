// src/components/Header.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HoverBoxLink from "../common/HoverBoxLink";
import DarkBgButton from "../common/DarkBgButton";
import DarkBorderButton from "../common/DarkBorderButton";
import LogoSvg from "../../assets/SVG Components/LogoSvg";
import HeaderUser from "./HeaderUser";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Overlay from "../common/Overlay";
import ConfirmBox from "../common/ConfirmBox";
import useWindowSize from "../../hooks/useWindowSize";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../store/slices/UserDataSlices";

const Header = () => {
  const userData = useSelector((state) => state.userData.userData);
  const status = useSelector((state) => state.userData.status);
  const { width } = useWindowSize();
  const isMobile = width < 900;
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutOverlay, setLogoutOverlay] = useState(false);

  function handleLogout() {
    setNavOpen(false);
    setLogoutOverlay(!logoutOverlay);
  }

  function handleClick() {
    if (isMobile) {
      setNavOpen(!navOpen);
    }
  }

  function cancelOverlay() {
    setLogoutOverlay(false);
  }

  function confirmLogout() {
    axios
      .get("/api/logout", { withCredentials: true })
      .then(() => {
        dispatch(clearUserData());
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLogoutOverlay(false);
      });
  }

  return (
    <header className="fixed w-full bg-white flex items-center justify-center shadow-header z-10">
      <div className="relative flex justify-between px-6 py-4 max-w-device w-full">
        <div className="flex gap-2 items-center justify-center">
          <LogoSvg />
          <h1 className="sm:text-2xl text-lg font-semibold pt-1">
            <Link
              className="text-black hover:text-dark active:text-dark focus:text-dark focus:no-underline"
              to="/"
            >
              Message Reminder
            </Link>
          </h1>
        </div>
        {isMobile && (
          <DarkBgButton handleClick={handleClick}>
            {navOpen ? <IoClose /> : <HiMenu />}
          </DarkBgButton>
        )}
        <div
          className={`flex flex-col ease-linear duration-300 transition-[left] ${
            isMobile && `fixed bg-white top-0 h-full w-full max-w-96`
          } ${isMobile && navOpen && "left-0"}
          ${isMobile && !navOpen && "left-[-100%]"}`}
        >
          {isMobile && (
            <DarkBgButton
              className="absolute top-5 right-5"
              handleClick={handleClick}
            >
              <IoClose />
            </DarkBgButton>
          )}

          {status === "loading" || status === "idle" ? (
            <></>
          ) : userData ? (
            <nav
              className={`flex ${
                isMobile && "flex-col mt-16"
              } gap-3 items-center justify-center font-normal`}
            >
              <ul
                className={`flex ${
                  isMobile && "flex-col"
                } gap-3 items-center justify-center mr-1`}
              >
                <li>
                  <button tabIndex={-1} onClick={handleClick}>
                    <HoverBoxLink
                      link="/set-reminder"
                      text="Set New Reminder"
                    />
                  </button>
                </li>
                <li>
                  <button tabIndex={-1} onClick={handleClick}>
                    <HoverBoxLink link="/all-reminders" text="All Reminders" />
                  </button>
                </li>
              </ul>
              {isMobile ? (
                <ul
                  className={`flex ${
                    isMobile && "flex-col"
                  } gap-3 items-center justify-center mr-1`}
                >
                  <li>
                    <button tabIndex={-1} onClick={handleClick}>
                      <HoverBoxLink link="/setting" text="Setting" />
                    </button>
                  </li>
                  <li>
                    <DarkBgButton handleClick={handleLogout}>
                      Sign Out
                    </DarkBgButton>
                  </li>
                  <li className={`${isMobile && "mt-2"}`}>
                    <button tabIndex={-1}>
                      <DarkBorderButton link="https://github.com/sandeep-rajputt/Message-Reminder">
                        Leave a ⭐ on Github
                      </DarkBorderButton>
                    </button>
                  </li>
                </ul>
              ) : (
                <div className="flex items-center justify-center">
                  <HeaderUser user={userData} />
                </div>
              )}
            </nav>
          ) : (
            <div>
              <nav>
                <ul
                  className={`flex gap-3 items-center justify-center ${
                    isMobile && "flex-col mt-16"
                  }`}
                >
                  <li>
                    <button tabIndex={-1} onClick={handleClick}>
                      <DarkBgButton link="/signup">Sign Up</DarkBgButton>
                    </button>
                  </li>
                  <li>
                    <button tabIndex={-1} onClick={handleClick}>
                      <DarkBorderButton link="/login">Log In</DarkBorderButton>
                    </button>
                  </li>
                  <li>
                    <button tabIndex={-1}>
                      <DarkBorderButton link="https://github.com/sandeep-rajputt/Message-Reminder">
                        Leave a ⭐ on Github
                      </DarkBorderButton>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
      {logoutOverlay && (
        <Overlay>
          <ConfirmBox
            handleCancel={cancelOverlay}
            handleConfirm={confirmLogout}
            heading={"Sign out"}
            text={"Are you sure you want to sign out?"}
          />
        </Overlay>
      )}
    </header>
  );
};

export default Header;
