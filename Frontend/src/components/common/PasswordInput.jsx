import React, { useRef, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const PasswordInput = ({
  className = "",
  placeholder,
  value,
  handleChange,
  require = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const divElement = useRef(null);

  function handleFocus() {
    divElement.current.style.outline = "2.5px solid #111";
  }

  function handleBlur() {
    divElement.current.style.outline = "none";
  }

  return (
    <div
      ref={divElement}
      className="w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 grid grid-cols-[1fr_auto]"
    >
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        required={require}
        onChange={handleChange}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className={`focus:outline text-dark focus:outline-none ${className}`}
      />
      <button
        type="button"
        className="px-1"
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex="-1"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
      </button>
    </div>
  );
};

export default PasswordInput;
