import React, { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import HeadlessuiMenuItem from "../common/HeadlessuiMenuItem";
import Textellipsis from "../common/Textellipsis";
import Hr from "../common/Hr";
import Overlay from "../common/Overlay";
import ConfirmBox from "../common/ConfirmBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../../store/slices/UserDataSlices";
import { useDispatch } from "react-redux";

const HeaderUser = ({ user }) => {
  const number = `+${user.number.slice(0, -5)}`;
  const image = user.image;
  const [logoutOverlay, setLogoutOverlay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    setLogoutOverlay(!logoutOverlay);
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
    <Menu>
      <>
        <MenuButton
          as="button"
          className={"rounded-full overflow-hidden w-full"}
        >
          <img src="user.png" className="w-8 h-8" alt="user profile" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className={
            "z-100 border mt-3 bg-white rounded-md shadow-md w-52 max-w-90% !overflow-hidden"
          }
          style={{ zIndex: 1000 }}
        >
          <div className="grid grid-cols-[auto_1fr] gap-1 px-3 py-1">
            <div className="flex items-center justify-center px-2">
              <img src={image} className="w-6 h-6 min-w-6" alt="user profile" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <Textellipsis className={"font-semibold overflow-hidden"}>
                {user.name}
              </Textellipsis>
              <Textellipsis className={"font-normal text-xs text-dark-grey/90"}>
                {number}
              </Textellipsis>
            </div>
          </div>
          <Hr />
          <div className="flex flex-col py-1">
            <HeadlessuiMenuItem href={"/setting"}>Setting</HeadlessuiMenuItem>
            <HeadlessuiMenuItem handleClick={handleLogout}>
              Sign out
            </HeadlessuiMenuItem>
          </div>
        </MenuItems>
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
      </>
    </Menu>
  );
};

export default HeaderUser;
