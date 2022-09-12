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
  const handleSubmitReserve = async (e, checkedTime) => {
    e.preventDefault();
    const selectedTimeInDb = await ReserveTimeService.findOne({
      time: checkedTime,
      adminName: selectedAdmin,
    });
    if (selectedTimeInDb) {
      alert("this time is not available");
      return;
    }
    await ReserveTimeService.insertNewTime({
      ...customerDetails,
      time: checkedTime,
      adminName: selectedAdmin,
    });
    window.location = "/";
  };
  const handleAdminSelect = async ({ target }) => {
    const { value: adminEmail } = target;
    setSelectedAdmin(adminEmail);
    let times = await ReserveTimeService.getReserveTime("adminTimes", {
      ownerEmail: adminEmail,
    });
    times = await AvailableTimes(times, adminEmail);
    setReserveTime(times);
  };
  async function AvailableTimes(timesObj, adminProperty) {
    const times = await Promise.all(
      timesObj.map(async (timeObj) => {
        const found = await ReserveTimeService.findOne({
          time: timeObj.value,
          adminName: adminProperty,
        });
        if (!found) return timeObj;
        return { ...timeObj, isChecked: true };
      })
    );

    return times;
  }

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
              name="AdminGroup"
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
              name="timeGroup"
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
