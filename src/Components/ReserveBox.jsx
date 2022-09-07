import React, { useEffect, useState } from "react";
import { RadioButton, CustomInput } from "./common/Inputs";
import * as Realm from "realm-web";
import { app } from "./realmConfig";
import ReserveTimeService from "./services/ReserveTimeService";
const {
  BSON: { ObjectId },
} = Realm;
export default function ReserveBox() {
  const fakeTimeService = [
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];
  const [reserveTime, setReserveTime] = useState([]);
  const [checkedTime, setCheckedTime] = useState("");

  useEffect(() => {
    const getReserveTime = async () => {
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

  const handleSubmitReserve = async (e, value) => {
    e.preventDefault();
    const selectedTimeInDb = await ReserveTimeService.findOne({ time: value });
    console.log(selectedTimeInDb);
    if (selectedTimeInDb.isChecked === true) {
      alert("this time is not available");
      return;
    }
    await ReserveTimeService.updateOne({ time: value }, { isChecked: true });
    window.location = "/";
  };

  async function login() {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.log(app.currentUser);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmitReserve(e, checkedTime)}>
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
      <div>
        <button onClick={login}>login</button>
        this is current user:
        {app.currentUser ? app.currentUser.id : "not logged in"}
      </div>
    </div>
  );
}
