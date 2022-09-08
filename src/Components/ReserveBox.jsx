import React, { useEffect, useState } from "react";
import { RadioButton, Input } from "./common/Inputs";
import { app } from "./realmConfig";
import realmService from "./services/realmService";
import ReserveTimeService from "./services/ReserveTimeService";

export default function ReserveBox() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [admins, setAdmins] = useState([]);
  const [reserveTime, setReserveTime] = useState([]);
  const [checkedTime, setCheckedTime] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const getInfo = async () => {
    // const times = await ReserveTimeService.getReserveTime();
    // setReserveTime(times);
    const admins = await ReserveTimeService.getAdmins();
    setAdmins(admins);
  };
  useEffect(() => {
    getInfo();
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
  const handleAdminSelect = async ({ target }) => {
    const { value } = target;
    const times = await ReserveTimeService.getReserveTime(value);
    setReserveTime(times);
  };
  return (
    <div className="container">
      {!app.currentUser && <p>you must login first</p>}
      <form onSubmit={(e) => handleSubmitReserve(e, checkedTime)}>
        <div onChange={handleCustomerDetails}>
          <Input id={"firstName"} />
          <Input id={"lastName"} />
        </div>
        <div onChange={handleAdminSelect}>
          {admins.map((admin) => (
            <RadioButton
              key={admin}
              id={admin}
              name="group2"
              label={admin}
              value={admin}
            />
          ))}
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
