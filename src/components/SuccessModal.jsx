import React, { useEffect } from "react";
import woman from "../assets/women.svg";

const SuccessModal = ({ closeModal, message }) => {
  useEffect(() => {
    const timer = setTimeout(closeModal, 2500);
    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] dark:bg-gray-900 w-full max-w-md rounded-3xl border border-b-8 border-black dark:border-white p-8 text-center transition-colors">

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <img src={woman} alt="success" className="w-24" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          {message}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Your task has been processed successfully.
        </p>

        {/* BUTTON */}
        <button
          onClick={closeModal}
          className="w-full bg-[#77C2FF] dark:bg-blue-500 py-4 rounded-2xl font-bold border border-b-4 border-black dark:border-white text-black dark:text-white transition-all hover:scale-[1.02]"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
