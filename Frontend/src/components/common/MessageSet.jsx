import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import DarkBorderButton from "./DarkBorderButton";
import { AiOutlineClose } from "react-icons/ai";

const MessageSet = ({ handleCloseModal, succes = "", error = "" }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-dark/30 px-5">
      <div className="flex flex-col gap-7 bg-white px-7 py-10 rounded-lg">
        <div
          className={`${
            succes ? "bg-green-100" : "bg-red-100"
          } w-24 h-24 flex items-center justify-center rounded-full mx-auto`}
        >
          {succes ? (
            <IoMdCheckmark className="text-green-500 text-5xl" />
          ) : (
            <AiOutlineClose className="text-red-500 text-5xl" />
          )}
        </div>
        <p className="text-center text-xl">{error ? error : succes}</p>
        <div className="flex items-center justify-center">
          <DarkBorderButton className="w-fit" handleClick={handleCloseModal}>
            close
          </DarkBorderButton>
        </div>
      </div>
    </div>
  );
};

export default MessageSet;
