import React, { useState } from "react";

const DeleteYourAccount = ({ loading }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
        method: "DELETE",
      });
      const output = await response.json();
      setLoading(false);
      if (response.ok) {
        localStorage.removeItem("UserData");
        // cookieStore.delete("authToken");
        toast.success("Account deleted!");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      }
    } catch (err) {
      console.log("Failed to delete the account: ", err.message);
      toast.error("Failed to delete the account");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-8">
      <div className="w-[90%] xl:w-[60%] bg-white shadow-md  rounded-lg p-6 flex flex-col gap-4 items-start xl:items-center mx-auto">
        {/* Section Heading */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Delete Your Account
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Deleting your account removes your data. Created content stays, and
          this action is permanent
        </p>
        {/* Delete Button */}
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white text-sm sm:text-base font-medium rounded-full shadow-md hover:bg-red-600 transition-all duration-200 hover:scale-95"
          onClick={() => setShowModal(true)} // Trigger modal here
        >
          Delete Account
        </button>
      </div>

      {/* Delete Account Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white w-10/12 sm:w-1/3 rounded-xl shadow-lg p-8 relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200"
              onClick={() => setShowModal(false)}>
              ✕
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-6">
              {/* BlogCanvas Branding */}
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-gray-800">
                  <span className="font-normal">Blog</span>Canvas
                </h1>
              </div>
              {loading ? (
                <div className="w-full h-[150px] flex items-center justify-center mx-auto">
                  <Spinner />
                </div>
              ) : (
                <>
                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    Confirm Deletion
                  </h2>
                  {/* Message */}
                  <p className="text-sm text-gray-600 text-center">
                    This action will permanently erase your personal data, but
                    your created content will remain.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4">
                    <button
                      className="px-6 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-200"
                      onClick={() => setShowModal(false)} // Close Modal
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                      onClick={handleDeleteAccount} // Trigger Account Deletion
                    >
                      Yes, Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteYourAccount;
