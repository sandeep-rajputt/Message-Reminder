import React from "react";
import { BiError } from "react-icons/bi";
import DarkBgButton from "../../components/common/DarkBgButton";

const Error = () => {
  return (
    <div className="w-full h-full flex justify-center items-center py-5 px-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <BiError size={100} />
        <h2 className="text-7xl font-bold">404</h2>
        <p className="text-3xl font-bold text-dark-grey/70">
          Oops! Page not found.
        </p>
        <DarkBgButton link="/" className="mt-3">
          Go Back Home
        </DarkBgButton>
      </div>
    </div>
  );
};

export default Error;
