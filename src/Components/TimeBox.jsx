import React, { useState } from "react";
import ReserveTimeService from "./services/ReserveTimeService";
export default function TimeBox() {
  const [selectedTime, setSelectedTime] = useState("");
  const handleTimeSelect = (e) => {
    const { value } = e.target;
    setSelectedTime(value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await ReserveTimeService.insertNewTime({
        time: selectedTime,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            onChange={handleTimeSelect}
            className="form-control"
            type="text"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          add new time!
        </button>
      </form>
    </>
  );
}
