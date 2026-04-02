import React, { useEffect } from "react";
import { MdCancel } from "react-icons/md";
import woman from "../assets/women.svg";

const SuccessModal = ({ closeModal }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 2500);

    return () => clearTimeout(timer);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#FBFBFB] w-[600px] p-6 rounded-3xl border border-b-4 border-black">

        <div className="flex justify-between">
          <img src={woman} alt="" />
          <MdCancel onClick={closeModal} className="cursor-pointer text-2xl" />
        </div>

        <div className="mt-6">
          <h1 className="text-[30px] font-bold">
            Task Created Successfully
          </h1>

          <p className="text-gray-500 mt-2">
            Your task has been created successfully.
          </p>
        </div>

        <button
          onClick={closeModal}
          className="mt-6 w-full bg-[#77C2FF] border border-b-4 border-black py-3 rounded-xl font-bold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;