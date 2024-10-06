import React from 'react'

const Modal = ({ handleLoginAfterSignup }) => {
    return (
      <div className="flex flex-col items-center justify-center border-2 absolute z-10 bg-white p-10 w-[90%] h-[100%] md:w-[50%] md:h-[65%] rounded-md shadow-2xl gap-5">
        <p className="text-[18px] md:text-[30px] font-semibold">
          User signed up successfully!
        </p>
        <p className="text-[14px] md:text-[22px] font-semibold">Please Login</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 w-fit rounded-md duration-300 transition-all hover:scale-95"
          onClick={handleLoginAfterSignup}>
          Go to Login
        </button>
      </div>
    );
  };

export default Modal