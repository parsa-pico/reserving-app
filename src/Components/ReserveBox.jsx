import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioButton, Input } from "./common/Inputs";
import { app } from "./realmConfig";
import * as Realm from "realm-web";
import ReserveTimeService from "./services/ReserveTimeService";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import idPayService from "./services/idPayService";
import { isNormalUser, isServerUser, isUser } from "./common/UserControl";
import Form from "react-bootstrap/Form";
import { ReserveBtn } from "./ReserveBoxComponents";
import realmService from "./services/realmService";
import LodingSpinner from "./common/LodingSpinner";
const userCustomDataCollection = "userCustomData";
// TODO:finding occupied days is very nasti,fix that
export default function ReserveBox({ isLoading, setIsLoading }) {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState("");
  const [admins, setAdmins] = useState([]);
  const [availableDaysIndex, setavailableDaysIndex] = useState([]);
  const [adminTimes, setAdminTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [occupiedDays, setOccupiedDays] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!isUser()) handleApiLogin();
    if (isUser()) getAdminNames();
    if (isNormalUser()) getUserInfo();
  }, []);
  const getAdminNames = async () => {
    try {
      setIsLoading(true);
      const admins = await ReserveTimeService.getAdmins();
      setAdmins(admins);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
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
  // async function paymentInfo() {
  //   const { link: paymentLink, id: paymentId } = await idPayService.payment(
  //     customerDetails.lastName
  //   );

  //   return { paymentId, paymentLink };
  // }
  const handleSubmitReserve = async (e, checkedTime) => {
    e.preventDefault();
    const persianDate = convertedDate(selectedDate);
    const { paymentId, paymentLink } = await idPayService.payment(
      customerDetails.lastName
    );
    try {
      setIsLoading(true);
      await ReserveTimeService.insertNewTime({
        ...customerDetails,
        adminName: selectedAdmin.name,
        adminEmail: selectedAdmin.email,
        date: persianDate,
        dayIndex: selectedDayIndex,
        time: checkedTime,
        idPay: { isPayed: false, paymentId, paymentLink },
      });
      const isOccupied = await isDayOccupied(persianDate);
      if (isOccupied)
        realmService.insertOne("occupiedDays", {
          date: persianDate,
          adminEmail: selectedAdmin.email,
        });
      window.location.replace(paymentLink);
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
      return;
    }
  };
  const handleAdminSelect = async ({ target, currentTarget }) => {
    const options = target.options;
    const index = target.selectedIndex;
    const adminName = options[index].id;
    const adminEmail = options[index].value;

    // const { value: adminEmail, id: adminName } = target;
    setSelectedAdmin({ email: adminEmail, name: adminName });
    const times = await ReserveTimeService.getReserveTime("adminTimes", {
      ownerEmail: adminEmail,
    });
    let days = [];
    for (let value of times) {
      if (!days.find((day) => day == value.dayIndex))
        days = [...days, value.dayIndex];
    }
    const occupiedDays = await realmService.find("occupiedDays", {
      adminEmail,
    });
    setOccupiedDays(occupiedDays);
    setavailableDaysIndex(days);
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
    try {
      setIsLoading(true);
      const times = await AvailableTimes(
        adminTimes,
        selectedAdmin.email,
        convertedDate(date)
      );
      setIsLoading(false);
      setSelectedDayIndex(date.weekDay.index.toString());
      setAdminTimes(times);
      setSelectedDate(date);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }
  async function isDayOccupied(persianDate) {
    let selectedDayIndex;
    let selectedDay = await ReserveTimeService.find("ReservedTimes", {
      date: persianDate,
      adminEmail: selectedAdmin.email,
    });

    if (selectedDay.length !== 0) {
      selectedDayIndex = await selectedDay[0].dayIndex;
      selectedDay = selectedDay
        .sort((a, b) => a.time - b.time)
        .map((obj) => obj.time);
    }
    const sameDayAdminTimes = adminTimes
      .filter((timeObj) => timeObj.dayIndex == selectedDayIndex)

      .sort((a, b) => a.time - b.time)
      .map((obj) => obj.time);
    // const t = sameDayAdminTimes.join();
    // const r = selectedDay.join();
    // console.log(t);
    // console.log(r);
    if (sameDayAdminTimes.join() == selectedDay.join()) return true;
    return false;
  }
  async function handleApiLogin() {
    const credentials = Realm.Credentials.apiKey(process.env.REACT_APP_API_KEY);
    await app.logIn(credentials);
    console.log("api login");
    window.location = "/reserving";
  }

  return (
    <div disabled={isLoading} className="container reserve-box ">
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
          <option>choose your therapist</option>
          {admins.map((admin) => (
            <option
              key={admin._id}
              id={`${admin.firstName} ${admin.lastName}`}
              value={admin.ownerEmail}
            >{`${admin.firstName} ${admin.lastName}`}</option>
          ))}
        </Form.Select>
        {selectedAdmin && (
          <DatePicker
            placeholder="choose the date"
            mapDays={({ date }) => {
              let isAvailable = availableDaysIndex.includes(
                date.weekDay.index.toString()
              );
              let isOccupied = false;
              if (isAvailable)
                isOccupied = occupiedDays.find(
                  (day) => day.date == convertedDate(date)
                );
              if (!isAvailable || isOccupied)
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
