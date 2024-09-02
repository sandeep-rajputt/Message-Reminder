import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import DarkBorderButton from "../../components/common/DarkBorderButton";

const SuccesfullMessageSet = ({ handleCloseModal }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-dark/30">
      <div className="flex flex-col gap-7 bg-white px-7 py-10 rounded-lg">
        <div className="bg-green-100 w-24 h-24 flex items-center justify-center rounded-full mx-auto">
          <IoMdCheckmark className="text-green-500 text-5xl" />
        </div>
        <p className="text-center text-xl">
          Your reminder has been set successfully.
        </p>
        <div className="flex items-center justify-center">
          <DarkBorderButton className="w-fit" handleClick={handleCloseModal}>
            ok
          </DarkBorderButton>
        </div>
      </div>
    </div>
  );
};

export default SuccesfullMessageSet;
