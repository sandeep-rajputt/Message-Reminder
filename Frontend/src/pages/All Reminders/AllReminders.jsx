import React, { useEffect } from "react";
import ReminderBox from "../../components/common/ReminderBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/UserDataSlices";
import Loader from "../../components/common/Loader";
import { FaRegCalendarCheck } from "react-icons/fa6";
import DarkBgButton from "../../components/common/DarkBgButton";

const AllReminders = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const loadingStatus = userData.status;

  useEffect(() => {
    if (!userData.userData) {
      dispatch(fetchUserData());
    }
  }, [dispatch, userData.userData]);

  if (loadingStatus === "idle" || loadingStatus === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader className="border-opacity-70" />
      </div>
    );
  }

  const messages = userData.userData?.messages || [];

  return (
    <div className="w-full h-full">
      {messages.length > 0 ? (
        <div className="px-5 py-10 flex flex-col gap-5">
          <div className="flex justify-end">
            <DarkBgButton link="/set-reminder">Create Reminder</DarkBgButton>
          </div>
          <div className="flex flex-wrap  gap-4">
            {messages.map((message, index) => (
              <ReminderBox key={index} message={message} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center py-14 px-5 gap-5 text-center">
          <FaRegCalendarCheck size={"80px"} className="text-dark-grey/90" />
          <p className="text-2xl font-medium text-dark-grey/90">
            You have no reminders yet.
          </p>
          <DarkBgButton link="/set-reminder">
            Create Your First Reminder
          </DarkBgButton>
          <p className="text-dark-grey/70">
            Get started by scheduling reminders for important tasks.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllReminders;
