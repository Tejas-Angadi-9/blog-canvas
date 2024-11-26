"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignUpForm = ({
  signupSubmitHandler,
  formData,
  changeFormFields,
  errorMessage,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const passwordTypeHandler = (fieldName) => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
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
          onChange={changeFormFields}
          className="border p-2 mb-4 w-full"
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
      </div>
      <button className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95">
        Sign Up
      </button>
      {errorMessage && (
        <p className="flex items-center justify-center mx-auto text-red-500 text-lg font-normal mt-5">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default SignUpForm;
