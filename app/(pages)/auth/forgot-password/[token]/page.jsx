"use client";
import React, { useEffect, useState } from "react";

import FailedToValidateToken from "@/components/forgotPasswordSection/FailedToValidateToken";
import ForgotPasswordFields from "@/components/forgotPasswordSection/ForgotPasswordFields";
import VerifyingLink from "@/components/forgotPasswordSection/VerifyingLink";
import toast from "react-hot-toast";

const ValidatingToken = async ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const token = params?.token;
  console.log("token: ", token);
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
        }
      );

      const output = await response.json();
      if (!response.ok) {
        setErrorMessage(output.message);
        toast.error(output.message);
        setIsTokenVerified(false);
        return;
      } else if (response.ok) {
        toast.success(output.message);
        setIsTokenVerified(true);
        return;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // checkToken();
  }, []);

  return (
    <div className="w-full h-screen py-5  md:py-10">
      <div className="w-11/12 h-full flex flex-col items-center justify-center mx-auto">
        {isLoading ? (
          <div className="">
            <VerifyingLink />
          </div>
        ) : isTokenVerified ? (
          <div>
            <ForgotPasswordFields token={token} />
          </div>
        ) : (
          <div>
            <FailedToValidateToken message={errorMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidatingToken;
