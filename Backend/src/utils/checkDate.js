import moment from "moment";

function checkDate(type, date) {
  if (type === "setmsg") {
    // Check if the date is in the correct format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}(AM|PM)$/;
    if (!dateRegex.test(date)) {
      throw new Error(
        "Invalid date format. Please use the format DD/MM/YYYY HH:MM AM/PM. Use /help for more info."
      );
    }

    // Parse the input date in IST
    const inputDate = moment
      .tz(date, "DD/MM/YYYY h:mmA", "Asia/Kolkata")
      .toDate();
    if (isNaN(inputDate.getTime())) {
      console.log(inputDate.getTime());
      throw new Error("Invalid date. Please enter a valid date.");
    }

    const currentDate = moment().tz("Asia/Kolkata").toDate();

    // Check if the date is in the future
    if (inputDate < currentDate) {
      console.log("inputDate", inputDate);
      console.log("futureDate", futureDate);
      throw new Error("Invalid date. Please enter a date in the future.");
    }

    return true;
  } else if (type === "seteveryday") {
    // Check if the date is in the correct format
    const dateRegex = /^\d{1,2}:\d{2}(AM|PM)$/;
    if (!dateRegex.test(date)) {
      throw new Error(
        "Invalid date format. Please use the format HH:MM AM/PM. Use /help for more info"
      );
    }

    // Parse the input date in IST
    const inputDate = moment.tz(date, "h:mmA", "Asia/Kolkata").toDate();
    if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date. Please enter a valid date.");
    }

    const currentDate = moment().tz("Asia/Kolkata").toDate();
    if (inputDate < currentDate) {
      throw new Error("Invalid date. Please enter a date in the future.");
    }

    return true;
  }
}

export default checkDate;
