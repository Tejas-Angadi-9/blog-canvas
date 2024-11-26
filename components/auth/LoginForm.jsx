"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const LoginForm = ({ formData, changeFormFields, loginSubmitHandler }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <form onSubmit={loginSubmitHandler}>
      {/* Login form fields */}
      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={changeFormFields}
        name="email"
        className="border p-2 mb-4 w-full"
      />
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder="Password"
          required
          name="password"
          value={formData.password}
          onChange={changeFormFields}
          className="border p-2 mb-4 w-full"
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
      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95"
        type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
