import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "../common/Loading";
import FailedToValidateToken from "./FailedToValidateToken";
import InvalidToken from "../common/InvalidToken";

const ForgotPasswordFields = ({ token }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSection, setPasswordSection] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);

  // Check for password validation
  const checkPasswordValidations = (password) => {
    const lowerCase = /[a-z]/.test(password);
    const upperCase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length >= 8;

    if (!lowerCase || !upperCase || !number || !specialChar || !length)
      return false;
    return true;
  };

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setErrorMessage(false);
    setPasswordSection((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (passwordSection.newPassword !== passwordSection.confirmNewPassword) {
        setErrorMessage("Passwords doesn't match");
        return;
      }
      const isPasswordValid = checkPasswordValidations(
        passwordSection.newPassword,
      );
      if (isPasswordValid === false) {
        setErrorMessage("Check for password requirements");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/forgot-password/updatePassword`,
        {
          method: "PATCH",
          body: JSON.stringify({
            token: token,
            password: passwordSection.newPassword,
            confirmPassword: passwordSection.confirmNewPassword,
          }),
        },
      );
      const output = await response.json();

      if (!response.ok) {
        setIsTokenInvalid(true);
      }
      if (response.ok) {
        toast.success(output.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
        return;
      }
    } catch (err) {
      toast.error("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isTokenInvalid ? (
        <InvalidToken type="forgot-password" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-between gap-5 mx-auto">
          <div>
            <h2 className="text-[24px] font-medium">Enter your new password</h2>
          </div>
          <div className="w-[300px]">
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
              {/* Login form fields */}
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="New Password"
                  required
                  name="newPassword"
                  value={passwordSection.newPassword}
                  onChange={passwordHandler}
                  className="border p-2 w-full"
                />
                {isPasswordVisible ? (
                  <FaEyeSlash
                    className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  />
                )}
              </div>
              <div className="relative">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm New Password"
                  required
                  name="confirmNewPassword"
                  value={passwordSection.confirmNewPassword}
                  onChange={passwordHandler}
                  className="border p-2 w-full"
                />
                {isConfirmPasswordVisible ? (
                  <FaEyeSlash
                    className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
                    onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
                  />
                )}
              </div>
              {errorMessage && (
                <p className="text-red-500 font-light text-[16px]">
                  {errorMessage}
                </p>
              )}
              <button
                className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95"
                type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordFields;
