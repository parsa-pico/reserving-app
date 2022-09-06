import React, { useEffect, useState } from "react";
import { RadioButton, CustomInput } from "./common/Inputs";
import mongoDbService from "./services/mongoDbService";
import * as Realm from "realm-web";
import { app } from "./realmConfig";
import realmService from "./services/realmService";
// const {
//   BSON: { ObjectId },
// } = Realm;
export default function ReserveBox() {
  const fakeTimeService = [
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
  ];
  const [reserveTime, setReserveTime] = useState([]);
  const [checkedTime, setCheckedTime] = useState("");

  useEffect(() => {
    setReserveTime(fakeTimeService);
  }, []);

  const handleSubmitReserve = async (e, value) => {
    e.preventDefault();
    //changing database
    const reserveObj = [...reserveTime];
    const index = reserveObj.findIndex((timeObj) => timeObj.value === value);
    const timeObj = { ...reserveObj[index], isChecked: true };
    reserveObj[index] = timeObj;
    //updating ui
    setReserveTime(reserveObj);
  };
  // const timeCollection = getCollection("Reserve-App-DB", "ReservedTimes");
  //console.log(timeCollection);
  async function login() {
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    await realmService.insertOne("Reserve-App-DB", "ReservedTimes", {
      bemola: true,
    });
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
