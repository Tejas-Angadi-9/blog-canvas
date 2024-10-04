"use client";
import React, { useState } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <div className="text-center mt-4">
          <button
            onClick={handleSwitch}
            className="text-blue-500 hover:underline text-[14px] md:text-normal">
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  return (
    <form>
      {/* Login form fields */}
      <input
        type="email"
        placeholder="Email"
        required
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="border p-2 mb-4 w-full"
      />
      <button className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95">
        Login
      </button>
    </form>
  );
};

const SignUpForm = () => {
  return (
    <form>
      {/* Sign-up form fields */}
      <input
        type="text"
        placeholder="Name"
        required
        className="border p-2 mb-4 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        required
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        required
        className="border p-2 mb-4 w-full"
      />
      <button className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95">
        Sign Up
      </button>
    </form>
  );
};

export default AuthPage;
