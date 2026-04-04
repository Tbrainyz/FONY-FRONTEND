import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import woman from "../assets/women.svg";

const SuccessModal = ({ closeModal, message }) => {
  useEffect(() => {
    const timer = setTimeout(closeModal, 2500);
    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBFBFB] w-full max-w-md rounded-3xl border border-b-8 border-black p-8 text-center">
        <div className="flex justify-center mb-6">
          <img src={woman} alt="success" className="w-24" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          {message}
        </h1>

        <p className="text-gray-600 mb-8">
          Your task has been updated successfully.
        </p>

        <button
          onClick={closeModal}
          className="w-full bg-[#77C2FF] py-4 rounded-2xl font-bold border border-b-4 border-black"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;