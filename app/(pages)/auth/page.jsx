"use client";
import React, { useState } from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import LoginForm from "@/components/auth/LoginForm";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import NoPageFound from "@/app/not-found";

const AuthPage = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useAuth();
  const router = useRouter();

  const [isLoginSwitcher, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (isUserLoggedIn) {
    return <NoPageFound />;
  }

  const changeFormFields = (e) => {
    setErrorMessage(null);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const handleLoginAfterSignup = () => {
    setIsLogin(true);
    setOpenModal(false);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    postLoginData(formData);
  };

  const postLoginData = async (formData) => {
    try {
      var toastId = toast.loading("Logging in...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );
      if (response.ok) {
        const output = await response.json();
        setIsUserLoggedIn(true);
        localStorage.setItem("UserData", JSON.stringify(output));
        window.location.href = "/";
        toast.success("You’re logged in!");
      } else if (response.status === 403 || response.status === 404) {
        toast.error("Bad credentials");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLoginSwitcher ? "Login" : "Sign Up"}
        </h2>
        {isLoginSwitcher ? (
          <LoginForm
            formData={formData}
            changeFormFields={changeFormFields}
            loginSubmitHandler={loginSubmitHandler}
          />
        ) : (
          <SignUpForm
            formData={formData}
            changeFormFields={changeFormFields}
            errorMessage={errorMessage}
            setOpenModal={setOpenModal}
            setErrorMessage={setErrorMessage}
          />
        )}
        <div className="text-center mt-4">
          <button
            onClick={handleSwitch}
            className="text-blue-500 hover:underline text-[14px] xl:text-normal">
            {isLoginSwitcher
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
      {openModal && (
        <Modal
          handleLoginAfterSignup={handleLoginAfterSignup}
          type="signup"
          setIsModalOpen={setOpenModal}
        />
      )}
    </div>
  );
};

export default AuthPage;
