import React from "react";
import { FaRegEdit } from "react-icons/fa";
import Hr from "../../components/common/Hr";

const ReminderBox = ({ message }) => {
  return (
    <div className="w-full flex flex-col max-w-96 border rounded-md p-3">
      <div className="flex items-center justify-between w-full mb-2">
        <p>{message.date}</p>
        <button>
          <FaRegEdit />
        </button>
      </div>
      <Hr />
      <p className="mt-2 font-medium ">{message.message}</p>
    </div>
  );
};

export default ReminderBox;
