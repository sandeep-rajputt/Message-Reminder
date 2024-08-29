import React from "react";
import { Link } from "react-router-dom";

const DarkBgButton = ({
  type = "button",
  handleClick = () => {
    console.log("click");
  },
  children,
  link = "",
  className = "",
}) => {
  const styelCss = `py-2 px-4 size-bold rounded-md bg-dark font-medium inline-block text-center text-white hover:bg-dark-hover ${className}`;
  console.log(link);
  if (link === "") {
    return (
      <button type={type} className={`${styelCss}`} onClick={handleClick}>
        {children}
      </button>
    );
  } else {
    return (
      <Link className={`${styelCss}`} to={link}>
        {children}
      </Link>
    );
  }
};

export default DarkBgButton;
