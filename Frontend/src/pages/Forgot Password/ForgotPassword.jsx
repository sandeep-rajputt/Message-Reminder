import React, { useState } from "react";
import NumberInput from "../../components/common/NumberInput";
import DarkBgButton from "../../components/common/DarkBgButton";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";
import DarkBorderButton from "../../components/common/DarkBorderButton";
import { MdOutlineMail } from "react-icons/md";
import AuthError from "../../components/common/AuthError";
import axios from "axios";

const ForgotPassword = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [country, setCountry] = useState("+91");

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

  function handleCountryChange(e) {
    setCountry(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("/api/forgot-password", {
        number: country + number,
      })
      .then(() => {
        setError("");
        setIsLinkSent(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="flex items-center justify-center h-full py-14 px-5">
      {isLinkSent ? (
        <div className="w-full flex flex-col  max-w-lg shadow-inner-border rounded-md p-6 gap-10">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex items-center justify-center">
              <MdOutlineMail size={"68px"} />
            </div>
            <h3 className="text-center font-semibold text-2xl">
              Reset Link Sent
            </h3>
            <p className="text-center text-dark-grey/70 text-sm font-medium">
              We&#39;ve sent a password reset link to your{" "}
              <span className="text-green-500">WhatsApp.</span> Please check
              your <span className="text-green-500">WhatsApp</span> and follow
              the instructions to reset your password.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <DarkBgButton link="/login">Go To Login Page</DarkBgButton>
            <DarkBorderButton
              handleClick={() => {
                setIsLinkSent(false);
              }}
            >
              Resend Link
            </DarkBorderButton>
          </div>
        </div>
      ) : (
        <form
          className="w-full flex flex-col gap-10 max-w-lg shadow-inner-border rounded-md px-6 pt-10 pb-2"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-semibold">Forgot Your Password?</h2>
            <p className="text-dark-grey/70 text-sm font-medium">
              Enter your <span className="text-green-500">WhatsApp Number</span>{" "}
              below and we&#39;ll send you a link to reset your password.
            </p>
          </div>
          <div>
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
            {error && <AuthError>{error}</AuthError>}
          </div>
          <div className="flex flex-col gap-4">
            <DarkBgButton type={"submit"} className="w-full">
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader color="white" />{" "}
                </div>
              ) : (
                "Send Reset Link"
              )}
            </DarkBgButton>
            <p className="text-center">
              <Link
                className="text-dark-grey/70 hover:text-blue-500 underline"
                to="/login"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
