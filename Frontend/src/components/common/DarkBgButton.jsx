import React from "react";
import { Link } from "react-router-dom";

const DarkBgButton = ({
  type = "button",
  handleClick = () => {},
  children,
  link = "",
  className = "",
}) => {
  const styelCss = `py-2 px-4 size-bold rounded-md bg-dark font-medium inline-block text-center text-white hover:bg-dark-hover hover:text-white hover:no-underline ${className}`;
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
