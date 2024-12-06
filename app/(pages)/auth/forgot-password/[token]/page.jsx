"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ValidatingToken = async ({ params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValidated, setTokenValidated] = useState(false);

  const token = params?.token;

  const verifyToken = async(token) => {
    try{
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/forgot-password/verify-token`, {
        method: "POST",
        body: JSON.stringify({
          token: token
        })
      })

      const output = await response.json();
      if(!response.ok){
        toast.error(output.message);
        return;
      }
      if(response.ok){
        toast.success(output.message);
        return;
      }
    }
    catch(err){
      toast.error(err.message);
      return;
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    verifyToken(token);
  }, [])

  return (
    <div>{tokenValidated ? <p>Enter password</p> : <p>Incorrect token</p>}</div>
  );
};

export default ValidatingToken;
