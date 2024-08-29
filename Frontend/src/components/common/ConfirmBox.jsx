import React from "react";

const ConfirmBox = ({ handleConfirm, handleCancel, heading, text }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-dark/70">
      <div className="bg-white p-4 border-dark-grey/40 rounded-md border w-96 max-w-[90%]">
        <div>
          <h2 className="font-semibold text-lg">{heading}</h2>
          <p>{text}</p>
        </div>
        <div className="flex gap-2 mt-5 justify-end">
          <button
            onClick={handleCancel}
            className="border border-dark-grey/40 rounded px-2 py-1"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-primary border-dark bg-dark text-white  rounded px-2 py-1"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
