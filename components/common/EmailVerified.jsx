import React from "react";
import Link from "next/link";

const EmailVerified = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M10 15l-3.5-3.5 1.4-1.4L10 12.2l5.1-5.1 1.4 1.4L10 15z" />
            </svg>
          </div>
          <h1 className="text-lg lg:text-xl font-bold text-gray-800">
            Email Verified Successfully!
          </h1>
          <p className="text-sm lg:text-base text-gray-600">
            Redirecting to the login page shortly...
          </p>
        </div>

        <div className="text-center">
          <span className="block text-sm lg:text-base text-gray-500">
            Or go to login:
          </span>
          <Link
            href="/auth"
            className="inline-block mt-3 px-4 py-2 text-white bg-blue-500 rounded-md text-base lg:text-lg font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-200">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerified;
