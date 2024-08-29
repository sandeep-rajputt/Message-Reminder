import React from "react";
import { Link } from "react-router-dom";

const LightBgButton = ({
  handleClick = "",
  children,
  link = "",
  className = "",
}) => {
  const styelCss = `py-2 px-4 size-bold rounded-md bg-white font-medium inline-block text-black hover:bg-light-hover ${className}`;
  if (link === "") {
    return (
      <button className={`${styelCss}`} onClick={handleClick}>
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

export default LightBgButton;
