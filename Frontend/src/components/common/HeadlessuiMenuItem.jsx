import React from "react";
import { MenuItem } from "@headlessui/react";
import { Link } from "react-router-dom";

const HeadlessuiMenuItem = ({
  children,
  className = "",
  href,
  handleClick,
}) => {
  const classes = "py-1 pl-6 tracking-tight hover:bg-light-hover";
  return (
    <MenuItem className={`m-1 text-sm cursor-pointer ${className}`}>
      {href ? (
        <Link to={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button className={`${classes} text-start`} onClick={handleClick}>
          {children}
        </button>
      )}
    </MenuItem>
  );
};

export default HeadlessuiMenuItem;
