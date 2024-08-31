import React, { useState } from "react";
import DarkBgButton from "../../components/common/DarkBgButton";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import validateEmail from "../../utils/validateEmail";
import Loader from "../../components/common/Loader";
import PasswordInput from "../../components/common/PasswordInput";
import AuthError from "../../components/common/AuthError";
import NumberInput from "../../components/common/NumberInput";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [country, setCountry] = useState("+91");

  function handleCountryChange(e) {
    setCountry(e.target.value);
  }

  function handleNumber(e) {
    if (
      e.nativeEvent.data == "1" ||
      e.nativeEvent.data == "2" ||
      e.nativeEvent.data == "3" ||
      e.nativeEvent.data == "4" ||
      e.nativeEvent.data == "5" ||
      e.nativeEvent.data == "6" ||
      e.nativeEvent.data == "7" ||
      e.nativeEvent.data == "8" ||
      e.nativeEvent.data == "9" ||
      e.nativeEvent.data == "0" ||
      e.nativeEvent.data == null
    ) {
      setNumber(e.target.value);
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    if (email && !validateEmail(email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    } else if (!password) {
      setError("Please enter a password");
      setLoading(false);
      return;
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    } else {
      setError("");
    }

    if (error) {
      setLoading(false);
    }

    console.log("signup");

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-full py-14 px-5">
      <form
        className="w-full flex flex-col gap-14 max-w-lg shadow-inner-border rounded-md px-6 pt-10 pb-2"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-semibold">
            Sign Up to Message Reminder
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <label className="font-medium" htmlFor="name">
                Name
              </label>
            </div>
            <Input
              id="name"
              placeholder={"Enter your Name"}
              handleChange={handleName}
              value={name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="font-medium">Number</label>
            </div>
            <NumberInput
              handleNumber={handleNumber}
              value={number}
              handleCountryChange={handleCountryChange}
              country={country}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="font-medium" htmlFor="email">
                Email
              </label>
            </div>
            <Input
              type="email"
              id="email"
              require={false}
              placeholder={"Enter your Email"}
              handleChange={handleEmail}
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="font-medium" htmlFor="password">
                Password
              </label>
            </div>
            <PasswordInput
              placeholder={"Enter your Password"}
              handleChange={handlePassword}
              value={password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <label className="font-medium" htmlFor="password">
                Confirm Password
              </label>
            </div>
            <PasswordInput
              placeholder={"Confirm your Password"}
              handleChange={handleConfirmPassword}
              value={confirmPassword}
            />
          </div>
          {error && <AuthError>{error}</AuthError>}
        </div>
        <DarkBgButton type="submit">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader color="white" />
            </div>
          ) : (
            "Sign Up"
          )}
        </DarkBgButton>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
