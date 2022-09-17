import React, { useEffect, useState } from "react";
import realmService from "./services/realmService";
import ReserveTimeService from "./services/ReserveTimeService";
import { Input } from "./common/Inputs";
import { app } from "./realmConfig";
const adminCollection = "adminTimes";
//TODO:instead of reloading page after operations ,update ui
export default function TimeBox() {
  const [errors, setErrors] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTimeForUpdate, setSelectedTimeForUpdate] = useState("");
  const [selectedDayForUpdate, setSelectedDayForUpdate] = useState("");
  const [adminTimes, setAdminTimes] = useState([]);
  const [updateOp, setUpdateOp] = useState(false);
  useEffect(() => {
    async function getInfo() {
      const result = await ReserveTimeService.find(adminCollection, {
        ownerEmail: app.currentUser.profile.email,
      });

      setAdminTimes(result);
    }
    if (app.currentUser) getInfo();
  }, []);

  const handleTimeSelect = (e) => {
    const { value } = e.target;
    setSelectedTime(value);
  };
  const handleAddTimes = async (e) => {
    e.preventDefault();

    const userEmail = app.currentUser.profile.email;
    const timeObj = {
      time: selectedTime,
      ownerId: app.currentUser.id,
      ownerEmail: userEmail,
      dayIndex: selectedDay,
    };
    try {
      await ReserveTimeService.insertNewTime(timeObj, adminCollection);
      window.location = "/add-times";
    } catch (e) {
      console.log(e);
      setErrors((prevState) => ({
        ...prevState,
        addTimes: "you dont have that premission",
      }));
    }
  };
  const handleResetTimes = async () => {
    await realmService.deleteMany("ReservedTimes");
  };
  const handleUpdateTimes = async (e) => {
    e.preventDefault();

    const r = await realmService.updateOne(
      adminCollection,
      { time: selectedTimeForUpdate, dayIndex: selectedDayForUpdate },
      {
        time: selectedTime,
        dayIndex: selectedDay,
        ownerId: app.currentUser.id,
        ownerEmail: app.currentUser.profile.email,
      }
    );
    window.location = "/add-times";
  };
  const handleDelte = async (_id) => {
    await realmService.deleteOne(adminCollection, { _id });
    window.location = "/add-times";
  };
  return (
    <div className="container">
      <form>
        <div className="form-group">
          <Input
            value={selectedTime}
            onChange={handleTimeSelect}
            error={errors.addTimes}
            id="time"
            autoFocus
          />
          <Input
            value={selectedDay}
            onChange={(e) => {
              const { value } = e.target;
              setSelectedDay(value);
            }}
            id="day"
          />
        </div>
        {!updateOp && (
          <button
            type="submit"
            onClick={handleAddTimes}
            className="btn btn-primary m-2"
          >
            add
          </button>
        )}
        {updateOp && (
          <button className="btn btn-primary m-2" onClick={handleUpdateTimes}>
            update
          </button>
        )}
      </form>

      <p>edit times:</p>
      <ul>
        {adminTimes.map((adminTime) => {
          return (
            <div key={adminTime._id}>
              <li key={adminTime.time}>
                <h6>time:{adminTime.time}</h6>
                <h6>day:{adminTime.dayIndex}</h6>
                <button
                  key={adminTime.time + adminTime._id}
                  onClick={() => {
                    setSelectedTimeForUpdate(adminTime.time);
                    setSelectedDayForUpdate(adminTime.dayIndex);
                    setSelectedTime(adminTime.time);
                    setSelectedDay(adminTime.dayIndex);
                    setUpdateOp(true);
                  }}
                  className="btn btn-danger"
                >
                  edit
                </button>
                <button
                  key={adminTime.time + adminTime._id + 5}
                  onClick={() => handleDelte(adminTime._id)}
                  className="btn btn-danger m-2"
                >
                  delete
                </button>
              </li>
            </div>
          );
        })}
      </ul>
      <button onClick={handleResetTimes} className="btn btn-secondary">
        Uncheck all times
      </button>
    </div>
  );
}
