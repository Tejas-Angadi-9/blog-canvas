"use client";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmail = ({ params }) => {
  const token = params.token;
  if (!token) {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Verification token not found!",
      }),
      { status: 404 },
    );
  }

  const verifyToken = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/verify-email`,
        {
          method: "POST",
          body: JSON.stringify({ token: token }),
        },
      );
      const output = await response.json();
      if (response.ok) {
        toast.success(output.message);
        setTimeout(() => {
          window.location.href = "/auth";
        }, 1000);
        return;
      } else if (response.status >= 400 && response.status <= 404) {
        toast(output.message);
        return;
      }
    } catch (err) {
      console.error(
        "Internal server error while verifying the email: ",
        err.message,
      );
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return <div>{token}</div>;
};

export default VerifyEmail;
