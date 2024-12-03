"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";

const SignUpForm = ({
  formData,
  changeFormFields,
  errorMessage,
  setErrorMessage,
  setOpenModal,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const passwordTypeHandler = (fieldName) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const validatePassword = (password) => {
    setPasswordValidation({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    changeFormFields(e);
    if (name === "password") {
      validatePassword(value);
    }
  };

  const postSignupData = async (formData) => {
    try {
      const toastId = toast.loading("Loading...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const output = await response.json();
      if (response.status === 200) {
        // toast.success("Verification E-mail sent. Please check your email");
        setOpenModal(true);
      } else {
        toast.error(output.message || "Signup failed");
      }
      toast.dismiss(toastId);
    } catch (err) {
      console.error("Error during signup", err);
    }
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    if (
      passwordValidation.length === false ||
      passwordValidation.lowercase === false ||
      passwordValidation.number === false ||
      passwordValidation.specialChar === false ||
      passwordValidation.uppercase === false
    ) {
      toast.error("Check for password validations");
      return;
    }
    console.log("FORM DATA: ", formData);
    postSignupData(formData);
  };

  return (
    <form onSubmit={signupSubmitHandler}>
      {/* Sign-up form fields */}
      <input
        type="text"
        placeholder="Name"
        required
        name="name"
        value={formData.name}
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        required
        name="email"
        value={formData.email}
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <div className="relative">
        <input
          type={isPasswordVisible.password ? "text" : "password"}
          placeholder="Password"
          required
          name="password"
          value={formData.password}
          onChange={handlePasswordChange}
          className="border p-2 mb-2 w-full"
        />
        {isPasswordVisible.password ? (
          <FaEyeSlash
            className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
            onClick={() => passwordTypeHandler("password")}
          />
        ) : (
          <FaEye
            className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
            onClick={() => passwordTypeHandler("password")}
          />
        )}
      </div>

      {/* Password validation hints */}

      <div className="relative">
        <input
          type={isPasswordVisible.confirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={changeFormFields}
          className="border p-2 mb-4 w-full"
        />
        {isPasswordVisible.confirmPassword ? (
          <FaEyeSlash
            className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
            onClick={() => passwordTypeHandler("confirmPassword")}
          />
        ) : (
          <FaEye
            className="absolute right-4 top-3 text-slate-400 cursor-pointer text-[16px]"
            onClick={() => passwordTypeHandler("confirmPassword")}
          />
        )}
        <div className="text-sm mb-4">
          <div
            className={`flex items-center ${
              passwordValidation.length ? "text-green-600" : "text-red-500"
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
              passwordValidation.lowercase ? "text-green-600" : "text-red-500"
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
              passwordValidation.uppercase ? "text-green-600" : "text-red-500"
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
              passwordValidation.number ? "text-green-600" : "text-red-500"
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
              passwordValidation.specialChar ? "text-green-600" : "text-red-500"
            }`}>
            {passwordValidation.specialChar ? (
              <AiOutlineCheckCircle className="mr-2" />
            ) : (
              <AiOutlineCloseCircle className="mr-2" />
            )}
            At least 1 special character
          </div>
        </div>
      </div>
      {errorMessage && (
        <p className="flex items-center justify-center mx-auto text-red-500 text-[14px] font-normal my-4">
          {errorMessage}
        </p>
      )}
      <button className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
