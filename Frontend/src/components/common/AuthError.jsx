import React from "react";

const AuthError = ({ children }) => {
  return (
    <p className="text-red-500 w-full text-center break-words">{children}</p>
  );
};

export default AuthError;
