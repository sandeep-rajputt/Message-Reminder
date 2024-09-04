import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Hr from "../../components/common/Hr";
import Overlay from "./Overlay";
import ConfirmBox from "./ConfirmBox";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/UserDataSlices";

const ReminderBox = ({ message }) => {
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const dispatch = useDispatch();

  function cancelOverlay() {
    setDeleteOverlay(false);
  }

  function confirmDelete() {
    axios
      .delete(
        "/api/deleteReminder",
        { jobId: selectedJob },
        { withCredentials: true }
      )
      .finally(() => {
        setSelectedJob(null);
        setDeleteOverlay(false);
        dispatch(fetchUserData());
      });
  }

  return (
    <div className="w-full flex flex-col justify-between max-w-96 border rounded-md p-3">
      <div className="flex items-center justify-between fl w-full mb-2">
        <p className="font-medium text-lg break-words">{message.date}</p>
        <button
          className="border rounded px-2 py-2"
          onClick={() => {
            setSelectedJob(message.jobId);
            setDeleteOverlay(true);
          }}
        >
          <MdDelete className="text-md" />
        </button>
      </div>
      <Hr />
      <p className="mt-2 font-medium break-words text-md">{message.message}</p>
      {deleteOverlay && (
        <Overlay>
          <Overlay>
            <ConfirmBox
              handleCancel={cancelOverlay}
              handleConfirm={confirmDelete}
              heading={"Delete Reminder"}
              text={"Are you sure you want to delete this reminder?"}
            />
          </Overlay>
        </Overlay>
      )}
    </div>
  );
};

export default ReminderBox;
