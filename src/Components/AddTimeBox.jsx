import React, { useEffect, useState } from "react";
import realmService from "./services/realmService";
import ReserveTimeService from "./services/ReserveTimeService";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
const adminCollection = "adminTimes";
export default function TimeBox() {
  const [selectedTime, setSelectedTime] = useState("");
  const [test, setTest] = useState([]);
  const handleTimeSelect = (e) => {
    const { value } = e.target;
    setSelectedTime(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userEmail = app.currentUser.profile.email;
    const timeObj = {
      time: selectedTime,
      ownerId: app.currentUser.id,
      ownerEmail: userEmail,
    };
    try {
      await ReserveTimeService.insertNewTime(timeObj, adminCollection);
    } catch (e) {
      console.log(e);
    }
  };
  const handleResetTimes = async () => {
    await realmService.deleteMany("ReservedTimes");
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <Input onChange={handleTimeSelect} id="time" />
        </div>
        <button type="submit" className="btn btn-primary m-2">
          add new time!
        </button>
      </form>
      <button onClick={handleResetTimes} className="btn btn-secondary">
        Uncheck all times
      </button>
    </div>
  );
}
