import React from "react";
import { Link } from "react-router-dom";

const DarkBorderButton = ({
  handleClick = () => {},
  children,
  link = "",
  className = "",
}) => {
  const styelCss = `py-2 px-4 size-bold rounded-md shadow-inner-border font-medium inline-block text-dark hover:bg-light-hover hover:text-dark hover:no-underline ${className}`;
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

export default DarkBorderButton;
