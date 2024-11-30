"use client";
import React, { useState } from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const AuthPage = () => {
  const { setIsUserLoggedIn } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeFormFields = (e) => {
    setErrorMessage(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      setErrorMessage("Passwords doesn't match");
      return;
    }
    postSignupData(formData);
  };

  const handleLoginAfterSignup = () => {
    setIsLogin(true);
    setOpenModal(false);
  };

  const postSignupData = async (formData) => {
    const requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    try {
      const toastId = toast.loading("Loading...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );
      const output = await response.json();
      if (response.status === 200) {
        toast.success("Verification E-mail sent. Please check your email");
        setOpenModal(true);
      }
      if (response.status >= 400 && response.status <= 404) {
        toast.error(output.message);
      }
      toast.dismiss(toastId);
    } catch (err) {
      console.log("Failed to post sign-up details");
      console.error(err.message);
    }
  };

  const postLoginData = async (formData) => {
    try {
      const toastId = toast.loading("Logging in...");

      const requestBody = {
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (response.status === 500) {
        toast.error("Internal server error while logging in...");
      } else if (response.status === 403) {
        toast.error("Bad Credentials");
      } else if (response.status === 404) {
        toast.error("User not found");
      } else if (response.status === 200) {
        const output = await response.json();
        toast.success("Logged In successfully!");
        setIsUserLoggedIn(true);
        const userData = JSON.stringify(output);
        localStorage.setItem("UserData", userData);
        window.location.href = "/";
      }
      toast.dismiss(toastId);
    } catch (err) {
      console.log("Server issue during logging in! ", err.message);
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    postLoginData(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {isLogin ? (
          <LoginForm
            formData={formData}
            changeFormFields={changeFormFields}
            loginSubmitHandler={loginSubmitHandler}
          />
        ) : (
          <SignUpForm
            signupSubmitHandler={signupSubmitHandler}
            formData={formData}
            changeFormFields={changeFormFields}
            errorMessage={errorMessage}
          />
        )}
        <div className="text-center mt-4">
          <button
            onClick={handleSwitch}
            className="text-blue-500 hover:underline text-[14px] xl:text-normal">
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
      {openModal && (
        <Modal
          handleLoginAfterSignup={handleLoginAfterSignup}
          type="signup"
          postSignupData={postSignupData}
        />
      )}
    </div>
  );
};

export default AuthPage;
