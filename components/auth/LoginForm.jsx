import React from "react";

const LoginForm = ({ formData, changeFormFields, loginSubmitHandler }) => {
  return (
    <form onSubmit={loginSubmitHandler}>
      {/* Login form fields */}
      <input
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={changeFormFields}
        name="email"
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
      <button
        className="bg-blue-500 text-white p-2 w-full rounded-md duration-300 transition-all hover:scale-95"
        type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
