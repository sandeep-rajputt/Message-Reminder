import React from "react";

const Input = ({
  handleChange = () => {},
  value = "",
  placeholder = "",
  require = true,
  type = "text",
  disabled = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      required={require}
      className="w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 focus:outline text-dark font-normal"
      placeholder={placeholder}
    />
  );
};

export default Input;
