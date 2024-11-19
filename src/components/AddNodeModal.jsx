import React, { useState } from "react";

const AddNodeModal = ({ isOpen, onClose, onSave }) => {
  const [nodeId, setNodeId] = useState("");

  const handleSave = () => {
    onSave({ nodeId   });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Node</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Node ID
            </label>
            <input
              type="text"
              value={nodeId}
              onChange={(e) => setNodeId(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </form>
        <div className="mt-6 flex flex-row-2 space-x-2">
          <button
            onClick={handleSave}
            className="px-4 py-2  bg-black w-full text-white font-semibold rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white w-full text-black font-semibold border border-black rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNodeModal;
