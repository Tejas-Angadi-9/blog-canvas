import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import Loading from "../common/Loading";
import FailedToValidateToken from "./FailedToValidateToken";
import InvalidToken from "../common/InvalidToken";
// import { checkPasswordValidations } from "@/services/checkPasswordValidations";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const ForgotPasswordFields = ({ token }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenInvalid, setIsTokenInvalid] = useState(false);
  const [passwordSection, setPasswordSection] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const checkPasswordValidations = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const passwordHandler = (e) => {
    const { name, value } = e.target;
    setErrorMessage(false);
    setPasswordSection((prev) => ({ ...prev, [name]: value }));
    if (name === "newPassword") {
      checkPasswordValidations(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (passwordSection.newPassword !== passwordSection.confirmNewPassword) {
        setErrorMessage("Passwords doesn't match");
        return;
      }
      if (
        passwordValidation.length === false ||
        passwordValidation.lowercase === false ||
        passwordValidation.number === false ||
        passwordValidation.specialChar === false ||
        passwordValidation.uppercase === false
      ) {
        toast.error("Check for password requirements");
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
        return;
      }
      if (response.ok) {
        toast.success(output.message);
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
    } catch (err) {
      toast.error("Failed to update password");
      return;
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
              <div className="text-sm mb-4">
                <div
                  className={`flex items-center ${
                    passwordValidation.length
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                  {passwordValidation.length ? (
                    <AiOutlineCheckCircle className="mr-2" />
                  ) : (
                    <AiOutlineCloseCircle className="mr-2" />
                  )}
                  At least 8 characters
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidation.lowercase
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                  {passwordValidation.lowercase ? (
                    <AiOutlineCheckCircle className="mr-2" />
                  ) : (
                    <AiOutlineCloseCircle className="mr-2" />
                  )}
                  At least 1 lowercase letter
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidation.uppercase
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                  {passwordValidation.uppercase ? (
                    <AiOutlineCheckCircle className="mr-2" />
                  ) : (
                    <AiOutlineCloseCircle className="mr-2" />
                  )}
                  At least 1 uppercase letter
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidation.number
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                  {passwordValidation.number ? (
                    <AiOutlineCheckCircle className="mr-2" />
                  ) : (
                    <AiOutlineCloseCircle className="mr-2" />
                  )}
                  At least 1 number
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidation.specialChar
                      ? "text-green-600"
                      : "text-red-500"
                  }`}>
                  {passwordValidation.specialChar ? (
                    <AiOutlineCheckCircle className="mr-2" />
                  ) : (
                    <AiOutlineCloseCircle className="mr-2" />
                  )}
                  At least 1 special character
                </div>
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
