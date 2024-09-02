import React, { useState, useEffect } from "react";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import DarkBgButton from "../../components/common/DarkBgButton";
import moment from "moment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "../../store/slices/UserDataSlices";
import Loader from "../../components/common/Loader";
import Overlay from "../../components/common/Overlay";
import MessageSet from "../../components/common/MessageSet";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

const SetReminder = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const loadingStatus = userData.status;
  const [frequency, setFrequency] = useState("setMsg");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState("");
  const [day, setDay] = useState("Sunday");
  const [date, setDate] = useState("");
  const [overlay, setOverlay] = useState(false);

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

  function handleCloseModal() {
    setOverlay(false);
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedDate) {
      setError("Please select a date and time");
      return;
    } else if (!message) {
      setError("Please enter a message");
      return;
    }

    const userNumber = userData.userData.number;
    let dateOfMonth =
      frequency === "setMsg"
        ? moment(selectedDate).format("DD")
        : date.padStart(2, "0");

    let month = selectedDate.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;

    const hours =
      moment(selectedDate).format("h").length === 1
        ? `0${moment(selectedDate).format("h")}`
        : moment(selectedDate).format("h");
    const minutes =
      moment(selectedDate).minutes().toString().length === 1
        ? `0${moment(selectedDate).minutes()}`
        : moment(selectedDate).minutes();
    const amPm = moment(selectedDate).format("A");

    axios
      .post(
        "/api/addReminder",
        {
          msgType: frequency,
          message,
          hour: hours,
          minute: minutes,
          amPm,
          dayOfMonth: dateOfMonth,
          month: month,
          dayOfWeek: day,
          year: selectedDate.getFullYear(),
          number: userNumber,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setOverlay(true);
        setMessage("");
        setSelectedDate(null);
        setFrequency("setMsg");
        setDay("Sunday");
        setDate("");
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  py-14 px-5 gap-4">
      <h1 className="text-4xl font-bold text-gray-800">Set New Reminder</h1>
      <p className="text-gray-600 text-lg text-center">
        Choose the frequency, set the message, and pick the date and time.
      </p>
      <form
        className="w-full flex flex-col gap-8 max-w-lg shadow-inner-border rounded-md p-6 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="frequency" className="font-medium text-base">
            Frequency
          </label>
          <select
            id="frequency"
            className="text-lg w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 focus:outline text-dark font-normal"
            value={frequency}
            onChange={(e) => {
              setSelectedDate(null);
              setFrequency(e.target.value);
            }}
            required
          >
            <option value="setMsg">Specific Time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="date" className="font-medium text-base">
              Date & Time
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <DatePicker
              format={`${
                frequency === "setMsg" ? "MM/dd/yyyy hh:mm aa" : "hh:mm aa"
              }`}
              showMeridian
              className="shadow-inner-border rounded-md border-none outline-offset-[3px] outline-[2.5px] focus:outline"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        {frequency === "weekly" && (
          <div>
            <label htmlFor="day" className="font-medium text-base">
              Day
            </label>
            <select
              id="frequency"
              className="text-lg w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 focus:outline text-dark font-normal"
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
              required
            >
              {daysOfWeek.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )}

        {frequency === "monthly" && (
          <div>
            <label htmlFor="date">Date</label>
            <select
              id="date"
              className="text-lg w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 focus:outline text-dark font-normal"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
            >
              {daysOfMonth.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={200}
            required
            className="w-full bg-transparent outline-offset-[3px] outline-[2.5px] shadow-inner-border rounded-md px-2 py-2 focus:outline text-dark font-normal"
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex items-center justify-end">
          <DarkBgButton type="submit">Set Reminder</DarkBgButton>
        </div>
      </form>
      {overlay && (
        <Overlay>
          <MessageSet
            handleCloseModal={handleCloseModal}
            succes={"Your reminder has been set successfully."}
          />
        </Overlay>
      )}
    </div>
  );
};

export default SetReminder;
