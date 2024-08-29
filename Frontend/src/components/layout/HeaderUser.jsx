import React, { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import HeadlessuiMenuItem from "../common/HeadlessuiMenuItem";
import Textellipsis from "../common/Textellipsis";
import Hr from "../common/Hr";
import Overlay from "../common/Overlay";
import ConfirmBox from "../common/ConfirmBox";

const HeaderUser = () => {
  const [logoutOverlay, setLogoutOverlay] = useState(false);

  function handleLogout() {
    setLogoutOverlay(!logoutOverlay);
  }

  function cancelOverlay() {
    setLogoutOverlay(false);
  }

  function confirmLogout() {
    console.log("Logout confirmed");
    setLogoutOverlay(false);
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
              <img
                src="user.png"
                className="w-6 h-6 min-w-6"
                alt="user profile"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <Textellipsis className={"font-semibold overflow-hidden"}>
                John Doe
              </Textellipsis>
              <Textellipsis className={"font-normal text-xs text-dark-grey/90"}>
                +91 9876543210
              </Textellipsis>
            </div>
          </div>
          <Hr />
          <div className="flex flex-col">
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
