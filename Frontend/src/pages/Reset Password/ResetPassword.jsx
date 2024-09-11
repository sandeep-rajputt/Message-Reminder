import React, { useState, useEffect } from "react";
import DarkBgButton from "../../components/common/DarkBgButton";
import { Link } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { MdOutlineAccessTime } from "react-icons/md";
import axios from "axios";
import AuthError from "../../components/common/AuthError";
import DarkBorderButton from "../../components/common/DarkBorderButton";
import PasswordInput from "../../components/common/PasswordInput";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [token, setToken] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const getTokenFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    await axios
      .post("/api/reset-password", { token, newPassword: password })
      .then(() => {
        setIsPasswordChanged(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const token = getTokenFromUrl();
    setToken(token);
    if (token) {
      console.log("enter if");
      axios
        .post("/api/verify-reset-token", { token })
        .then(() => {
          console.log("Token is not expired");
          setTokenExpired(false);
        })
        .catch(() => {
          console.log("Token is expired or invalid");
          setTokenExpired(true);
        });
    } else {
      setTokenExpired(true);
    }
    console.log(pageLoading);
    if (pageLoading) {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-full py-14 px-5">
      {pageLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="opacity-100 border-opacity-100" />
        </div>
      ) : tokenExpired ? (
        <div className="w-full flex flex-col  max-w-lg shadow-inner-border rounded-md p-6 gap-5">
          <div className="flex items-center justify-center">
            <MdOutlineAccessTime size={50} />
          </div>
          <div>
            <h3 className="text-center font-semibold text-2xl">
              Reset Link Expired
            </h3>
            <p className="text-center text-dark-grey/70 text-sm font-medium">
              The reset link you used has expired. Please request a new one.
            </p>
          </div>
          <DarkBorderButton link="/forgot-password" className="text-center">
            Request New Link
          </DarkBorderButton>
        </div>
      ) : isPasswordChanged ? (
        <div className="w-full flex flex-col  max-w-lg shadow-inner-border rounded-md p-6 gap-10">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-center font-semibold text-2xl">
              Password Changed
            </h3>
            <p className="text-center text-dark-grey/70 text-sm font-medium">
              Your password has been successfully changed. You can now log in
              with your new password.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <DarkBgButton link="/login">Go To Login Page</DarkBgButton>
          </div>
        </div>
      ) : (
        <form
          className="w-full flex flex-col gap-10 max-w-lg shadow-inner-border rounded-md px-6 pt-7 pb-2"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="text-2xl font-semibold">Reset Your Password</h2>
            <p className="text-dark-grey/70 text-sm font-medium">
              Enter a new password below to reset your account password.
            </p>
          </div>
          <div className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <label className="font-medium">New Password</label>
              </div>
              <div className="relative">
                <PasswordInput
                  placeholder={"New Password"}
                  value={password}
                  handleChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="font-medium">Confirm Password</label>
              </div>
              <div className="relative">
                <PasswordInput
                  placeholder={"Confirm Password"}
                  value={confirmPassword}
                  handleChange={(e) => setConfirmPassword(e.target.value)}
                />
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
              "Reset Password"
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
        </form>
      )}
    </div>
  );
};
