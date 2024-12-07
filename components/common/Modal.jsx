import React from "react";

const Modal = ({
  handleLoginAfterSignup,
  type = "signup",
  setDeleteModalOpen,
  confirmedDelete,
  setIsModalOpen,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 w-[90%] max-w-md rounded-md shadow-2xl flex flex-col items-center gap-5 relative">
        {type === "deleteBlog" && (
          <>
            <p className="text-[16px] xl:text-[24px] font-semibold text-center">
              Are you sure you want to delete this blog?
            </p>
            <div className="flex gap-4">
              <button
                className="text-black border-2 py-2 px-4 rounded-md duration-300 transition-all hover:scale-95"
                onClick={() => setDeleteModalOpen((prev) => !prev)}>
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md duration-300 transition-all hover:scale-95"
                onClick={confirmedDelete}>
                Delete
              </button>
            </div>
          </>
        )}

        {(type === "signup" || type === "forgot-password") && (
          <>
            <p className="text-[18px] xl:text-[22px] font-bold text-gray-800">
              Check Your Email!
            </p>
            <p className="text-[16px] xl:text-[20px] font-medium text-gray-600 mt-2 text-center">
              A {type === "signup" ? "verification" : "password reset"} link has
              been sent to your email address. Please check your inbox to{" "}
              {type === "signup"
                ? "verify your account."
                : "reset your password."}
            </p>
            <p className="text-[14px] xl:text-[18px] text-gray-500 mt-1 text-center">
              Didn't receive the email? Please check your spam folder or try
              again.
            </p>
            <button
              onClick={() => location.reload()}
              className="bg-blue-500 text-white py-2 px-6 mt-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
              {type === "signup" ? "Sign up " : "Send Link "}Again
            </button>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}>
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
