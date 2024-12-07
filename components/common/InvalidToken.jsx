import React from "react";

const InvalidToken = ({ type }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-11/12 h-full flex items-center justify-center mx-auto">
        <div className="bg-white rounded-lg shadow-lg w-full flex flex-col items-center justify-center gap-5 p-10 -translate-y-[20%] lg:translate-y-0">
          <h2 className="text-[16px] lg:text-xl font-medium lg:font-semibold text-center text-red-600">
            Oops! The link is no longer valid.
          </h2>
          <p className="text-center text-gray-600 text-[14px] lg:text-lg">
            It seems like the link you clicked is either expired or invalid.{" "}
            <br />
            Please check the link again or request a new{" "}
            {type === "signup" ? "verification" : "reset password"} link.
          </p>
          <div className="flex justify-center items-center text-center text-sm lg:text-base">
            <button
              className="bg-blue-500 text-white text-[14px] lg:text-base font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => {
                if (type === "singup") window.location.href = "/auth";
                else window.location.href = "/auth/forgot-password";
              }}>
              {type === "signup" ? "Sign up again" : "Resend new reset link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvalidToken;
