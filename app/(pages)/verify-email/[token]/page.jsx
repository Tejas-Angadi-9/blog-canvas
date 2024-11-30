"use client";
import Loading from "@/components/common/Loading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

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
        `${process.env.NEXT_PUBLIC_URL}/user/verify-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        },
      );
      const output = await response.json();
      if (response.ok) {
        toast.success("Email verified successfully! Redirecting...");
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
    <div className="w-full h-screen flex flex-col items-center justify-center text-center mx-auto text-[24px] xl:text-[30px] font-medium space-y-4">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <>
          <p>{error}</p>
          <Link
            href={"/auth"}
            className="bg-red-500 w-fit text-[20px] text-white py-2 px-4 rounded hover:bg-red-600">
            Sign up again
          </Link>
        </>
      ) : (
        <>
          <p>Email verified successfully!</p>
          <Link
            href={"/auth"}
            className="bg-blue-500  text-[20px] text-white py-2 px-4 rounded hover:bg-blue-600">
            Go to Login
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
