import React from "react";
import { Link } from "react-router-dom";

const HoverBoxLink = ({ link, text }) => {
  return (
    <Link
      to={link}
      className="py-2 px-4 size-normal hover:bg-light-hover text-center rounded-md inline-block"
    >
      {text}
    </Link>
  );
};

export default HoverBoxLink;
