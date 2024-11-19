import React from "react";

const SignUpForm = ({
  signupSubmitHandler,
  formData,
  changeFormFields,
  errorMessage,
}) => {
  return (
    <form onSubmit={signupSubmitHandler}>
      {/* Sign-up form fields */}
      <input
        type="text"
        placeholder="Name"
        required
        name="name"
        value={formData.name}
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        required
        name="email"
        value={formData.email}
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        required
        name="password"
        value={formData.password}
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        required
        value={formData.confirmPassword}
        name="confirmPassword"
        onChange={changeFormFields}
        className="border p-2 mb-4 w-full"
      />
      <button className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95">
        Sign Up
      </button>
      {errorMessage && <p className="flex items-center justify-center mx-auto text-red-500 text-lg font-normal mt-5">{errorMessage}</p>}
    </form>
  );
};

export default SignUpForm;
