"use client";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/Modal";
import FailedToValidateToken from "@/components/forgotPasswordSection/FailedToValidateToken";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const forgotPasswordSubmitter = (e) => {
    e.preventDefault();
    submitHandler();
  };

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/forgot-password`,
        {
          body: JSON.stringify({
            email: email,
          }),
          method: "POST",
        },
      );
      const output = await response.json();
      if (!response.ok) {
        toast.error(output.message);
        return;
      }
      if (response.ok) {
        setIsModalOpen(true);
        return;
      }
    } catch (err) {
      toast.error(err.message);
      return;
    } finally {
      setIsLoading(false);
    }
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
            className={` text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95 ${
              isLoading
                ? "pointer-events-none cursor-not-allowed bg-blue-400"
                : "pointer-events-auto cursor-pointer bg-blue-500"
            }`}
            type="submit">
            {isLoading ? "Loading..." : "Reset Password"}
            {/* Reset Password */}
          </button>
        </form>
        {isModalOpen && (
          <Modal type="forgot-password" setIsModalOpen={setIsModalOpen} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
