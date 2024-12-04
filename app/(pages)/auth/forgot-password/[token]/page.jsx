"use client";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const forgotPasswordSubmitter = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md flex flex-col gap-5">
        <div className="flex flex-col w-full h-full gap-2">
          <h2 className="text-xl lg:text-2xl font-semibold text-center">
            Forgot Password?
          </h2>
          <p className="text-sm lg:text-base font-normal text-center">
            No worries, we'll send you reset instructions.
          </p>
        </div>
        <form
          onSubmit={forgotPasswordSubmitter}
          className="flex flex-col gap-5">
          {/* Login form fields */}
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="border p-2 mb-1 w-full"
          />
          <button
            className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95"
            type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
