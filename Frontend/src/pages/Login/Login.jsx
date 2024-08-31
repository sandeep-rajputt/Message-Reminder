import React, { useState } from "react";
import DarkBgButton from "../../components/common/DarkBgButton";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import AuthError from "../../components/common/AuthError";
import NumberInput from "../../components/common/NumberInput";

const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      setError("Please enter a password");
      setLoading(false);
      return;
    } else if (!number) {
      setError("Please enter a phone number");
      setLoading(false);
      return;
    } else if (number.length < 9) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    } else {
      setError("");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center h-full py-14 px-5">
      <form
        className="w-full flex flex-col gap-14 max-w-lg shadow-inner-border rounded-md px-6 pt-10 pb-2"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-2xl font-semibold">Log In to Message Reminder</h2>
        </div>
        <div className="flex flex-col gap-4">
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
          <div className="flex flex-col-reverse gap-2">
            <Input
              placeholder={"Enter your Password"}
              handleChange={handlePassword}
              value={password}
            />
            <div className="flex justify-between items-center font-medium">
              <label>Password</label>
              <Link
                to="/forgot-password"
                className="text-dark-grey/70 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {error && <AuthError>{error}</AuthError>}
        </div>
        <DarkBgButton type={"submit"} className="w-full">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader color="white" />{" "}
            </div>
          ) : (
            "Log In"
          )}
        </DarkBgButton>
        <p className="text-center">
          Don&#39;t have an account?
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
