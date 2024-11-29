"use client";
import React from "react";

const VerifyEmail = ({ params }) => {
  const token = params.token;
  console.log("Parameters: ", token);
  return <div>{token}</div>;
};

export default VerifyEmail;
