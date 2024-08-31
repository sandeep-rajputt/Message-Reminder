import React from "react";

const Loader = ({ color = "black", className = "" }) => {
  return (
    <div
      className={`w-6 h-6 border-2 border-opacity-10 border-${color} border-l-transparent rounded-full animate-spin ${className}`}
    ></div>
  );
};

export default Loader;
