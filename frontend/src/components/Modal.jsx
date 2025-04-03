import React from "react";

const Modal = ({ show, onClose, message, onCreateAccount }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-xl text-white w-96">
        <h2 className="text-xl font-semibold">Error</h2>
        <p className="mt-2">{message}</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition"
            onClick={onClose}
          >
            Retry Login
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-lg transition"
            onClick={onCreateAccount} // New Button for Microsoft Account Creation
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
