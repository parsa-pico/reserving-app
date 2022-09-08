import React, { useState } from "react";
import realmService from "./services/realmService";
import ReserveTimeService from "./services/ReserveTimeService";
import { Input } from "./common/Inputs";
export default function TimeBox() {
  const [selectedTime, setSelectedTime] = useState("");
  const [adminName, setAdminName] = useState("");
  const handleTimeSelect = (e) => {
    const { value } = e.target;
    setSelectedTime(value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReserveTimeService.insertNewTime(
        {
          time: selectedTime,
        },
        adminName
      );
      await ReserveTimeService.updateAdmins(adminName);
    } catch (e) {
      console.log(e);
    }
  };
  const handleResetTimes = async () => {
    await ReserveTimeService.updateMany(
      { isChecked: true },
      { isChecked: false }
    );
  };
  const handleAddAdmin = async () => {
    await ReserveTimeService.updateAdmins(adminName);
  };
  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <Input
            onChange={({ target }) => setAdminName(target.value)}
            id="adminName"
          ></Input>
          <Input onChange={handleTimeSelect} id="time" />
        </div>
        <button type="submit" className="btn btn-primary m-2">
          add new time!
        </button>
      </form>
      <button onClick={handleResetTimes} className="btn btn-secondary">
        Uncheck all times
      </button>
      <button onClick={handleAddAdmin} className="btn btn-secondary m-1">
        add new admin
      </button>
    </div>
  );
}
