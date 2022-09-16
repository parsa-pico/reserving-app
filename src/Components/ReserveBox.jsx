import React, { useEffect, useState } from "react";
import { RadioButton, Input } from "./common/Inputs";
import { app } from "./realmConfig";
import * as Realm from "realm-web";
import ReserveTimeService from "./services/ReserveTimeService";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { isNormalUser, isServerUser, isUser } from "./common/UserControl";
const userCustomDataCollection = "userCustomData";
export default function ReserveBox() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [admins, setAdmins] = useState([]);
  const [adminTimes, setAdminTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const getAdminNames = async () => {
    const admins = await ReserveTimeService.getAdmins();
    setAdmins(admins);
  };
  async function getUserInfo() {
    const { firstName, lastName } =
      await ReserveTimeService.getUserCustomDataWithSearch();

    setCustomerDetails({ firstName, lastName });
  }
  useEffect(() => {
    if (app.currentUser) {
      getAdminNames();
      getUserInfo();
    }
  }, []);
  const handleCustomerDetails = (e) => {
    const { id, value } = e.target;
    setCustomerDetails((prevState) => ({ ...prevState, [id]: value }));
    console.log(customerDetails);
  };
  const handleSubmitReserve = async (e, checkedTime) => {
    e.preventDefault();
    const selectedTimeInDb = await ReserveTimeService.findOne({
      time: checkedTime,
      adminName: selectedAdmin,
      date: convertedDate(selectedDate),
    });
    if (selectedTimeInDb) {
      alert("this time is not available");
      return;
    }
    await ReserveTimeService.insertNewTime({
      ...customerDetails,
      time: checkedTime,
      adminName: selectedAdmin,
      date: convertedDate(selectedDate),
    });
    window.location = "/";
  };
  const handleAdminSelect = async ({ target }) => {
    const { value: adminEmail } = target;
    setSelectedAdmin(adminEmail);
    const times = await ReserveTimeService.getReserveTime("adminTimes", {
      ownerEmail: adminEmail,
    });
    setSelectedDate("");
    setSelectedTime("");
    setAdminTimes(times);
  };
  async function AvailableTimes(timesObj, adminProperty, date) {
    const times = await Promise.all(
      timesObj.map(async (timeObj) => {
        const found = await ReserveTimeService.findOne({
          time: timeObj.value,
          adminName: adminProperty,
          date: date,
        });
        if (!found) return { ...timeObj, isChecked: false };

        return { ...timeObj, isChecked: true };
      })
    );

    return times;
  }
  function convertedDate(dateObj) {
    const { day, year } = dateObj;
    const month = dateObj.month.number;
    return `${year}/${month}/${day}`;
  }

  async function handleDateSelect(date) {
    const times = await AvailableTimes(
      adminTimes,
      selectedAdmin,
      convertedDate(date)
    );

    setAdminTimes(times);
    setSelectedDate(date);
  }
  async function handleApiLogin() {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_API_KEY);
    await app.logIn(credentials);
    window.location = "/";
  }

  return (
    <div className="container">
      {!isNormalUser() && (
        <p className="text-danger">you must login to reserve your time</p>
      )}
      <form onSubmit={(e) => handleSubmitReserve(e, selectedTime)}>
        <div onChange={handleCustomerDetails}>
          <Input value={customerDetails.firstName} id={"firstName"} />
          <Input value={customerDetails.lastName} id={"lastName"} />
        </div>
        {!isUser() && (
          <h5 className="hyperLink" onClick={handleApiLogin}>
            see times...
          </h5>
        )}

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
        {selectedAdmin && (
          <DatePicker
            minDate={Date.now()}
            calendar={persian}
            locale={persian_fa}
            value={selectedDate}
            onChange={(value) => {
              handleDateSelect(value);
            }}
          />
        )}
        <div onChange={({ target }) => setSelectedTime(target.value)}>
          {selectedDate &&
            adminTimes.map((timeObj) => (
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
        <button
          disabled={
            !customerDetails.firstName ||
            !customerDetails.lastName ||
            !selectedAdmin ||
            !selectedDate ||
            !selectedTime ||
            app.currentUser._profile.type !== "normal"
          }
          className="btn btn-primary"
          type="submit"
        >
          Reserve your time
        </button>
      </form>
    </div>
  );
}
