import React, { useEffect, useState } from "react";
import { RadioButton, Input } from "./common/Inputs";
import { app } from "./realmConfig";
import * as Realm from "realm-web";
import ReserveTimeService from "./services/ReserveTimeService";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { isNormalUser, isServerUser, isUser } from "./common/UserControl";
import Form from "react-bootstrap/Form";
import { ReserveBtn } from "./ReserveBoxComponents";
const userCustomDataCollection = "userCustomData";
export default function ReserveBox() {
  const [customerDetails, setCustomerDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState("");
  const [admins, setAdmins] = useState([]);
  const [availableDays, setavailableDays] = useState([]);
  const [adminTimes, setAdminTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!isUser()) handleApiLogin();
    if (isUser()) getAdminNames();
    if (isNormalUser()) getUserInfo();
  }, []);
  const getAdminNames = async () => {
    const admins = await ReserveTimeService.getAdmins();

    setAdmins(admins);
  };
  async function getUserInfo() {
    const { firstName, lastName } =
      await ReserveTimeService.getUserCustomDataWithSearch();
    const ownerId = app.currentUser.id;
    const ownerEmail = app.currentUser.profile.email;
    setCustomerDetails({ ownerId, ownerEmail, firstName, lastName });
  }

  const handleCustomerDetails = (e) => {
    const { id, value } = e.target;
    setCustomerDetails((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleSubmitReserve = async (e, checkedTime) => {
    e.preventDefault();
    // const selectedTimeInDb = await ReserveTimeService.findOne({
    //   time: checkedTime,
    //   adminEmail: selectedAdmin.email,
    //   date: convertedDate(selectedDate),
    // });
    // if (selectedTimeInDb) {
    //   alert("this time is not available");
    //   return;
    // }

    try {
      await ReserveTimeService.insertNewTime({
        ...customerDetails,
        adminName: selectedAdmin.name,
        adminEmail: selectedAdmin.email,
        date: convertedDate(selectedDate),
        dayIndex: selectedDayIndex,
        time: checkedTime,
      });
    } catch (e) {
      alert(e);
      console.log(e);
      return;
    }
    window.location = "/";
  };
  const handleAdminSelect = async ({ target }) => {
    const { value: adminEmail, id: adminName } = target;
    setSelectedAdmin({ email: adminEmail, name: adminName });
    const times = await ReserveTimeService.getReserveTime("adminTimes", {
      ownerEmail: adminEmail,
    });
    let days = [];
    for (let value of times) {
      if (!days.find((day) => day == value.dayIndex))
        days = [...days, value.dayIndex];
    }
    setavailableDays(days);
    setSelectedDate("");
    setSelectedTime("");
    setAdminTimes(times);
  };

  async function AvailableTimes(timesObj, adminProperty, date) {
    const times = await Promise.all(
      timesObj.map(async (timeObj) => {
        const found = await ReserveTimeService.findOne({
          time: timeObj.value,
          adminEmail: adminProperty,
          date,
        });
        if (!found) return { ...timeObj, isChecked: false };

        return { ...timeObj, isChecked: true };
      })
    );

    return times;
  }
  function convertedDate(dateObj) {
    let { day, year } = dateObj;
    let month = dateObj.month.number;
    if (day.toString().length === 1) day = `0${day}`;
    if (month.toString().length === 1) month = `0${month}`;
    return `${year}/${month}/${day}`;
  }
  function isNotFormValid() {
    if (
      !customerDetails.firstName ||
      !customerDetails.lastName ||
      !selectedAdmin ||
      !selectedDate ||
      !selectedTime ||
      app.currentUser._profile.type !== "normal"
    )
      return true;
    return false;
  }
  async function handleDateSelect(date) {
    const times = await AvailableTimes(
      adminTimes,
      selectedAdmin.email,
      convertedDate(date)
    );
    setSelectedDayIndex(date.weekDay.index.toString());
    setAdminTimes(times);
    setSelectedDate(date);
  }
  async function handleApiLogin() {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_API_KEY);
    await app.logIn(credentials);
    console.log("api login");
    window.location = "/reserving";
  }

  return (
    <div className="container reserve-box">
      <Form onSubmit={(e) => handleSubmitReserve(e, selectedTime)}>
        <div onChange={handleCustomerDetails}>
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control value={customerDetails.firstName} />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>LastName</Form.Label>
            <Form.Control value={customerDetails.lastName} />
          </Form.Group>
        </div>

        <Form.Select className="mt-4 mb-4" onChange={handleAdminSelect}>
          <option>choose your admin</option>
          {admins.map((admin) => (
            <option
              key={admin._id}
              value={admin.ownerEmail}
            >{`${admin.firstName} ${admin.lastName}`}</option>
          ))}
        </Form.Select>
        {selectedAdmin && (
          <DatePicker
            mapDays={({ date }) => {
              let isAvailable = availableDays.includes(
                date.weekDay.index.toString()
              );

              if (!isAvailable)
                return {
                  disabled: true,
                  style: { color: "red" },
                };
            }}
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
            adminTimes
              .filter((timeObj) => timeObj.dayIndex === selectedDayIndex)
              .map((timeObj) => (
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
        <ReserveBtn disabled={isNotFormValid}>Rereve your time!</ReserveBtn>
      </Form>
    </div>
  );
}
