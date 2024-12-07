"use client";
import Loading from "@/components/common/Loading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import InvalidToken from "@/components/common/InvalidToken";

const VerifyEmail = ({ params }) => {
  const token = params?.token;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!token) {
    toast.error("Verification token not found!");
    return <p>Invalid verification link.</p>;
  }

  const verifyToken = async () => {
    setIsLoading(true); // Show loading state
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        },
      );
      const output = await response.json();
      if (response.ok) {
        toast.success("Email verified!");
        setTimeout(() => {
          window.location.href = "/auth";
        }, 2000); // Add slight delay
      } else {
        setError(output.message || "Verification failed.");
      }
    } catch (err) {
      console.error("Error verifying email:", err.message);
      setError(err.message || "Verification failed.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center mx-auto text-[24px] xl:text-[30px] font-medium space-y-4">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center">
          <InvalidToken type="signup" />
        </div>
      ) : (
        <>
          <p>Email verified successfully! Redirecting to the login page...</p>
          <span>Go to login</span>
          <Link
            href="/auth"
            className="text-blue-500 text-[20px] font-semibold hover:text-blue-600">
            Login Here
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
