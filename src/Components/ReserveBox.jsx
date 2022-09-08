import React, { useEffect, useState } from "react";
import { RadioButton, Input } from "./common/Inputs";
import { app } from "./realmConfig";
import ReserveTimeService from "./services/ReserveTimeService";

export default function ReserveBox() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [reserveTime, setReserveTime] = useState([]);
  const [checkedTime, setCheckedTime] = useState("");

  useEffect(() => {
    const getReserveTime = async () => {
      if (!app.currentUser) return;
      let reserveDb = await ReserveTimeService.find();
      reserveDb = reserveDb
        .map((timeObj) => {
          const obj = { ...timeObj };
          obj.value = obj.time;
          obj.label = obj.time;
          return obj;
        })
        .sort((a, b) => a.value - b.value);
      setReserveTime(reserveDb);
    };
    getReserveTime();
  }, []);
  const handleCustomerDetails = (e) => {
    const { id, value } = e.target;
    setCustomerDetails((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleSubmitReserve = async (e, value) => {
    e.preventDefault();
    const selectedTimeInDb = await ReserveTimeService.findOne({ time: value });
    console.log(selectedTimeInDb);
    if (selectedTimeInDb.isChecked === true) {
      alert("this time is not available");
      return;
    }
    await ReserveTimeService.updateOne(
      { time: value },
      { ...customerDetails, isChecked: true }
    );
    window.location = "/";
  };

  return (
    <div className="container">
      {!app.currentUser && <p>you must login first</p>}
      <form onSubmit={(e) => handleSubmitReserve(e, checkedTime)}>
        <div onChange={handleCustomerDetails}>
          <Input id={"firstName"} />
          <Input id={"lastName"} />
        </div>
        <div onChange={({ target }) => setCheckedTime(target.value)}>
          {reserveTime.map((timeObj) => (
            <RadioButton
              key={timeObj.value}
              id={timeObj.value}
              name="group1"
              label={timeObj.label}
              value={timeObj.value}
              disabled={timeObj.isChecked === true}
            />
          ))}
        </div>
        <button className="btn btn-primary" type="submit">
          Reserve your time
        </button>
      </form>
    </div>
  );
}
