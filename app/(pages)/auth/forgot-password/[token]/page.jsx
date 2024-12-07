"use client";
import React, { useEffect, useState } from "react";

import FailedToValidateToken from "@/components/forgotPasswordSection/FailedToValidateToken";
import ForgotPasswordFields from "@/components/forgotPasswordSection/ForgotPasswordFields";
import VerifyingLink from "@/components/forgotPasswordSection/VerifyingLink";
import toast from "react-hot-toast";
import InvalidToken from "@/components/common/InvalidToken";

const ValidatingToken = async ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = params?.token;
  // Function to check the token
  const checkToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/forgot-password/verify-token`,
        {
          method: "POST",
          body: JSON.stringify({
            token: token,
          }),
        },
      );
      const output = await response.json();
      console.log("OUTPUT: ", output);
      if (!response.ok) {
        setErrorMessage(output.message);
        setIsTokenVerified(false);
        return;
      } else if (response.ok) {
        toast.success("Reset link is verified.");
        setIsTokenVerified(true);
        return;
      }
    } catch (err) {
      console.error("Failed to verify the reset link");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className="w-full h-screen py-5  md:py-10">
      <div className="w-11/12 h-full flex flex-col items-center justify-center mx-auto">
        {isLoading ? (
          <div className="w-full h-full flex flex-col items-center justify-center mx-auto">
            <VerifyingLink />
          </div>
        ) : isTokenVerified ? (
          <div>
            <ForgotPasswordFields token={token} />
          </div>
        ) : (
          <div className="w-full lg:w-[50%] flex flex-col items-center justify-center">
            <InvalidToken type="forgot-password" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidatingToken;
